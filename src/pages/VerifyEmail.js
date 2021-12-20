import React from 'react';
import { useAuth } from '../customHooks/AuthContext';

const VerifyEmail = () => {
  const { sendVerificationEmail } = useAuth();

  const onClickHandler = async () => {
    try {
      await sendVerificationEmail();
    } catch (e) {
      console.error(e);
      //setError(`Failed to create account: ${e.message}`)
    } finally {
      console.log('Done!');
    }
  };

  return (
    <div className="m-4 flex justify-center content-center items-center self-center">
      <div className="flex flex-col p-6">
        <h2 className="pt-8 font-bold self-center">
          Activation email has been sent
        </h2>
        <p className="pt-4 self-center">
          Check your email box to finnish registration.{' '}
        </p>

        <p className="pt-4 self-center">
          Did not receive email?
          <button
            onClick={onClickHandler}
            className="py-1 px-3 border-2 bg-gray-200 shadow hover:shadow-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 tracking-wider transform hover:scale-105 text-sm rounded">
            Click here to resend message.
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
