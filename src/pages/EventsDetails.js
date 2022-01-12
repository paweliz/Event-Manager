import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../customHooks/AuthContext';
import { projectStorage } from '../firebase/firebaseConfig';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  getCollectionById,
  updateEventParticipants,
  deleteEvent,
  getUserByUserId,
  removeFromEventParticipants,
  deleteUserEvent,
  deleteImageFromStorage,
  updateUserAttendingEvents,
  leaveAttendingUserEvents,
} from '../firebase/firebase';
import moment from 'moment';
import Modal from '../components/Modal';
import PersonForm from '../components/PersonForm';
import { ShareButtons } from '../utils/utils';
import { SiGooglecalendar } from 'react-icons/si';
import EventsDetailsSkeleton from './EventsDetailsSkeleton';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

//const gapi = window.gapi
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const EventsDetails = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const history = useHistory();
  const [authorData, setAuthorData] = useState([]);
  const [events, setEvents] = useState([]);
  const [people, setPeople] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageUrlRef = events?.image && projectStorage.refFromURL(events?.image);
  const now = Date.now();

  const Breadcrumbs = withBreadcrumbs()(({ breadcrumbs }) => {
    return (
      <div className="flex flex-row mb-4 -mt-4">
        {breadcrumbs.map(({ breadcrumb }, i) => (
          <>
            {breadcrumbs.length - 1 !== i ? (
              <Link className="mr-2" to={breadcrumb?.key}>{`${
                breadcrumb?.props?.children === 'Myevents'
                  ? 'My events'
                  : breadcrumb?.props?.children
              } →`}</Link>
            ) : (
              <b>{events.title}</b>
            )}
          </>
        ))}
      </div>
    );
  });

  useEffect(() => {
    setLoading(true);
    getCollectionById('events', setEvents, id);
    if (events && events.length !== 0) {
      setLoading(false);
    }
  }, [events?.participants]);

  useEffect(() => {
    const getParticipants = async () => {
      await participantsHandler();
    };
    if (events?.length !== 0) {
      getParticipants();
    }
  }, [events]);

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getUserByUserId(events?.author);
      user && setAuthorData(user);
    };

    events?.author && getUser();
  }, [events]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const [user] = await getUserByUserId(currentUser?.uid);
      user && setUserData(user);
    };
    currentUser?.uid && getCurrentUser();
  }, [currentUser]);

  const onClickGCal = () => {
    window.gapi.load('client:auth2', () => {
      console.log('loaded client');

      window.gapi.client.init({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      window.gapi.client.load('calendar', 'v3', () => console.log('bam!'));

      Promise.resolve(window.gapi.auth2.getAuthInstance().signIn())
        .then(() => {
          console.log('resolveed');
          const event = {
            summary: `${events?.title}`,
            location: `${events?.location}`,
            description: `${events?.description}`,
            start: {
              dateTime: `${moment(events?.date?.seconds * 1000).format()}`,
              timeZone: 'GMT+1',
            },
            end: {
              dateTime: `${
                events?.endDate
                  ? moment(events?.endDate?.seconds * 1000).format()
                  : moment((events?.date?.seconds + 3600) * 1000).format()
              }`,
              timeZone: 'GMT+1',
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };

          const request = window.gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute(event => {
            window.open(event.htmlLink);
          });
        })
        .catch(error => {
          if (error && error.error === 'popup_blocked_by_browser') {
            console.log('A popup has been blocked by the browser');
          } else {
            console.log(error);
            // some other error
          }
        });
    });
  };

  //console.log(displayParticipants());
  // useEffect(()=>{
  //   events?.participants?.length !== 0 && events?.participants?.map(async (item)=> {
  //     const [user] = await getUserByUserId(item);
  //     //console.log(user);
  //     user && setPeople([...people, user]);
  // })
  // }, [events.participants.length])
  const getParticipantsProfiles = async () => {
    if (events?.participants?.length !== 0) {
      return Promise.all(
        events.participants.map(userId => getUserByUserId(userId)),
      );
    }
  };
  const participantsHandler = async () => {
    getParticipantsProfiles().then(participants => setPeople(participants));
    //setModalOpen(true);
  };

  const joinHandler = () => {
    updateEventParticipants(id, events.participants, currentUser?.uid).then(
      () =>
        updateUserAttendingEvents(
          userData?.docId,
          userData?.attendingEvents,
          id,
        ),
    );
  };

  const leaveHandler = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to leave the event?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const newParticipants = events.participants.filter(
              item => item !== currentUser?.uid,
            );
            const attendingEvents = userData?.attendingEvents?.filter(
              item => item !== id,
            );
            removeFromEventParticipants(id, newParticipants).then(() =>
              leaveAttendingUserEvents(userData?.docId, attendingEvents),
            );
            history.push(-1);
          },
        },
        {
          label: 'No',
          onClick: () => history.push(-1),
        },
      ],
    });
  };

  const confirmDeleteEvent = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            events?.image && deleteImageFromStorage(imageUrlRef);
            deleteEvent(id).then(() =>
              deleteUserEvent(authorData?.docId, authorData?.events, id),
            );
            history.push('/events');
          },
        },
        {
          label: 'No',
          onClick: () => history.push(-1),
        },
      ],
    });
  };

  // const DisplayParticipants = () => (
  //   <div className="flex flex-row">
  //     {people.length !== 0 &&
  //       people
  //         .slice(9)
  //         .map(item => <PersonForm person={item} showName={false} />)}
  //   </div>
  // );

  return (
    <div className="py-6 mx-auto max-w-4xl flex-1 justify-items-center">
      <Modal showModal={modalOpen} setShowModal={setModalOpen}>
        {people?.map(person => (
          <PersonForm person={person[0]} />
        ))}
      </Modal>
      {loading ? (
        <EventsDetailsSkeleton />
      ) : (
        <article>
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row bg-transparent">
            <center>
              <h2 className="text-2xl mb-4 md:mb-0 visible md:invisible font-bold justify-self-center bg-transparent">
                {events.title}
              </h2>
            </center>
            {events.image ? (
              <img
                className="flex-auto bg-transparent w-full max-w-xl h-72 object-cover "
                src={events.image}
                alt={events.title + ' image'}
              />
            ) : (
              <p className="flex-auto w-full max-w-xl h-72 object-cover border-2">
                <center>No image for this event</center>
              </p>
            )}
            <div className="px-4 pb-4 flex-col items-start bg-transparent">
              <center>
                <h2 className="text-xl -mb-4 md:mb-0 invisible md:visible font-bold justify-self-center bg-transparent">
                  {events.title}
                </h2>
              </center>
              <p className="text-sm font-bold pt-3 bg-transparent">
                {events?.date?.seconds
                  ? moment(events?.date?.seconds * 1000).format('llll')
                  : events.date}
                -
                {events?.endDate?.seconds
                  ? moment(events?.endDate?.seconds * 1000).format('llll')
                  : events.endDate}
              </p>
              <p onClick={participantsHandler} className="bg-transparent mt-1">
                Participants: {events?.participants?.length}/
                {events?.maxParticipants}
              </p>

              <p className="bg-transparent mt-1">Category: {events.category}</p>
              <p className="bg-transparent mt-1">
                <svg
                  className="w-5 inline-block mr-2 bg-transparent stroke-current "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>{' '}
                {events.location}
              </p>
              <p className="bg-transparent flex items-center">
                <svg
                  className="w-5 inline-block mr-2 bg-transparent stroke-current "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
                <p className="mt-2">
                  <ShareButtons events={events} id={id} />
                </p>
              </p>
              <div className="flex justify-start">
                {(events?.endDate
                  ? events?.endDate?.seconds * 1000
                  : events?.date?.seconds * 1000) > now ? (
                  currentUser &&
                  (events?.participants?.includes(currentUser.uid) ? (
                    <div className="flex flex-row justify-between">
                      <button className="saveGCalBtn" onClick={onClickGCal}>
                        <div className="flex flex-row justify-center items-center bg-transparent text-white">
                          <SiGooglecalendar
                            size={25}
                            color="white"
                            className="bg-transparent fill-white stroke-0 text-white"
                          />
                          <p className="bg-transparent text-current">
                            Save in Google Calendar
                          </p>
                        </div>
                      </button>

                      <button className="leaveEventBtn" onClick={leaveHandler}>
                        Leave
                      </button>
                    </div>
                  ) : (
                    <button className="createEventSubmit" onClick={joinHandler}>
                      Join
                    </button>
                  ))
                ) : (
                  <b className="self-center mt-4">
                    The event has already taken place
                  </b>
                )}
              </div>
            </div>
          </div>
          <div className="border-b-2 p-2 mb-2 ">
            <h3 className="text-lg font-bold">About this event</h3>
            {events.description}
          </div>
          {events.updateDate && (
            <p className="text-xs pb-4">
              Edited: {(events.updateDate = new Date()?.toString())}
            </p>
          )}
          {events?.coordinates && (
            <div className="flex justify-center">
              <iframe
                title="map"
                //width="16rem"
                //height="14rem"
                // style="border:0"
                className="w-full h-64"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPS_API_KEY}&q=${events.coordinates.lat},${events.coordinates.lng}`}></iframe>
            </div>
          )}
          {/* {console.log(`coordinates: https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAPS_API_KEY}&q=${events.coordinates.lat},${events.coordinates.lng}`)} */}
          <div className="flex justify-between mb-4">
            {currentUser && currentUser?.uid === events?.author && (
              <button className="deleteEventBtn" onClick={confirmDeleteEvent}>
                Delete Event
              </button>
            )}
            {currentUser?.uid === events?.author && (
              <Link to={`/updateevent/${id}`}>
                <button className="updateEventBtn">Update Event</button>
              </Link>
            )}
          </div>

          <p className="pt-3 bg-transparent flex flex-row mb-4">
            <b>Participants:</b>
            <div className="flex flex-row">
              {people?.length !== 0 &&
                people?.map(item => (
                  <PersonForm person={item[0]} showName={false} />
                ))}
            </div>
            {/* <Link
              className="bg-transparent flex flex-row justify-evenly ml-2"
              to={`/user/${authorData.userId}`}>
              {events.organizer}
              <img
                className="rounded-full w-6 h-6 ml-2"
                alt="avatar"
                src={authorData.avatarUrl}
              />
            </Link> */}
          </p>

          <p className="pt-3 bg-transparent flex flex-row mb-4">
            <b>Organizer:</b>
            <Link
              className="bg-transparent flex flex-row justify-evenly ml-2"
              to={`/user/${authorData?.userId}`}>
              {events.organizer}
              <img
                className="rounded-full w-6 h-6 ml-2"
                alt="avatar"
                src={authorData?.avatarUrl}
              />
            </Link>
          </p>

          <button
            className="self-center py-2 px-3 border-2 bg-gray-200 shadow hover:shadow-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 tracking-wider transform hover:scale-105 group"
            onClick={() => history.goBack()}>
            <svg
              className="w-5 inline-block mr-2 bg-transparent stroke-current group-hover:stroke-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Go back
          </button>
        </article>
      )}
    </div>
  );
};

export default EventsDetails;
