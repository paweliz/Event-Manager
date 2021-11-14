import { useState, useEffect } from 'react';
import { useAuth } from './customHooks/AuthContext';
import { useHistory, useParams } from 'react-router-dom';
import { databaseStorage } from './firebase/firebaseConfig';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import useStorage from './customHooks/useStorage';
import './index.css';
import { firestore } from './firebase/firebaseConfig';
import { getCollectionById } from './firebase/firebase';

const UpdateEvent = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  //https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables TODO or to hook useForms
  const imgTypes = ['image/png', 'image/jpeg'];
  const [file, setFile] = useState(null);
  const [imgError, setImgError] = useState(null);
  const { url } = useStorage(file, title);

  const author = currentUser?.uid;
  const additionDate = events?.additionDate;
  const updateDate = Date.now();

  useEffect(() => {
    setImage(url);
  }, [url]);

  useEffect(() => {
    getCollectionById('events', setEvents, id);
  }, []);

  useEffect(() => {
    if (events !== []) {
      setTitle(events.title);
      setDescription(events.description);
      setOrganizer(events.organizer);
      setLocation(events.location);
      setCoordinates(events.coordinates);
      setDate(events.date);
      setCategory(events.category);
      events.image ? setImage(events.image) : setImage(null);
    }
  }, [events]);

  const handleImageChange = e => {
    let selected = e.target.files[0];
    if (selected && imgTypes.includes(selected.type)) {
      setFile(selected);
      setImgError('');
    } else {
      setFile(null);
      setImgError(
        'Selected invalid format of file. Please select png or jpeg.',
      );
    }
  };

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setLocation(value);
    setCoordinates(latLng);
  };

  const updateEvent = async () => {
    const event = {
      title,
      description,
      organizer,
      location,
      coordinates,
      date,
      image,
      category,
      author,
      additionDate,
      updateDate,
    };
    try {
      //eventRef.push(event);
      firestore().collection('events').doc(id).update(event);
      //.then((doc) => updateUserEvents(user?.docId, event, user?.events, doc.id));
    } catch (e) {
      console.log('error', e.message);
    } finally {
      //console.log(event)
      history.push('/');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateEvent();
  };

  return (
    <div className="mt-5 m-4">
      <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        <div className="mt-8 grid lg:grid-cols-3 gap-10">
          <div className="flex flex-col">
            <label>Title:</label>
            <input
              className="border-b-2 hover:border-black focus:border-black focus:outline-none"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Event organizer:</label>
            <input
              className="border-b-2 hover:border-black focus:border-black focus:outline-none"
              type="text"
              value={organizer}
              onChange={e => setOrganizer(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Location:</label>
            <PlacesAutocomplete
              value={location}
              onChange={/*(e) => setLocation(e.target.value)*/ setLocation}
              onSelect={handleSelect}>
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => {
                return (
                  <div>
                    <input
                      className="border-b-2 hover:border-black focus:border-black focus:outline-none"
                      {...getInputProps({ placeholder: 'Type location' })}
                    />
                    <div>
                      {loading ? <div>...loading</div> : null}
                      {suggestions.map(suggestion => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? '#000000'
                            : '#ffffff',
                          color: suggestion.active ? '#ffffff' : '#000000',
                        };

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { style })}>
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }}
            </PlacesAutocomplete>
          </div>
          <div className="flex flex-col">
            <label>Date:</label>
            <input
              className="cursor-pointer border-b-2 hover:border-black focus:border-black focus:outline-none"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Image of the event:</label>
            <input
              className="cursor-pointer"
              type="file"
              onChange={handleImageChange}
            />
            {imgError && <div>{imgError}</div>}
          </div>
          <div className="flex flex-col">
            <label>Category:</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="cursor-pointer border-b-2 hover:border-black focus:outline-none focus:border-black">
              <option value="Arts">Arts</option>
              <option value="Business">Business</option>
              <option value="Charity">Charity</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label>Description:</label>
          <textarea
            className="w-full border-2 hover:border-black h-64"
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button className="self-center py-2 px-3 mt-3 border-2 bg-gray-200 shadow hover:shadow-lg hover:bg-black hover:text-white hover:border-black tracking-wider transform hover:scale-105">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
