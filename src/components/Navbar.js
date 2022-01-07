import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../customHooks/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { getUserByUserId } from '../firebase/firebase';
import { useLocation } from 'react-router-dom';
import SearchEvents from './SearchEvents';

const Navbar = ({ navbarVisible, setNavbarVisible }) => {
  const { currentUser, logout } = useAuth();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const history = useHistory();
  const ref = useRef();
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getUserByUserId(currentUser?.uid);
      user && setUser(user);
    };

    currentUser !== null && getUser();
  }, [currentUser]);

  async function handleLogout() {
    setError('');
    setModal(false);
    try {
      await logout();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }
  useEffect(() => {
    if (currentUser === null) {
      setNavbarVisible(false);
    }
    if (currentUser) {
      setNavbarVisible(true);
    }
  }, [currentUser]);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (modal && ref.current && !ref.current.contains(e.target)) {
        setModal(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [modal]);

  const handleClick = () => {
    if (modal) {
      setModal(false);
    }
    if (!modal) {
      setModal(true);
    }
  };

  return (
    <nav className="navbar w-screen flex flex-col items-center bg-transparent fixed top-0 z-20 ">
      <div className="flex flex-row self-start items-center justify-between w-screen shadow-md border-b-2 border-orange">
        <Link to="/">
          <h1 className="bg-transparent p-5 text-m md:text-xl text-black">
            Event manager
          </h1>
        </Link>
        {currentUser !== null && (
          <div
            className="self-end justify-self-center "
            onClick={() => setNavbarVisible(!navbarVisible)}>
            <svg
              className={
                navbarVisible
                  ? 'w-6 h-6 bg-transparent stroke-current transform rotate-180'
                  : 'w-6 h-6 bg-transparent stroke-current'
              }
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        )}
        {currentUser !== null ? (
          <div className="flex flex-row items-center">
            <SearchEvents />
            <div className="relative mr-4 bg-transparent">
              <button
                className="group relative focus:outline-none"
                onClick={handleClick}>
                {user?.avatarUrl ? (
                  <img
                    className="rounded-full w-10 h-10 border border-black bg-transparent"
                    alt="avatar"
                    src={user.avatarUrl}
                  />
                ) : (
                  <p className="text-orange">
                    <svg
                      className="w-10 h-10 bg-transparent stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </p>
                )}
              </button>
              {modal && (
                <div
                  className="absolute right-0 z-20 top-15 w-screen md:w-48 md:-mr-4 border-t-2 border-orange bg-white rounded-md shadow-xl dark:bg-gray-800 w-screen"
                  ref={ref}>
                  <div className="p-3">
                    <h2>Hello, </h2>
                    {error && <div>{error}</div>}
                    <strong>
                      {user?.fullName ? user?.fullName : currentUser?.email}
                    </strong>
                  </div>
                  <Link
                    to="/updateprofile"
                    onClick={() => setModal(false)}
                    className="block px-4 py-2 text-sm text-black capitalize transition-colors duration-200 transform hover:bg-orange hover:text-white dark:hover:text-white">
                    Update Profile
                  </Link>
                  <div
                    className="block px-4 py-2 text-sm text-black cursor-pointer capitalize transition-colors duration-200 transform hover:bg-orange hover:text-white dark:hover:text-white"
                    onClick={handleLogout}>
                    Log Out
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* <svg
              className="w-10 h-10 bg-transparent"
              fill="none"
              stroke="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg> */}
            <Link
              to="/login"
              className={
                location?.pathname === '/login'
                  ? 'loginBtnActive'
                  : 'loginBtnInactive'
              }>
              Login
            </Link>
            <Link
              to="/signup"
              className={
                location?.pathname === '/signup'
                  ? 'registerBtnActive'
                  : 'registerBtnInactive'
              }>
              Sign Up
            </Link>
          </div>
        )}
      </div>
      {navbarVisible && (
        <div className="links flex flex-row w-screen">
          <Link
            to="/"
            className={location?.pathname === '/' ? 'activeTab' : 'navtab'}>
            Home
          </Link>
          <Link
            to="/events"
            className={
              location?.pathname === '/events' ? 'activeTab' : 'navtab'
            }>
            All events
          </Link>
          <Link
            to="/nearyou"
            className={
              location?.pathname === '/nearyou' ? 'activeTab' : 'navtab'
            }>
            Near you
          </Link>
          {currentUser !== null && (
            <Link
              to="/myevents"
              className={
                location?.pathname === '/myevents' ? 'activeTab' : 'navtab'
              }>
              My events
            </Link>
          )}
          {currentUser !== null && (
            <Link
              to="/create"
              className={
                location?.pathname === '/create' ? 'activeTab' : 'navtab'
              }>
              Add event
            </Link>
          )}
          {/* {currentUser === null && (
            <>
              <div className="navtab w-96 pointer-events-none"></div>
              <Link
                to="/signup"
                className={
                  location?.pathname === '/signup' ? 'activeTab' : 'loginBtn'
                }>
                Sign Up
              </Link>
            </>
          )}
          {currentUser === null && (
            <Link
              to="/login"
              className={
                location?.pathname === '/login' ? 'activeTab' : 'loginBtn'
              }>
              Login
            </Link>
          )} */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
