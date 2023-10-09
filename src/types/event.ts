import { DocumentReference, Timestamp } from "firebase/firestore";
import IUser from "./user";
import { stringOrDate } from "react-big-calendar";

export interface IEvent {
  userRef: DocumentReference<IUser>;
  title: string;
  price: number;
  employee: string;
  description: string;
  clientName: string;
  softRemoved: boolean;
  id: string;
  start: Timestamp;
  end: Timestamp;
}

export interface IEventBigCalendar {
  event: {
    userRef: DocumentReference<IUser>;
    title: string;
    price: number;
    employee: string;
    description: string;
    clientName: string;
    softRemoved: boolean;
    id: string;
  };
  start: stringOrDate;
  end: stringOrDate;
}
