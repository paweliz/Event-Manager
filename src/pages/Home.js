import { useEffect, useState } from 'react';
import { processSortedCollection } from '../firebase/firebase';
import EventsListComponent from '../components/EventsListComponent';
import LandingPageComponent from '../components/LandingPageComponent';
import { useAuth } from '../customHooks/AuthContext';
import { getUserByUserId } from '../firebase/firebase';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [eventsFromCategory, setEventsFromCategory] = useState([]);
  const { currentUser } = useAuth();
  const today = new Date();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getUserByUserId(currentUser.uid);
      user && setUser(user);
    };
    currentUser?.uid && getUser();
  }, [currentUser]);

  useEffect(() => {
    currentUser !== null &&
      processSortedCollection(
        'events',
        setEvents,
        'date',
        'asc',
        'date',
        today,
        '>=',
        4,
      );
  }, []);

  useEffect(() => {
    if (user?.favouriteCategory) {
      if (events) {
        let filteredEvents = events.filter(
          event => event?.category === user?.favouriteCategory,
        );
        setEventsFromCategory(filteredEvents);
      }
    }
  }, [user?.favouriteCategory, events]);

  return (
    <div className="m-4 flex-1 flex-col items-center content-center">
      {currentUser === null ? (
        <div className="h-3/5">
          <LandingPageComponent />
        </div>
      ) : (
        <>
          {eventsFromCategory.length > 0 && (
            <EventsListComponent
              events={eventsFromCategory}
              sortable={false}
              title={`Events from your favourite category, ${user?.favouriteCategory}`}
            />
          )}
          {events.length > 0 && (
            <EventsListComponent
              events={events}
              sortable={false}
              title={'Upcoming events'}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
