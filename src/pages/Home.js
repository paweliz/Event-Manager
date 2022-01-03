import { useEffect, useState } from 'react';
import { processSortedCollection } from '../firebase/firebase';
import EventsListComponent from '../components/EventsListComponent';
import LandingPageComponent from '../components/LandingPageComponent';

const Home = () => {
  const [events, setEvents] = useState([]);
  const today = new Date();
  useEffect(() => {
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

  return (
    <div className="m-4 flex flex-col">
      <div className="h-3/5">
        <LandingPageComponent />
      </div>
      {events.length > 0 && (
        <EventsListComponent
          events={events}
          sortable={false}
          title={'Upcoming events'}
        />
      )}
    </div>
  );
};

export default Home;
