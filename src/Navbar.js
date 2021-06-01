import { Link, useHistory } from "react-router-dom"
import { useAuth } from "./customHooks/AuthContext"
import { useState } from "react" 
const Navbar = () => {
  const { currentUser, logout} = useAuth()
  const [modal, setModal] = useState('disabled')
  const [error, setError] = useState("")
  const history = useHistory()

  async function handleLogout(){
    setError('')

    try {
      await logout()
      history.push("/")
    } catch {
      setError('Failed to log out')
    }
  }


  const handleClick = () => {
    if (modal === 'enabled'){
      setModal('disabled')
    }
    if (modal === 'disabled'){
      setModal('enabled')
    }
  }

  return ( 
    <nav className="navbar w-screen flex flex-wrap items-center bg-transparent grid-cols-3 grid-rows-3">
      <h1 className="bg-transparent col-start-1	row-start-1 p-5 text-xl text-black">Event manager</h1>
      <div className="links flex flex-row w-screen">
        <Link to="/" className = "navtab">Home</Link>
        <Link to="/events" className = "navtab">All events</Link>
        {currentUser !== null && <Link to="/myevents" className = "navtab">My events</Link>}
        {currentUser !== null && <Link to="/create" className = "navtab">Add event</Link>}
        {currentUser === null && <Link to="/signup" className = "navtab">Sign Up</Link>}
        {currentUser === null && <Link to="/login" className = "navtab">Login</Link>}
        {currentUser !== null && <div className="relative">
        <button className="group relative navtab focus:outline-none" onClick={handleClick}>
            <svg className="w-6 h-6 bg-transparent mx-3 stroke-current group-hover:stroke-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
        {modal ==='enabled' && <div className="absolute right-0 z-20 w-48 bg-white rounded-md shadow-xl dark:bg-gray-800">
            <div className="p-3">
            <h2>Hello, </h2>
            {error && <div>{error}</div>}
            <strong>{currentUser?.email}</strong></div>
            <Link to="/updateprofile" className="block px-4 py-2 text-sm text-black capitalize transition-colors duration-200 transform hover:bg-black hover:text-white dark:hover:text-white">
                Update Profile
            </Link>
            <div className="block px-4 py-2 text-sm text-black cursor-pointer capitalize transition-colors duration-200 transform hover:bg-black hover:text-white dark:hover:text-white" onClick={handleLogout}>
                Log Out
            </div>
        </div>}
        </div>}  
        </div>
    </nav>
   );
}
 
export default Navbar;