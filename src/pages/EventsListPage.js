import {
  processSortedCollection,
  getFilteredEvents,
} from '../firebase/firebase';
import { useEffect, useState } from 'react';
import EventsListComponent from '../components/EventsListComponent';
import FilterComponent from './FilterComponent';
import EventsListSkeleton from '../components/EventsListSkeleton';
import CalendarComponent from '../components/CalendarComponent';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useHistory, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const EventsListPage = ({ calendarView, setCalendarView }) => {
  const [events, setEvents] = useState([]);
  const [sortBy, setSortBy] = useState('oldest');
  const [loading, setLoading] = useState(true);
  const history = createBrowserHistory();
  const location = useLocation();
  //filters
  const [maxParticipants, setMaxParticipants] = useState();
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  const [category, setCategory] = useState();
  //const [showCalendar, setShowCalendar] = useState(false);
  const [place, setPlace] = useState('');

  useEffect(() => {
    setLoading(true);
    sortBy === 'oldest'
      ? processSortedCollection('events', setEvents, 'date', 'desc')
      : sortBy === 'newest'
      ? processSortedCollection('events', setEvents, 'date', 'asc')
      : sortBy === 'az'
      ? processSortedCollection('events', setEvents, 'title', 'asc')
      : processSortedCollection('events', setEvents, 'title', 'desc');
  }, [sortBy]);

  useEffect(() => {
    if (events?.length > 0) {
      setLoading(false);
    }
  }, [events]);

  const submitHandler = async () => {
    await getFilteredEvents(
      setEvents,
      category && category,
      date && date,
      endDate && endDate,
      maxParticipants && maxParticipants,
    );
    if (place?.length > 0 && events?.length > 0) {
      const filteredEvents = events.filter(event => {
        return event.location.toLowerCase().includes(place.toLowerCase());
      });
      return setEvents(filteredEvents);
    }
  };

  return (
    <div className="flex-1 m-4">
      {loading ? (
        <EventsListSkeleton />
      ) : (
        <div className="flex-1">
          <EventsListComponent
            events={events}
            showCalendar={calendarView}
            setSortBy={setSortBy}
            sortBy={sortBy}>
            <button
              onClick={() => setCalendarView(!calendarView)}
              className="flex flex-row mr-1 pr-2 items-center justify-between content-center">
              <AiOutlineCalendar size={30} />
              <p>{calendarView ? 'Hide' : 'Show'} Calendar View</p>
            </button>
            {calendarView === false && (
              <FilterComponent
                maxParticipants={maxParticipants}
                setMaxParticipants={setMaxParticipants}
                date={date}
                setDate={setDate}
                endDate={endDate}
                setEndDate={setEndDate}
                category={category}
                setCategory={setCategory}
                place={place}
                setPlace={setPlace}
                submit={submitHandler}
              />
            )}
          </EventsListComponent>
          {calendarView && events?.length > 0 && (
            <CalendarComponent events={events} />
          )}
        </div>
      )}
    </div>
  );
};

export default EventsListPage;
