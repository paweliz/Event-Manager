const EventsDetailsSkeleton = () => {
  return (
    <div className="flex flex-col bg-transparent animate-pulsex">
      <div className="flex flex-row">
        <p className="flex-auto w-96 h-48 object-cover border-2 bg-gray-200"></p>
        <div className="pl-4 pb-4 flex-col items-start bg-transparent">
          <center>
            <p className=" h-8 w-72 justify-self-center bg-transparent bg-gray-200 "></p>
          </center>
          <div className="items-center">
            <p className="text-lg font-bold pt-3 bg-transparent  w-full bg-gray-200 h-4"></p>
            <p className="bg-transparent mt-1  w-full bg-gray-200 h-4"></p>

            <p className="bg-transparent mt-1  w-full bg-gray-200 h-4"></p>
            <p className="bg-transparent mt-1 w-full bg-gray-200 h-4"></p>
            <p className="bg-transparent flex items-center">
              <p className="mt-2 w-full h-8 bg-gray-200"></p>
            </p>
            <p className="bg-transparent flex items-center">
              <p className="mt-2 w-full h-8 bg-gray-200"></p>
            </p>
          </div>
        </div>
      </div>
      <p className="mt-2 w-full h-64 bg-gray-200"></p>
    </div>
  );
};

export default EventsDetailsSkeleton;
