import {
  getCollectionByGivenParam,
  getEventById,
  getUserByUserId,
} from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from '../customHooks/AuthContext';
import { useHistory } from 'react-router-dom';
import EventsListComponent from '../components/EventsListComponent';
import CalendarComponent from '../components/CalendarComponent';
import { AiOutlineCalendar } from 'react-icons/ai';

const MyEvents = ({ calendarView, setCalendarView }) => {
  const [events, setEvents] = useState([]);
  const { currentUser } = useAuth();
  const history = useHistory();
  const [activeButton, setActiveButton] = useState('left');
  const [user, setUser] = useState([]);

  if (currentUser?.emailVerified === false) {
    history.push('/notverified');
  }

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getUserByUserId(currentUser.uid);
      user && setUser(user);
    };
    currentUser?.uid && getUser();
  }, [currentUser]);

  const getUserAttendingEvents = async () => {
    if (user?.attendingEvents?.length !== 0) {
      return Promise.all(
        user?.attendingEvents?.map(eventId => getEventById(eventId)),
      );
    }
  };
  const eventsHandler = async () => {
    setActiveButton('right');
    getUserAttendingEvents().then(events => {
      let tmpEvents = [];
      events?.forEach(event => {
        tmpEvents.push(event[0]);
      });
      setEvents(tmpEvents);
    });
  };

  useEffect(() => {
    if (activeButton === 'left') {
      getCollectionByGivenParam('events', setEvents, 'author', currentUser.uid);
      return;
    }
  }, [activeButton]);

  return (
    <div className="m-4">
      {/* <p className="text-xl text-bold">List of Events</p> */}
      <div className="flex flex-row justify-between ">
        <div className="ml-1">
          <button
            className={
              activeButton === 'left'
                ? 'activeMyEventsButton'
                : 'inactiveMyEventsButton'
            }
            onClick={() => setActiveButton('left')}>
            Created
          </button>
          <button
            className={
              activeButton === 'right'
                ? 'activeMyEventsButton'
                : 'inactiveMyEventsButton'
            }
            onClick={eventsHandler}>
            Taking part
          </button>
        </div>
        <button
          onClick={() => setCalendarView(!calendarView)}
          className="flex flex-row mt-2 pr-2 items-center self-center justify-between content-center">
          <AiOutlineCalendar size={30} />
          <p className="ml-2">{calendarView ? 'Hide' : 'Show'} Calendar View</p>
        </button>
      </div>
      {events?.length > 0 ? (
        <EventsListComponent
          withTitle={false}
          events={events}
          sortable={false}
          showOutdated={true}
          fromMyEvents={true}
          showCalendar={calendarView}
        />
      ) : activeButton === 'left' ? (
        <p>You have not created any events yet...</p>
      ) : (
        <p>You are not taking part in any events yet...</p>
      )}
      {calendarView && events?.length > 0 && (
        <CalendarComponent events={events} />
      )}
    </div>
  );
};

export default MyEvents;
