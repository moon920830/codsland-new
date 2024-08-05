import React, { useState, useEffect } from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { GetAppointsAndEvents } from "../../api/api";
import { useSnackbar } from "notistack";

import "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface EventType {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

const Schedule: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [events, setEvents] = useState<EventType[]>([]);
  useEffect(() => {
    const firstDay = new Date(2023, 0, 1);
    const lastDay = new Date(2024, 11, 31);
    const range = { start: firstDay, end: lastDay };
    const GetData = async () => {
      const result = await GetAppointsAndEvents(range, enqueueSnackbar);
      const mappedEvents: EventType[] = result.map((event: any) => ({
        title: event.title,
        start: new Date(event.start_date), // Convert ISO string to Date object
        end: new Date(event.end_date), // Convert ISO string to Date object
        allDay: event.start_time === 0 && event.end_time === 24, // Example logic for allDay
      }));
      setEvents(mappedEvents);
    };
    GetData();
  }, []);
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
