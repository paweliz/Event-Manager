import { useEffect, useState } from "react"
import {processSortedCollection} from './firebase/firebase'
import EventsListComponent from './EventsListComponent';

const Home = () => {
  const [events, setEvents] = useState([])
  const today = new Date();
  useEffect(()=>{
    processSortedCollection('events', setEvents, 'date', 'asc', 'date', today, '>=', 3)
  },[])

  return ( 
    <div className="m-4">
     {events.length > 0 && <EventsListComponent events={events} sortable={false} title={'Upcoming events'}/>}
    </div>
   );
}
 
export default Home;