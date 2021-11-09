import {Link} from 'react-router-dom';
import {getDistance} from 'geolib';
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
  // const [sortBy, setSortBy] = useState('oldest');

  const handleChange = e => {
    setSortBy(e.target.value);
    // sortedEvents();
  };
  // const sortedEvents = () => {
  //   if (sortBy === 'az') {
  //     events.sort((a, b) =>
  //       a.title.toLowerCase() > b.title.toLowerCase()
  //         ? -1
  //         : a.title.toLowerCase() < b.title.toLowerCase()
  //         ? 1
  //         : 0,
  //     );
  //     return events;
  //   }
  //   if (sortBy === 'za') {
  //     events.sort((a, b) =>
  //       a.title.toLowerCase() < b.title.toLowerCase()
  //         ? -1
  //         : a.title.toLowerCase() > b.title.toLowerCase()
  //         ? 1
  //         : 0,
  //     );
  //     return events;
  //   }
  //   if (sortBy === 'newest') {
  //     events.sort(
  //       (a, b) => new Date(a.additionDate) - new Date(b.additionDate),
  //     );
  //     return events;
  //   }
  //   if (sortBy === 'oldest') {
  //     events.sort(
  //       (a, b) => new Date(b.additionDate) - new Date(a.additionDate),
  //     );
  //     return events;
  //   }
  // };

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
      <div className="mt-8 grid lg:grid-cols-3 gap-10">
        {events.map(event => (
          <div
            className="group rounded overflow-hidden hover:shadow-md transform hover:scale-105 hover:-translate-y-1 border hover:border-0"
            key={event.id}>
            {currentCoordinates && <p>{getDistance(
            {longitude: event.coordinates.lng, latitude: event.coordinates.lat},
            {longitude: currentCoordinates?.longitude, latitude: currentCoordinates?.latitude})/1000} km away</p>}
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
                <div className="grid grid-rows-2 bg-black"><p>{event?.date?.seconds ? moment(event?.date?.seconds * 1000).format('MMM') : event.date}</p><p>{event?.date?.seconds ? moment(event?.date?.seconds * 1000).format('Do') : event.date}</p></div>
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
        ))}
      </div>
    </div>
  );
};

export default EventsListComponent;
