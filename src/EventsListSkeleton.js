const EventsListSkeleton = () => {
  const EventSkeleton = () => {
    return (
      <div className="group rounded overflow-hidden transform border">
        <div className="w-full h-32 bg-gray-200" />
        <div className="p-4 border-t-2 border-transparent flex flex-row items-center content-center">
          <div className="w-24 h-16 bg-gray-200 mr-4 self-center" />
          <div className="flex flex-col mr-4 bg-transparent self-center">
            <div className="grid grid-rows-2">
              <div className="w-48 md:w-56 h-4 bg-gray-200 mb-2" />
              <div className="w-48 md:w-56 h-2 bg-gray-200 mb-1" />
              <div className="w-48 md:w-56 h-2 bg-gray-200 mb-1" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="m-4 animate-pulse">
      <div className="mt-8 grid md:grid-cols-4 gap-10">
        <EventSkeleton />
        <EventSkeleton />
        <EventSkeleton />
        <EventSkeleton />
      </div>
    </div>
  );
};

export default EventsListSkeleton;
