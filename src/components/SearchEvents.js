import { databaseStorage } from '../firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import DataListInput from 'react-plain-datalist-input';
import { processSortedCollection } from '../firebase/firebase';

const SearchEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();
  const today = new Date();

  useEffect(() => {
    processSortedCollection('events', setEvents, 'date', 'asc', today, '>=');
    // eventRef.on('value', snapshot => {
    //   const events = snapshot.val();
    //   const eventList = [];
    //   for (let id in events) {
    //     eventList.push({ ...events[id], id });
    //   }
    //   setEvents(eventList);
    // });
  }, []);

  const onSelect = e => {
    history.push(`/events/${e.key}`);
    history.go(pathname);
  };

  return (
    <div className="border-b-2 border-orange hover:border-black w-48 mx-6">
      <DataListInput
        placeholder=" Search event...."
        value={searchValue}
        onInput={value => {
          setSearchValue(value);
        }}
        items={events?.map(event => ({
          label: event.title,
          key: event.id,
          author: event.organizer,
          category: event.category,
        }))}
        onSelect={onSelect}
      />
    </div>
  );
};

export default SearchEvents;
