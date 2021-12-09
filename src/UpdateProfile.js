import { useRef, useState, useEffect } from 'react';
import { useAuth } from './customHooks/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import {
  getUserByUserId,
  updateAvatarUrl,
  deleteImageFromStorage,
} from './firebase/firebase';
import { projectStorage } from './firebase/firebaseConfig';
import useStorage from './customHooks/useStorage';
import Modal from './Modal';
import { confirmAlert } from 'react-confirm-alert';
import { resizeFile } from './utils';

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const imgTypes = ['image/png', 'image/jpeg'];
  const imageUrlRef =
    user?.avatarUrl && projectStorage.refFromURL(user.avatarUrl);

  const { url } = useStorage(file, `avatars/${currentUser?.uid}`);

  useEffect(() => {
    const getUser = async () => {
      const [user] = await getUserByUserId(currentUser?.uid);
      user && setUser(user);
    };

    currentUser && getUser();
  }, [currentUser, imageUrlRef]);

  const handleImageChange = e => {
    let selected = e.target.files[0];
    if (selected && imgTypes.includes(selected.type)) {
      resizeFile(selected, 500, 500).then(file => {
        setFile(file);
      });
      setImgError('');
    } else {
      setFile(null);
      setImgError(
        'Selected invalid format of file. Please select png or jpeg.',
      );
    }
  };

  const handleDeleteAvatar = async () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            deleteImageFromStorage(imageUrlRef).then(() => {
              updateAvatarUrl(user?.docId, '');
            }),
        },
        {
          label: 'No',
          onClick: () => history.push(-1),
        },
      ],
    });
  };

  useEffect(() => {
    const updateAvatar = async () => {
      await updateAvatarUrl(user?.docId, url);
    };
    url && updateAvatar();
  }, [url]);

  return (
    <div className="m-4 flex justify-center mt-12">
      <div>
        {/* <h2 className="flex justify-center text-xl">Update Profile</h2> */}
        <div className="flex flex-col p-6">
          {error && (
            <div className="bg-red-500 text-white text-center p-2 mb-4">
              {error}
            </div>
          )}
          {/* <div className="rounded-lg w-5 h-5 bg-black cursor-pointer"> */}
          {/* <input className="rounded-full w-14 h-14 bg-black cursor-pointer" type="file" onChange = {handleImageChange}/> */}
          {/* </div> */}
          <div className="flex flex-row items-center justify-between mb-3">
            {user?.avatarUrl ? (
              <img
                className="rounded-full w-20 h-20"
                alt="avatar"
                src={user.avatarUrl}
              />
            ) : (
              <div className="rounded-full w-20 h-20 bg-black" />
            )}
            <div className="flex  ml-5 mb-3 flex-col">
              <h3 className="text-lg ">
                Hello{' '}
                <strong>
                  {user?.fullName ? user?.fullName : currentUser?.email}
                </strong>
              </h3>
              <button onClick={() => setOpenModal(true)}>Change avatar</button>
              {user?.avatarUrl && (
                <button className="text-red-600" onClick={handleDeleteAvatar}>
                  Remove avatar
                </button>
              )}
              <Modal showModal={openModal} setShowModal={setOpenModal}>
                <input
                  className="cursor-pointer appearance-none"
                  type="file"
                  onChange={handleImageChange}
                />
              </Modal>
              {/* <ReactModal
                className='flex flex-col items-center justify-between w-96 h-96 bg-white border-2 object-center self-center justify-self-center place-self-center'
                isOpen={openModal}>
                <div>
                  <button onClick={()=>setOpenModal(false)}>Close modal</button>
                  <input
                    className="cursor-pointer appearance-none"
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
              </ReactModal> */}
            </div>
          </div>
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-black focus-within:border-black">
            <svg
              className="w-5 inline-block mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <Link
              className="focus:outline-none focus:ring-transparent focus:ring-2"
              to={`/updatefullname/${user?.docId}`}>
              Update fullname
            </Link>
          </div>
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-black focus-within:border-black">
            <svg
              className="w-5 inline-block mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
            </svg>
            <Link
              className="focus:outline-none focus:ring-transparent focus:ring-2"
              to="/updateemail">
              Update email
            </Link>
          </div>
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-black focus-within:border-black">
            <svg
              class="w-5 inline-block mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>
            <Link
              className="focus:outline-none focus:ring-transparent focus:ring-2"
              to="/changepassword">
              Change password
            </Link>
          </div>
          <div className="flex flex-row justify-center items-center ">
            <Link className="submitButton" to="/">
              Submit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
