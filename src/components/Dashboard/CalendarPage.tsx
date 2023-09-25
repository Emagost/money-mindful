import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {} from "firebase/firestore";

const CalendarPage = ({ events }: { events: any }) => {
  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    // const { start, end } = data;
    // setEvents(() => {
    //   const firstEvent = {
    //     start: new Date(start),
    //     end: new Date(end),
    //   };
    //   return [firstEvent];
    // });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    // const { start, end } = data;
    // setEvents(() => {
    //   const firstEvent = {
    //     start: new Date(start),
    //     end: new Date(end),
    //   };
    //   return [firstEvent];
    // });
  };

  return (
    <DnDCalendar
      defaultView="week"
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: "100vh" }}
    />
  );
};

// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

export default CalendarPage;
