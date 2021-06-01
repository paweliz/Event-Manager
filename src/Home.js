import { useEffect, useState } from "react"
import {Link } from "react-router-dom"
import {databaseStorage} from './firebase/firebaseConfig'

const Home = () => {
  const [events, setEvents] = useState([])
  let displayEvents = []

  useEffect(()=>{
    const eventRef = databaseStorage.ref('Event')
    eventRef.on('value', (snapshot)=>{
      const events = snapshot.val()
      const eventList = []
      for (let id in events){
        eventList.push({...events[id],id})
      }
      setEvents(eventList)
    })
  },[])

  const latestEvents = (events) => {

    events.sort((a, b) => ((a.additionDate || a.updateDate) < b.additionDate ? 1 : -1))
    return events
  }

  displayEvents = latestEvents(events).slice(0,6)

  return ( 
    <div className="m-4">
      <h2 className="text-xl text-bold">Latest added events</h2>
      <div className="mt-8 grid lg:grid-cols-3 gap-10">
      {displayEvents.map(event => (
        <div className="group rounded overflow-hidden hover:shadow-md transform hover:scale-105 hover:-translate-y-1 relative border hover:border-0" key={event.id}>
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
 
export default Home;