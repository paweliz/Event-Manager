import { useRef, useState } from 'react';
import { useAuth } from '../customHooks/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage();
      setError('');
      console.log(error);
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions.');
    } catch {
      setError('Failed to reset password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="m-4 flex justify-center">
      <form onSubmit={handleSubmit}>
        <h2 className="flex justify-center text-xl">Reset Password</h2>
        <div className="flex flex-col p-6">
          {error && (
            <div className="bg-red-500 text-white text-center p-2 mb-4">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-500 text-white text-center p-2 mb-4">
              Success!{message}
            </div>
          )}
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
            <input
              className="border-l-2 px-2 focus:outline-none focus:ring-transparent focus:ring-2"
              type="email"
              name="e-mail"
              ref={emailRef}
              placeholder="E-Mail"
              required
            />
          </div>
          <button className="submitButton" disabled={loading} type="submit">
            Reset Password
          </button>
          <Link
            to="/login"
            className="py-2 mt-2 px-3 text-orange hover:border-b-2 bg-transparent hover:shadow-lg self-center hover:border-orange tracking-wider transform hover:scale-105 text-md">
            Login
          </Link>
          <p className="pt-4 text-sm">
            Need an account?{' '}
            <Link
              className="py-2 px-3 text-orange hover:border-b-2 bg-transparent hover:shadow-lg   hover:border-orange tracking-wider transform hover:scale-105 text-md"
              to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
