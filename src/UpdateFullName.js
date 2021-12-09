import { useRef, useState } from 'react';
import { useAuth } from './customHooks/AuthContext';
import { Link, useHistory, useParams } from 'react-router-dom';
import { updateFullName } from './firebase/firebase';

const UpdateFullName = () => {
  const nameRef = useRef();
  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { docId } = useParams();

  const handleSubmit = async e => {
    e.preventDefault();

    await updateFullName(docId, nameRef.current.value)
      .then(() => {
        history.push('/updateprofile');
      })
      .catch(() => {
        setError('Failed to update name');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="m-4 flex justify-center ">
      <form onSubmit={handleSubmit}>
        <h2 className="flex justify-center text-xl">Update fullname</h2>
        <div className="flex flex-col p-6 content-center">
          {error && (
            <div className="bg-red-500 text-white text-center p-2 mb-4">
              {error}
            </div>
          )}
          <h3 className="text-lg mb-3">
            Your name: <strong>{currentUser.fullName}</strong>
          </h3>
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-black focus-within:border-black">
            <svg
              className="w-5 inline-block mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <input
              className="border-l-2 px-2 focus:outline-none focus:ring-transparent focus:ring-2"
              type="text"
              name="fullname"
              ref={nameRef}
              placeholder="Fullname"
              required
            />
          </div>
          <div className="flex flex-row-reverse  items-center justify-between">
            <button className="submitButton" disabled={loading} type="submit">
              Update
            </button>
            <div>
              <Link className="createEventCancel" to="/updateprofile">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateFullName;
