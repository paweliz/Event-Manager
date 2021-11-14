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
}) => {
  const handleChange = e => {
    setSortBy(e.target.value);
  };
  const now = Date.now();

  return (
    <div className="m-4">
      <div className="flex flex-row justify-between">
        {withTitle && <p className="text-xl text-bold">{title}</p>}
        {sortable && (
          <select
            className="cursor-pointer border-b-2 border-transparent hover:border-black"
            value={sortBy}
            onChange={handleChange}>
            <option value="az">A-Z Title</option>
            <option value="za">Z-A Title</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        )}
      </div>
      <div className="mt-8 grid lg:grid-cols-4 gap-10">
        {events.map(
          event =>
            (event?.endDate
              ? event?.endDate?.seconds * 1000
              : event?.date?.seconds * 1000) > now && (
              <div
                className="group rounded overflow-hidden hover:shadow-md transform hover:scale-105 hover:-translate-y-1 border hover:border-0"
                key={event.id}>
                {currentCoordinates && (
                  <p>
                    {getDistance(
                      {
                        longitude: event.coordinates.lng,
                        latitude: event.coordinates.lat,
                      },
                      {
                        longitude: currentCoordinates?.longitude,
                        latitude: currentCoordinates?.latitude,
                      },
                    ) / 1000}{' '}
                    km away
                  </p>
                )}
                <Link to={`/events/${event.id}`}>
                  {event.image ? (
                    <img
                      className="w-full h-32 object-cover filter grayscale group-hover:filter-none"
                      src={event.image}
                      alt={event.title + ' image'}
                    />
                  ) : (
                    <div className="w-full h-32 object-cover border-b-2 group-hover:border-transparent">
                      <center>No image for this event</center>
                    </div>
                  )}
                  <div className="p-4 border-t-2 border-transparent group-hover:border-black grid grid-cols-2 -gap-1">
                    <div className="grid grid-rows-2 bg-black">
                      <p>{moment(event?.date?.seconds * 1000).format('MMM')}</p>
                      <p>{moment(event?.date?.seconds * 1000).format('Do')}</p>
                    </div>
                    <div className="container grid grid-rows-2 bg-black">
                      <h2 className="text-center text-xl font-bold text-black">
                        {event.title}
                      </h2>
                      <p className="block text-sm">
                        Organized by {event.organizer}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default EventsListComponent;
