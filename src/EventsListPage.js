import {
  processSortedCollection,
  getFilteredEvents,
} from './firebase/firebase';
import { useEffect, useState } from 'react';
import EventsListComponent from './EventsListComponent';
import FilterComponent from './FilterComponent';

const EventsListPage = () => {
  const [events, setEvents] = useState([]);
  const [sortBy, setSortBy] = useState('oldest');

  //filters
  const [maxParticipants, setMaxParticipants] = useState();
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    sortBy === 'oldest'
      ? processSortedCollection('events', setEvents, 'additionDate', 'asc')
      : sortBy === 'newest'
      ? processSortedCollection('events', setEvents, 'additionDate', 'desc')
      : sortBy === 'az'
      ? processSortedCollection('events', setEvents, 'title', 'asc')
      : processSortedCollection('events', setEvents, 'title', 'desc');
  }, [sortBy]);

  const submitHandler = async () => {
    await getFilteredEvents(
      setEvents,
      category && category,
      date && date,
      endDate && endDate,
      maxParticipants && maxParticipants,
    );
  };

  return (
    <>
      <FilterComponent
        maxParticipants={maxParticipants}
        setMaxParticipants={setMaxParticipants}
        date={date}
        setDate={setDate}
        endDate={endDate}
        setEndDate={setEndDate}
        category={category}
        setCategory={setCategory}
        submit={submitHandler}
      />
      {events?.length > 0 && (
        <EventsListComponent
          events={events}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      )}
    </>
  );
};

export default EventsListPage;
