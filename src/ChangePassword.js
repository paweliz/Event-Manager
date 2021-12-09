import { useRef, useState } from 'react';
import { useAuth } from './customHooks/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { validPassword } from './Regex.js';

const ChangePassword = () => {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [passwordError, setPasswordError] = useState(false);

  const validate = () => {
    setPasswordError(!validPassword.test(passwordRef.current.value));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (currentUser === null) {
    history.push('/login');
    return null;
  }

  return (
    <div className="m-4 flex justify-center">
      <form onSubmit={handleSubmit}>
        <h2 className="flex justify-center text-xl">Change Password</h2>
        <div className="flex flex-col p-6">
          {error && (
            <div className="bg-red-500 text-white text-center p-2 mb-4">
              {error}
            </div>
          )}
          {passwordError && (
            <div className="bg-red-500 text-white text-center p-2 mb-4">
              enter valid password
            </div>
          )}
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-black focus-within:border-black">
            <svg
              class="w-5 inline-block mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>
            <input
              className="border-l-2 px-2 focus:outline-none focus:ring-transparent focus:ring-2"
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="Password"
              required
            />
          </div>
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-black focus-within:border-black">
            <svg
              class="w-5 inline-block mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>
            <input
              className="border-l-2 px-2 focus:outline-none focus:ring-transparent focus:ring-2"
              type="password"
              name="password-confirm"
              ref={passwordConfirmRef}
              placeholder="Password Confirmation"
              required
            />
          </div>
          <div className="flex flex-row-reverse justify-between items-center">
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

export default ChangePassword;
