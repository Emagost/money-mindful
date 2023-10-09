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
import { useCallback, useState } from "react";
import {
  DocumentReference,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../hooks/AuthProvider";
import { getDBInstance } from "../../firebase";
import dayjs from "dayjs";
import { IEvent, IEventBigCalendar } from "../../types/event";
import EventModal from "./EventModal";

const CalendarPage = ({
  events,
  onUpdateData,
}: {
  events: IEvent[];
  onUpdateData: () => Promise<void>;
}) => {
  const [initialState, setInitialState] = useState<IEvent>({} as IEvent);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [dynamicEvents, setDynamicEvents] = useState<IEvent[]>(events);
  const { user } = useAuth();
  const db = getDBInstance();

  const handleUpdateEvents = useCallback(
    async (data: IEventBigCalendar) => {
      if (!user) return;
      const { start, end, event } = data;
      const { id } = event;
      const userEvent = doc(
        db,
        `users/${user?.uid}/events/${id}`
      ) as DocumentReference<IEvent>;

      console.log("userEvent", userEvent);
      await updateDoc(userEvent, {
        //@ts-ignore
        start: Timestamp.fromDate(dayjs(start).toDate()),
        end: Timestamp.fromDate(dayjs(end).toDate()),
      });
    },
    [db, user]
  );

  const onEventResize: withDragAndDropProps["onEventResize"] = useCallback(
    async (data: any) => {
      setDynamicEvents((prev) =>
        prev.map((event) => {
          if (event.id === data.event.id) {
            return {
              ...event,
              start: data.start,
              end: data.end,
            };
          }
          return event;
        })
      );
      await handleUpdateEvents(data);
    },
    [handleUpdateEvents]
  );

  const onEventDrop: withDragAndDropProps["onEventDrop"] = useCallback(
    async (data: any) => {
      setDynamicEvents((prev) =>
        prev.map((event) => {
          if (event.id === data.event.id) {
            return {
              ...event,
              start: data.start,
              end: data.end,
            };
          }
          return event;
        })
      );
      await handleUpdateEvents(data);
    },
    [handleUpdateEvents]
  );

  return (
    <>
      <DnDCalendar
        defaultView="week"
        events={dynamicEvents}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onDoubleClickEvent={(eventClickable) => {
          setInitialState(eventClickable as IEvent);
          setOpenCreateModal(true);
        }}
        resizable
        style={{
          backgroundColor: "#fff",
          color: "black",
        }}
      />
      {user && openCreateModal && (
        <EventModal
          user={user}
          onToggleModal={() => setOpenCreateModal(!openCreateModal)}
          openModal={openCreateModal}
          initialState={initialState}
          onUpdateData={onUpdateData}
        />
      )}
    </>
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
