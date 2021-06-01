import {databaseStorage} from './firebase/firebaseConfig'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const EventsList = () => {
  const [events, setEvents] = useState([])
  const [sortBy, setSortBy] = useState('oldest')

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

  const handleChange = (e) =>{
    setSortBy(e.target.value)
    sortedEvents()
  }

  const sortedEvents = () =>{
    if(sortBy === 'az'){
      events.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? -1 : (a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : 0))
      return events
    }
    if(sortBy === 'za'){
      events.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase() ? -1 : (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : 0))
      return events
    }
    if(sortBy === 'newest'){
      events.sort((a, b) => (new Date(a.additionDate) - new Date(b.additionDate)))
      return events
    }
    if(sortBy === 'oldest'){
      events.sort((a, b) => (new Date(b.additionDate) - new Date(a.additionDate)))
      return events
    }
  }

  return ( 
  <div className="m-4">
    <div className="flex flex-row justify-between">
    <p className="text-xl text-bold">List of Events</p>
    <select className="cursor-pointer border-b-2 border-transparent hover:border-black" value={sortBy}
          onChange={handleChange}>
          <option value='az'>A-Z Title</option>
          <option value='za'>Z-A Title</option>
          <option value='newest'>Newest First</option>
          <option value='oldest'>Oldest First</option>
    </select>
    </div>
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
 
export default EventsList;