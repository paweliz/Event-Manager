import {processSortedCollection} from './firebase/firebase';
import {useEffect, useState} from 'react';
import EventsListComponent from './EventsListComponent';

const EventsListPage = () => {
  const [events, setEvents] = useState([]);
  const [sortBy, setSortBy] = useState('oldest');

  useEffect(() => {
    sortBy === 'oldest'
      ? processSortedCollection('events', setEvents, 'additionDate', 'asc')
      : sortBy === 'newest'
      ? processSortedCollection('events', setEvents, 'additionDate', 'desc')
      : sortBy === 'az'
      ? processSortedCollection('events', setEvents, 'title', 'asc')
      : processSortedCollection('events', setEvents, 'title', 'desc');
  }, [sortBy]);

  return <>
  <input></input>
  {events?.length > 0 && <EventsListComponent events={events} setSortBy={setSortBy} sortBy={sortBy} />}</>;
};

export default EventsListPage;
