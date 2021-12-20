import React from 'react';

const Modal = ({
  showModal,
  setShowModal,
  title,
  children,
  closeButton,
  submit,
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-white bg-opacity-95">
            <div className="relative w-auto mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t">
                  {title && (
                    <h3 className="text-3xl font-semibold"> {title} </h3>
                  )}
                  <button
                    className="p-1 ml-auto bg-transparent text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>
                    <span className="bg-transparent text-blackh-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="text-blueGray-500 text-lg leading-relaxed">
                    {children}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  {closeButton && (
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}>
                      Close
                    </button>
                  )}
                  {/*className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 bg-black" */}
                  <button
                    className="submitButton"
                    type="button"
                    onClick={() => {
                      if (submit) {
                        submit();
                      }
                      setShowModal(false);
                    }}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
