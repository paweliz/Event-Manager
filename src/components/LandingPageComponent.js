import {
  MdOutlineSearch,
  MdOutlineEventAvailable,
  MdOutlineCreate,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

const LandingPageComponent = () => {
  return (
    <div className="w-screen h-72 bg-transparent -ml-4 flex-1 flex-col justify-center items-center md:mb-8">
      <h2 className="bg-transparent font-bold text-4xl text-center">
        We are here to simplify <span className="text-orange">event</span>{' '}
        management.
      </h2>
      <div className="w-full flex flex-col md:flex-row bg-transparent justify-center md:justify-evenly items-center  mt-6 md:mt-20">
        <div className="bg-transparent flex flex-col self-center md:self-start mb-6 ">
          <div className="self-center mb-4">
            <MdOutlineSearch size={42} />
          </div>
          <p className="bg-transparent font-bold text-center">Find</p>
          <p className="bg-transparent w-28 text-sm text-center">
            Find your dream event with intuitive filter options or with calendar
          </p>
        </div>
        <div className="bg-transparent flex flex-col self-center md:self-start mb-6 ">
          <div className="self-center mb-4">
            <MdOutlineEventAvailable size={42} />
          </div>
          <p className="bg-transparent font-bold text-center">Join</p>
          <p className="bg-transparent w-28 text-sm text-center">
            When you found event, just join to it with one click
          </p>
        </div>
        <div className="bg-transparent flex flex-col self-center md:self-start mb-6 ">
          <div className="self-center mb-4">
            <MdOutlineCreate size={42} />
          </div>
          <p className="bg-transparent font-bold text-center">Create</p>
          <p className="bg-transparent w-28 text-sm text-center">
            Haven't found suitable event? Feel free to create your own
          </p>
        </div>
      </div>
      <div className="self-center content-center justify-center">
        <center>
          <Link to="/signup" className="getStartedButton">
            Get started!
          </Link>
        </center>
      </div>
    </div>
  );
};

export default LandingPageComponent;
