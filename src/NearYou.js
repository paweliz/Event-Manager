import EventsListComponent from './EventsListComponent';
import useGeolocation from 'react-hook-geolocation';
import {getDistance} from 'geolib';
import {useState, useEffect} from 'react';
import {getCollection} from './firebase/firebase';

const NearYou = () => {
  const geolocation = useGeolocation();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getCollection('events', setEvents);
  }, []);

  useEffect(() => {
    const sortedEvents = () => {
      if (!geolocation?.error?.message && geolocation?.latitude !== null) {
        events.sort((a, b) =>
          getDistance(
            {longitude: a.coordinates.lng, latitude: a.coordinates.lat},
            {longitude: geolocation?.longitude, latitude: geolocation?.latitude},
          ) >
          getDistance(
            {longitude: b.coordinates.lng, latitude: b.coordinates.lat},
            {longitude: geolocation?.longitude, latitude: geolocation?.latitude},
          )
        );
        return events;
      }
    };
    return sortedEvents;
  }, [geolocation])

  return (
    <>
      {!geolocation?.error?.message ? (
        <EventsListComponent
          setSortBy={false}
          sortable={false}
          withTitle={false}
          title={''}
          events={events}
          currentCoordinates={geolocation.latitude!== null && geolocation}
        />
      ) : <p>enable location</p>}
    </>
  );
};

export default NearYou;
