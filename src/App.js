import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Create from './pages/Create';
import EventsListPage from './pages/EventsListPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { AuthProvider } from './customHooks/AuthContext';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import EventsDetails from './pages/EventsDetails';
import UpdateEvent from './pages/UpdateEvent';
import MyEvents from './pages/MyEvents';
import VerifyEmail from './pages/VerifyEmail';
import EmailNotVerified from './pages/EmailNotVerified';
import ChangePassword from './pages/ChangePassword';
import UpdateEmail from './pages/UpdateEmail';
import UserPreview from './pages/UserPreview';
import NearYou from './pages/NearYou';
import ProtectedRoute from './ProtectedRoute';
import UpdateFullName from './pages/UpdateFullName';
import SearchEvents from './components/SearchEvents';

function App() {
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [calendarView, setCalendarView] = useState(false);
  const [myEventsCalendarView, setMyEventsCalendarView] = useState(false);

  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Navbar
            navbarVisible={navbarVisible}
            setNavbarVisible={setNavbarVisible}
          />
          <SearchEvents />
          <div className={navbarVisible ? 'content mt-32' : 'content mt-24'}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <ProtectedRoute path="/events/:id">
                <EventsDetails />
              </ProtectedRoute>
              <Route path="/events">
                <EventsListPage
                  calendarView={calendarView}
                  setCalendarView={setCalendarView}
                />
              </Route>
              <ProtectedRoute path="/myevents/:id">
                <EventsDetails />
              </ProtectedRoute>
              <ProtectedRoute path="/myevents">
                <MyEvents
                  calendarView={myEventsCalendarView}
                  setCalendarView={setMyEventsCalendarView}
                />
              </ProtectedRoute>
              <ProtectedRoute path="/updateevent/:id">
                <UpdateEvent />
              </ProtectedRoute>
              <ProtectedRoute path="/create">
                <Create />
              </ProtectedRoute>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/forgotpassword">
                <ForgotPassword />
              </Route>
              <ProtectedRoute path="/updateprofile">
                <UpdateProfile />
              </ProtectedRoute>
              <ProtectedRoute path="/updateemail">
                <UpdateEmail />
              </ProtectedRoute>
              <ProtectedRoute path="/updatefullname/:docId">
                <UpdateFullName />
              </ProtectedRoute>
              <ProtectedRoute path="/changepassword">
                <ChangePassword />
              </ProtectedRoute>
              <ProtectedRoute path="/verifyemail">
                <VerifyEmail />
              </ProtectedRoute>
              <Route path="/notverified">
                <EmailNotVerified />
              </Route>
              <ProtectedRoute path="/user/:id">
                <UserPreview />
              </ProtectedRoute>
              <Route path="/nearyou">
                <NearYou />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
