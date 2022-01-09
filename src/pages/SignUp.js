import { useRef, useState } from 'react';
import { useAuth } from '../customHooks/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { validEmail, validPassword } from '../utils/Regex.js';
/* 
Optional TODO: username 
*/

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const fullNameRef = useRef();
  const categoryRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const history = useHistory();
  const validate = () => {
    setEmailError(!validEmail.test(emailRef.current.value));
    setPasswordError(!validPassword.test(passwordRef.current.value));
  };
  //   if (validEmail.test(emailRef.current.value)) {
  //     console.log(validEmail.test(emailRef.current.value), emailRef.current.value)
  //  }
  //   if (!validEmail.test(emailRef.current.value)) {
  //     console.log(validEmail.test(emailRef.current.value), emailRef.current.value)
  //     setEmailError(true);
  //  }
  //   if (!validPassword.test(passwordRef.current.value)) {
  //     console.log(validPassword.test(passwordRef.current.value), passwordRef.current.value)
  //  }
  //  if (validPassword.test(passwordRef.current.value)) {
  //   console.log(validPassword.test(passwordRef.current.value), passwordRef.current.value)
  //   setPasswordError(true);

  async function handleSubmit(e) {
    e.preventDefault();
    // validate()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      // console.log(passwordRef.current.value,passwordConfirmRef.current.value)
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        fullNameRef.current.value,
        categoryRef.current.value,
      );
      history.push('/verifyemail');
    } catch (e) {
      console.error(e);
      setError(`Failed to create account: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }
  //{error & alert({error})}

  return (
    <div className="m-4 flex justify-center">
      <form onSubmit={handleSubmit}>
        <h2 className="flex justify-center text-xl">Sign Up</h2>
        <div className="flex flex-col p-6">
          {error && (
            <div className="bg-red-500 text-white text-center p-2 mb-4">
              {error}
            </div>
          )}
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-gray-900 focus-within:border-gray-900">
            <svg
              class="w-5 inline-block mx-2"
              data-darkreader-inline-stroke=""
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <input
              className="border-l-2 px-2 focus:outline-none focus:ring-transparent focus:ring-2"
              type="fullname"
              name="fullName"
              ref={fullNameRef}
              placeholder="Full Name"
              onBlur={validate}
              required
            />
          </div>
          <div className="group -mx-4 mb-4 flex flex-row justify-between">
            <label className="border-r-2 -pr-4">Favourite category</label>
            <select
              ref={categoryRef}
              className="cursor-pointer border-b-2 ml-5 hover:border-black focus:outline-none w-full focus:border-black">
              <option value="Arts">Arts</option>
              <option value="Business">Business</option>
              <option value="Charity">Charity</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-gray-900 focus-within:border-gray-900">
            {emailError && (
              <div className="bg-red-500 text-white text-center p-2 mb-4">
                Please, enter valid email
              </div>
            )}
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
            <input
              className="border-l-2 px-2 focus:outline-none focus:ring-transparent focus:ring-2"
              type="email"
              name="e-mail"
              ref={emailRef}
              placeholder="E-Mail"
              onBlur={validate}
              required
            />
          </div>
          {passwordError && (
            <div className="bg-red-500 text-white text-center p-2 mb-4">
              Password should have at list 8 characters, 1 letter, 1 number and
              1 special character. Please, enter valid password.
            </div>
          )}
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-gray-900 focus-within:border-gray-900">
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
            <input
              className="border-l-2 px-2 focus:outline-none focus:ring-transparent focus:ring-2"
              type="password"
              name="password"
              ref={passwordRef}
              onBlur={validate}
              placeholder="Password"
              required
            />
          </div>
          <div className="group -mx-4 mb-4 p-1 border-b-2 hover:border-gray-900 focus-within:border-gray-900">
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
            <input
              className="border-l-2 px-2 focus:outline-none focus:ring-transparent focus:ring-2"
              type="password"
              name="password-confirm"
              ref={passwordConfirmRef}
              placeholder="Password Confirmation"
              required
            />
          </div>
          <button className="submitButton" disabled={loading} type="submit">
            Sign Up
          </button>
          <p className="pt-4 self-center">
            Already have an account?{' '}
            <Link
              to="/login"
              className="py-2 px-3 text-orange hover:border-b-2 bg-transparent hover:shadow-lg   hover:border-orange tracking-wider transform hover:scale-105 text-md">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
