import EventsListComponent from "./EventsListComponent";
import {Link, useHistory, useParams} from 'react-router-dom';
import { getCollectionByGivenParam, getUserByUserId } from "./firebase/firebase";
import { useState, useEffect } from "react";
import moment from "moment";
const UserPreview = () => {
  const {id} = useParams();
  const [userEvents, setUserEvents] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(()=>{
    const getUser = async () => {
      const [user] = await getUserByUserId(id);
      user && setUserDetails(user);
    };
    return getUser();
  },[])

  useEffect(()=>{
    getCollectionByGivenParam('events', setUserEvents, 'author', id);
    // const [user] = 
    // user && 
  },[])
  console.log(userDetails, userEvents)
  return ( 
    <div>
      <div>
      {userDetails?.avatarUrl ? (
              <img
                className="rounded-full w-20 h-20"
                alt="avatar"
                src={userDetails.avatarUrl}
              />
            ) : (
              <div className="rounded-full w-20 h-20 bg-black" />
            )}
            <h2>{userDetails.fullName}</h2>
            <p>Account created {moment(userDetails.dateCreated).fromNow()}</p>
            {console.log(userDetails.dateCreated)}
            {userDetails?.events?.length>0 && <p>Total events: {userDetails?.events.length}</p>}
      </div>
      <EventsListComponent events={userEvents} sortable={false} title={false}/>
    </div>
   );
}
 
export default UserPreview;