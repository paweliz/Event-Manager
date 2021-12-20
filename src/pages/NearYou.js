import EventsListComponent from '../components/EventsListComponent';
import useGeolocation from 'react-hook-geolocation';
import { getDistance } from 'geolib';
import { useState, useEffect } from 'react';
import { getCollection } from '../firebase/firebase';
import EventsListSkeleton from '../components/EventsListSkeleton';

const NearYou = () => {
  const geolocation = useGeolocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getCollection('events', setEvents);
  }, []);

  useEffect(() => {
    const sortedEvents = () => {
      if (
        !geolocation?.error?.message &&
        geolocation?.latitude !== null &&
        geolocation?.longitude !== null &&
        events?.length !== 0 &&
        loading
      ) {
        events.sort(
          (a, b) =>
            // console.log(
            //   a.title,
            //   ':',
            //   a.coordinates.lng,
            //   a.coordinates.lat,
            //   '\n',
            //   b.title,
            //   ':',
            //   b.coordinates.lng,
            //   b.coordinates.lat,
            // ),
            //   (
            getDistance(
              { longitude: a.coordinates.lng, latitude: a.coordinates.lat },
              {
                longitude: geolocation.longitude,
                latitude: geolocation.latitude,
              },
            ) >
            getDistance(
              { longitude: b.coordinates.lng, latitude: b.coordinates.lat },
              {
                longitude: geolocation.longitude,
                latitude: geolocation.latitude,
              },
            ),
          // )
        );
        return events && setLoading(false);
      }
    };
    return sortedEvents;
  }, [geolocation, events]);

  return (
    <>
      {loading ? (
        <EventsListSkeleton />
      ) : !geolocation?.error?.message ? (
        <EventsListComponent
          setSortBy={false}
          sortable={false}
          withTitle={false}
          title={''}
          events={events}
          currentCoordinates={geolocation?.latitude !== null && geolocation}
        />
      ) : (
        <p>enable location</p>
      )}
    </>
  );
};

export default NearYou;
