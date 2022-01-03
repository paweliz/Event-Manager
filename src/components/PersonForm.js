import { Link } from 'react-router-dom';

const PersonForm = ({ person, showName, list }) => {
  return (
    <Link
      //className="bg-gray-200 grid my-2 grid grid-rows-2 grid-cols-1 grid-flow-col border-2`"
      className={
        list
          ? 'flex my-2 flex-col justify-start items-center border-b-2'
          : 'ml-2 flex flex-row'
      }
      to={`/user/${person?.userId}`}>
      <img
        className="rounded-full w-8 h-8"
        alt="avatar"
        src={person?.avatarUrl}
      />
      {showName && person?.fullName}
    </Link>
  );
};

export default PersonForm;
