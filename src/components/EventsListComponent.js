import { Link } from 'react-router-dom';
import { getDistance } from 'geolib';
import moment from 'moment';

const EventsListComponent = ({
  events,
  sortBy,
  setSortBy = 'newest',
  sortable = true,
  withTitle = true,
  title = 'List of Events',
  currentCoordinates,
  children,
  showOutdated = false,
  showCalendar = false,
  fromMyEvents = false,
}) => {
  const handleChange = e => {
    setSortBy(e.target.value);
  };
  const now = Date.now();

  return (
    <div>
      <div className="flex flex-row justify-between">
        {withTitle && <p className=" text-xl text-bold mt-2">{title}</p>}
        <div className="flex flex-row justify-content-end">
          {children}
          {sortable && showCalendar === false && (
            <select
              className="cursor-pointer border-b-2 border-transparent hover:border-black"
              value={sortBy}
              onChange={handleChange}>
              <option value="az">A-Z Title</option>
              <option value="za">Z-A Title</option>
              <option value="newest">Lastest First</option>
              <option value="oldest">Latest Last</option>
            </select>
          )}
        </div>
      </div>
      {showCalendar === false && (
        <div className="mt-6 grid md:grid-cols-4 gap-10">
          {events?.map(
            event =>
              (event?.endDate
                ? event?.endDate?.seconds * 1000
                : event?.date?.seconds * 1000) > now && (
                <div
                  className={
                    (event?.endDate
                      ? event?.endDate?.seconds * 1000
                      : event?.date?.seconds * 1000) > now
                      ? 'group rounded overflow-hidden hover:shadow-md transform hover:scale-105 hover:-translate-y-1 border hover:border-0'
                      : 'group rounded overflow-hidden hover:shadow-md transform hover:scale-105 hover:-translate-y-1 border hover:border-0 opacity-50 filter grayscale'
                  }
                  key={event.id}>
                  {currentCoordinates && (
                    <p className="z-10 overflow-hidden absolute bg-orange text-white rounded p-1">
                      {Math.round(
                        getDistance(
                          {
                            longitude: event.coordinates.lng,
                            latitude: event.coordinates.lat,
                          },
                          {
                            longitude: currentCoordinates?.longitude,
                            latitude: currentCoordinates?.latitude,
                          },
                        ) / 100,
                      ) / 10}{' '}
                      km away
                    </p>
                  )}
                  <Link
                    to={
                      fromMyEvents
                        ? `/myevents/${event.id}`
                        : `/events/${event.id}`
                    }>
                    {event.image ? (
                      <img
                        className="w-full h-32 object-cover"
                        src={event.image}
                        alt={event.title + ' image'}
                      />
                    ) : (
                      <div className="w-full h-32 object-cover border-b-2 group-hover:border-transparent">
                        <center>No image for this event</center>
                      </div>
                    )}
                    <div className="p-4 border-t-2 border-transparent group-hover:border-orange flex flex-row items-center">
                      <div className="flex flex-col mr-4">
                        <p className="text-red-600">
                          {moment(event?.date?.seconds * 1000).format('MMM')}
                        </p>
                        <p>
                          {moment(event?.date?.seconds * 1000).format('Do')}
                        </p>
                      </div>
                      <div className="container grid grid-rows-2 bg-black">
                        <h2 className="text-center text-xl font-bold text-black truncate ">
                          {event.title}
                        </h2>
                        <p className="block text-sm truncate">
                          Hosted in {event.location?.split(',')[0]}
                        </p>
                        <p className="block text-sm truncate">
                          Organized by {event.organizer}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ),
          )}
          {showOutdated &&
            events.map(
              event =>
                (event?.endDate
                  ? event?.endDate?.seconds * 1000
                  : event?.date?.seconds * 1000) < now && (
                  <div
                    className={
                      (event?.endDate
                        ? event?.endDate?.seconds * 1000
                        : event?.date?.seconds * 1000) > now
                        ? 'group rounded overflow-hidden hover:shadow-md transform hover:scale-105 hover:-translate-y-1 border hover:border-0'
                        : 'group rounded overflow-hidden hover:shadow-md transform hover:scale-105 hover:-translate-y-1 border hover:border-0 opacity-50 filter grayscale'
                    }
                    key={event.id}>
                    {currentCoordinates && (
                      <p className="z-10 overflow-hidden absolute bg-orange text-white rounded p-1">
                        {Math.round(
                          getDistance(
                            {
                              longitude: event.coordinates.lng,
                              latitude: event.coordinates.lat,
                            },
                            {
                              longitude: currentCoordinates?.longitude,
                              latitude: currentCoordinates?.latitude,
                            },
                          ) / 100,
                        ) / 10}{' '}
                        km away
                      </p>
                    )}
                    <Link
                      to={
                        fromMyEvents
                          ? `/myevents/${event.id}`
                          : `/events/${event.id}`
                      }>
                      {event.image ? (
                        <img
                          className="w-full h-32 object-cover"
                          src={event.image}
                          alt={event.title + ' image'}
                        />
                      ) : (
                        <div className="w-full h-32 object-cover border-b-2 group-hover:border-transparent">
                          <center>No image for this event</center>
                        </div>
                      )}
                      <div className="p-4 border-t-2 border-transparent group-hover:border-orange flex flex-row items-center">
                        <div className="flex flex-col mr-4">
                          <p className="text-red-600">
                            {moment(event?.date?.seconds * 1000).format('MMM')}
                          </p>
                          <p>
                            {moment(event?.date?.seconds * 1000).format('Do')}
                          </p>
                        </div>
                        <div className="container grid grid-rows-2 bg-black">
                          <h2 className="text-center text-xl font-bold text-black truncate ">
                            {event.title}
                          </h2>
                          <p className="block text-sm truncate">
                            Hosted in {event.location?.split(',')[0]}
                          </p>
                          <p className="block text-sm truncate">
                            Organized by {event.organizer}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ),
            )}
        </div>
      )}
    </div>
  );
};

export default EventsListComponent;
