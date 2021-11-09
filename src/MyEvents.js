import { getCollectionByGivenParam } from './firebase/firebase'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "./customHooks/AuthContext"
import { useHistory } from "react-router-dom"

const MyEvents = () => {
  const [events, setEvents] = useState([])
  const { currentUser } = useAuth()
  const history = useHistory()

  useEffect(()=>{
    getCollectionByGivenParam('events', setEvents, 'author', currentUser.uid)
  },[])

  if(currentUser?.emailVerified === false){
    history.push('/notverified')
  }

  return ( 
  <div className="m-4">
    <p className="text-xl text-bold">List of Events</p>
    <div className="mt-8 grid lg:grid-cols-3 gap-10">
    {events.map(event => (
      <div className="group rounded overflow-hidden hover:shadow-md transform hover:scale-105 hover:-translate-y-1 border hover:border-0" key={event.id}>
          <Link to={`/events/${event.id}`}>
          {event.image ? <img className="w-full h-32 object-cover filter grayscale group-hover:filter-none" src={event.image} alt={event.title +' image'}/> : <div className="w-full h-32 object-cover border-b-2 group-hover:border-transparent"><center>No image for this event</center></div>}
          <div className="p-4 border-t-2 border-transparent group-hover:border-black">
          <h2 className="text-center text-xl font-bold text-black">{ event.title }</h2>
          <p className="block text-sm">Organized by { event.organizer }</p>
          </div>
          </Link>
        </div>
      ))}
   </div>
  </div> 
  );
}
 
export default MyEvents;