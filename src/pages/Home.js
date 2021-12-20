import { useEffect, useState } from 'react';
import { processSortedCollection } from '../firebase/firebase';
import EventsListComponent from '../components/EventsListComponent';

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
    <div className="m-4">
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