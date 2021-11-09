import {Link} from 'react-router-dom';

const PersonForm = ({person}) => {
  return (
    <Link
      className="bg-gray-200 grid my-2 grid grid-rows-2 grid-cols-1 grid-flow-col border-2`"
      to={`/user/${person.userId}`}>
      <img
        className="rounded-full w-6 h-6"
        alt="avatar"
        src={person.avatarUrl}
      />
      {person.fullName}
    </Link>
  );
};

export default PersonForm;
