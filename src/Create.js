import { useEffect, useState } from 'react';
import { useAuth } from './customHooks/AuthContext';
import { useHistory } from 'react-router-dom';
import { databaseStorage } from './firebase/firebaseConfig';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import useStorage from './customHooks/useStorage';
import { uuid } from 'uuidv4';
import { firestore } from './firebase/firebaseConfig';
import { getUserByUserId, updateUserEvents } from './firebase/firebase';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

const Create = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [category, setCategory] = useState('Arts');
  const [maxParticipants, setMaxParticipants] = useState(1);
  const imgTypes = ['image/png', 'image/jpeg'];
  const uuId = uuid();
  const { url, progress } = useStorage(file, `events/${uuId}`);
  const [user, setUser] = useState(null);
  const querable = true;

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getUserByUserId(currentUser?.uid);
      user && setUser(user);
    };

    currentUser && getUser();
  }, [currentUser]);

  const participants = [currentUser?.uid];
  const organizer = user?.fullName;
  const author = currentUser?.uid;
  const additionDate = Date.now();

  useEffect(() => {
    setImage(url);
    setImageLoading(false);
  }, [url]);

  if (currentUser?.emailVerified === false) {
    history.push('/notverified');
  }

  const handleImageChange = e => {
    let selected = e.target.files[0];
    setImageLoading(true);
    if (selected && imgTypes.includes(selected.type)) {
      setFile(selected);
      setImgError('');
    } else {
      setFile(null);
      setImageLoading(false);
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

  const createEvent = async () => {
    const event = {
      title,
      participants,
      maxParticipants,
      description,
      organizer,
      location,
      coordinates,
      date,
      endDate,
      image,
      category,
      author,
      additionDate,
      querable,
    };
    try {
      //eventRef.push(event);
      firestore()
        .collection('events')
        .add(event)
        .then(doc =>
          updateUserEvents(user?.docId, event, user?.events, doc.id),
        );
    } catch (e) {
      console.log('error', e.message);
    } finally {
      history.push('/');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createEvent();
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
            <label>Number of participants:</label>
            <input
              className="border-b-2 hover:border-black focus:border-black focus:outline-none"
              type="number"
              min="1"
              value={maxParticipants}
              onChange={e => setMaxParticipants(parseInt(e.target.value, 10))}
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
            <label>Start date:</label>
            <DateTimePicker
              className="cursor-pointer border-b-2 hover:border-black focus:border-black focus:outline-none"
              // type="date"
              value={date}
              minDate={new Date()}
              onChange={e => setDate(e)}
              disableClock={true}
            />
          </div>
          {date !== '' && (
            <div className="flex flex-col">
              <label>End date:</label>
              <DateTimePicker
                className="cursor-pointer border-b-2 hover:border-black focus:border-black focus:outline-none"
                // type="date"
                value={endDate}
                minDate={date}
                onChange={e => setEndDate(e)}
                disableClock={true}
              />
            </div>
          )}
          <div className="flex flex-col">
            <label>Image of the event:</label>
            <input
              className="cursor-pointer"
              type="file"
              onChange={handleImageChange}
            />
            <div className="imgOut">
              {imgError && <div className="imgError">{imgError}</div>}
              {file && <div className="imgName">{file.name}</div>}
              {progress > 0 &&
                (progress === 100 ? `Image ${file.name} attached` : progress)}
            </div>
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
        {!imageLoading && (
          <button className="self-center py-2 px-3 mt-3 border-2 bg-gray-200 shadow hover:shadow-lg hover:bg-black hover:text-white hover:border-black tracking-wider transform hover:scale-105">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;
