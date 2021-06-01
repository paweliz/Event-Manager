import { Link } from "react-router-dom"

const NotFound = () => {
  return ( 
    <div className="p-4">
      <h2 className="flex mb-6 justify-center items-center text-3xl font-bold">Sorry<svg class="mx-2 inline-block w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></h2>
      <p className="flex mb-6 justify-center text-lg font-bold">That page cannot be found</p>
      <div className="flex justify-center">
      <Link to="/" className="my-2 px-3 border-b-2 border-transparent hover:shadow-lg hover:border-black transform hover:scale-105">Back to the homepage...</Link></div>
    </div>
   );
}
 
export default NotFound;