import React from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events: Event[] = [
  {
    title: "All Day Event",
    start: new Date(),
    end: new Date(),
    allDay: true,
  },
  {
    title: "Long Event",
    start: new Date(2024, 6, 1),
    end: new Date(2024, 6, 2),
  },
  // Add more events here
];

const Schedule: React.FC = () => {
  return (
    <div className="pt-[150px] px-[20px] sm:px-[150px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Schedule;
