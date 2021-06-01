import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom"
import { useAuth } from "./customHooks/AuthContext" 
import {databaseStorage} from './firebase/firebaseConfig'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const EventsDetails = () => {
  const { currentUser } = useAuth()
  const { id } = useParams();
  const history = useHistory();
  const [events, setEvents] = useState([])
  useEffect(()=>{
    const eventRef = databaseStorage.ref('Event/' + id)
    eventRef.on('value', (snapshot)=>{
      const events = snapshot.val()
      setEvents(events)
    })
  },[])

  const deleteEvent = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const eventRef = databaseStorage.ref('Event').child(id)
            eventRef.remove()
            history.push('/events')
          }
        },
        {
          label: 'No',
          onClick: () => history.push(-1)
        }
      ]
    });

    
  }

  return ( 
    <div className="py-6 mx-auto max-w-4xl grid justify-items-center">
      {events && (
        <article>
          <div className="grid grid-cols-3 border-t-2 bg-gray-200">
          {events.image ? <img className="row-span-2 col-span-2 w-full h-64 object-cover " src={events.image} alt={events.title +' image'} /> : <p className="row-span-2 col-span-2 w-full h-64 object-cover border-2"><center>No image for this event</center></p>}
          <div className="p-4 grid justify-items-start bg-transparent">
          <h2 className="text-xl font-bold justify-self-center bg-transparent">{events.title}</h2>
          <p className="pt-3 bg-transparent">Organized by: {events.organizer}</p>
          <p className="bg-transparent">Location: {events.location}</p>
          <p className="bg-transparent">Category: {events.category}</p>
          <p className="text-lg font-bold pt-3 bg-transparent">{events.date}</p>
          </div>
          </div>
          <div className="border-t-2 border-b-2 p-2 mb-2">
           <h3 className="text-lg font-bold">About this event</h3>
           {events.description}
          </div>
          {events.updateDate && <p className="text-xs pb-4">Edited: {events.updateDate = new Date().toString()}</p>}
          <div className="flex justify-between mb-4">{currentUser && (currentUser.uid === events.author && <button className="self-center py-2 px-3 border-2 bg-gray-200 shadow hover:shadow-lg hover:bg-black hover:text-white hover:border-black tracking-wider transform hover:scale-105" onClick={deleteEvent}>Delete Event</button>)}
          {currentUser && (currentUser.uid === events.author && <Link to={`/updateevent/${id}`}>
          <button className="self-center py-2 px-3 border-2 bg-gray-200 shadow hover:shadow-lg hover:bg-black hover:text-white hover:border-black tracking-wider transform hover:scale-105">Update Event</button>
          </Link>)}</div>
          
          <Link className="self-center py-2 px-3 border-2 bg-gray-200 shadow hover:shadow-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 tracking-wider transform hover:scale-105 group" to='/events'><svg className="w-5 inline-block mr-2 bg-transparent stroke-current group-hover:stroke-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>Go to all events</Link>
          
        </article>
      )}
    </div>
   );
}
 
export default EventsDetails;