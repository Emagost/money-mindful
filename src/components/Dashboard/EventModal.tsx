import { memo, useCallback, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useStyles from "./styles";
import { User } from "firebase/auth";
import { getDBInstance } from "../../firebase";
import { IEvent } from "../../types/event";
import dayjs from "dayjs";

type TProps = {
  user: User;
  openModal: boolean;
  initialState?: IEvent;
  onToggleModal: () => void;
  onUpdateData: () => Promise<void>;
};

const EventModal = ({
  user,
  openModal,
  initialState,
  onToggleModal,
  onUpdateData,
}: TProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { classes } = useStyles();
  const db = getDBInstance();
  const [startDateEvent, setStartDataEvent] = useState(
    initialState?.start ? dayjs(initialState.start as any) : dayjs(new Date())
  );
  const [endDateEvent, setEndDateEvent] = useState(
    initialState?.end ? dayjs(initialState.end as any) : dayjs(new Date())
  );

  const handleAddSpent = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { title, price, description, clientName } = event.target as any;
      const userRef = doc(db, "users", user?.uid);
      const userEventCollection = collection(db, `users/${user?.uid}/events`);

      const docRef = await addDoc(userEventCollection, {
        userRef,
        title: title.value,
        price: price.value,
        employee: "",
        description: description.value,
        clientName: clientName.value,
        start: Timestamp.fromDate(dayjs(startDateEvent).toDate()),
        end: Timestamp.fromDate(dayjs(endDateEvent).toDate()),
        softRemoved: false,
      });

      const id = docRef.id;
      await updateDoc(docRef, {
        id,
      });
    },
    [db, endDateEvent, startDateEvent, user]
  );

  return (
    <Modal
      open={openModal}
      className={classes.center}
      onClose={onToggleModal}
      disableEscapeKeyDown={true}
    >
      <Box
        className={classes.createModal}
        component="form"
        onSubmit={async (event) => {
          setIsLoading(true);
          await handleAddSpent(event);
          await onUpdateData();
          setIsLoading(false);
          onToggleModal();
        }}
      >
        <Typography className={classes.margin15px}>
          Create a new event
        </Typography>
        <FormControl className={classes.margin15px} fullWidth>
          <InputLabel htmlFor="Title">Title</InputLabel>
          <OutlinedInput
            id="title"
            aria-describedby="title-text"
            label="Title"
            defaultValue={initialState?.title || ""}
          />
          <FormHelperText id="title-helper-text">
            Add a title to event.
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.margin15px} fullWidth>
          <InputLabel htmlFor="Price">Price</InputLabel>
          <OutlinedInput
            type="number"
            id="price"
            aria-describedby="Price-text"
            label="Price"
            defaultValue={initialState?.price || 0}
          />
          <FormHelperText id="Price-helper-text">
            Add a for the event.
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.margin15px} fullWidth>
          <InputLabel htmlFor="client-name">Client Name</InputLabel>
          <OutlinedInput
            id="clientName"
            aria-describedby="client-name-text"
            label="client-name"
            defaultValue={initialState?.clientName || ""}
          />
          <FormHelperText id="client-name-helper-text">
            Add a client name to event.
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.margin15px} fullWidth>
          <InputLabel htmlFor="description">Description</InputLabel>
          <OutlinedInput
            id="description"
            aria-describedby="description-text"
            label="description"
            defaultValue={initialState?.description || ""}
          />
          <FormHelperText id="description-helper-text">
            Add a description to event.
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.margin15px} fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDateTimePicker
              className={`${classes.margin15px} ${classes.w100}`}
              defaultValue={startDateEvent}
              label="Select the day and the time to start the event"
              onChange={(newValue: any) => {
                const formattedDate: any = dayjs(newValue).toDate();
                setStartDataEvent(formattedDate);
              }}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl className={classes.margin15px} fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDateTimePicker
              className={`${classes.margin15px} ${classes.w100}`}
              defaultValue={endDateEvent}
              label="Select the day and the time to end the event"
              onChange={(newValue: any) => {
                const formattedDate: any = dayjs(newValue).toDate();
                setEndDateEvent(formattedDate);
              }}
            />
          </LocalizationProvider>
        </FormControl>
        <Box className={classes.endButtons}>
          <Button onClick={onToggleModal}>Cancel</Button>
          <Button type="submit">
            {isLoading ? <CircularProgress /> : `Submit`}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(EventModal);
