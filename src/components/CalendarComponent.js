import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

const CalendarComponent = ({ events }) => {
  const localizer = momentLocalizer(moment);
  let allViews = Object.keys(Views).map(k => Views[k]);
  const history = useHistory();

  const myEventsList = [];

  if (events?.length > 0) {
    events.map(event => {
      let sampleEvent = {
        title: event.title,
        start: moment(event.date?.seconds * 1000).toDate(),
        end: moment(event.endDate?.seconds * 1000).toDate(),
        id: event.id,
      };
      return myEventsList.push(sampleEvent);
    });
  }

  return (
    <div className="h-96 mt-4">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        views={allViews}
        style={style}
        startAccessor="start"
        endAccessor="end"
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        onSelectEvent={event => history.push(`/events/${event.id}`)}
      />
    </div>
  );
};

export default CalendarComponent;
