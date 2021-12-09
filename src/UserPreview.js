import EventsListComponent from './EventsListComponent';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  getCollectionByGivenParam,
  getUserByUserId,
} from './firebase/firebase';
import { useState, useEffect } from 'react';
import moment from 'moment';
const UserPreview = () => {
  const { id } = useParams();
  const [userEvents, setUserEvents] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getUserByUserId(id);
      user && setUserDetails(user);
    };
    return getUser();
  }, []);

  useEffect(() => {
    getCollectionByGivenParam('events', setUserEvents, 'author', id);
    // const [user] =
    // user &&
  }, []);
  return (
    <div className="ml-4">
      <div className="flex flex-row">
        {userDetails?.avatarUrl ? (
          <img
            className="rounded-full w-20 h-20"
            alt="avatar"
            src={userDetails.avatarUrl}
          />
        ) : (
          <div className="rounded-full w-20 h-20 bg-black" />
        )}
        <div className="flex ml-4 flex-col">
          <h2>
            <b>{userDetails.fullName}</b>
          </h2>
          <p>Account created: {moment(userDetails.dateCreated).fromNow()}</p>
          {userDetails?.events?.length > 0 && (
            <p>Created events: {userDetails?.events.length}</p>
          )}
        </div>
      </div>
      <EventsListComponent events={userEvents} sortable={false} title={false} />
    </div>
  );
};

export default UserPreview;
