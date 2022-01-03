const LandingPageComponent = () => {
  return (
    <div className="w-screen h-72 bg-transparent -ml-4 -mt-4 flex flex-col justify-center items-center mb-8">
      <h2 className="bg-transparent font-bold text-4xl text-center">
        We are here to simplify event management.
      </h2>
      <div className="w-full flex bg-transparent justify-evenly items-center mt-12">
        <div className="bg-transparent flex flex-col self-start">
          <p className="bg-transparent font-bold text-center">Find</p>
          <p className="bg-transparent w-28 text-sm text-center">
            Find your dream event with intuitive filter options or with calendar
          </p>
        </div>
        <div className="bg-transparent flex flex-col self-start">
          <p className="bg-transparent font-bold text-center">Join</p>
          <p className="bg-transparent w-28 text-sm text-center">
            When you found event, just join to it with one click
          </p>
        </div>
        <div className="bg-transparent flex flex-col self-start">
          <p className="bg-transparent font-bold text-center">Create</p>
          <p className="bg-transparent w-28 text-sm text-center">
            Haven't found suitable event? Feel free to create your own
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageComponent;
