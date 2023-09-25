import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import SpentManagement from "./SpentManagement";
import CalendarPage from "./CalendarPage";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import useStyles from "./styles";
import { getDBInstance } from "../../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../hooks/AuthProvider";
import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

const DashboardHome = () => {
  const db = getDBInstance();
  const { user } = useAuth();
  const { classes } = useStyles();

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [startDateEvent, setStartDataEvent] = useState(dayjs(new Date()));
  const [endDateEvent, setEndDateEvent] = useState(dayjs(new Date()));
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [firstFetch, setFirstFetch] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const handleOpenModal = useCallback(
    () => setOpenCreateModal(!openCreateModal),
    [openCreateModal]
  );

  const handleSelectEmployee = useCallback(
    (name: string) => setSelectedEmployee(name),
    []
  );

  const handleAddSpent = useCallback(
    async (event: any) => {
      event.preventDefault();
      if (!user) return;

      const { title, price, description, clientName } = event.target;
      const userRef = doc(db, "users", user?.uid);
      const userEventCollection = collection(db, `users/${user?.uid}/events`);

      await addDoc(userEventCollection, {
        userRef,
        title: title.value,
        price: price.value,
        employee: selectedEmployee,
        description: description.value,
        clientName: clientName.value,
        start: Timestamp.fromDate(dayjs(startDateEvent).toDate()),
        end: Timestamp.fromDate(dayjs(endDateEvent).toDate()),
        softRemoved: false,
      });
    },
    [db, endDateEvent, startDateEvent, user, selectedEmployee]
  );

  useEffect(() => {
    if (!user) return;
    if (firstFetch) return;
    setFirstFetch(true);
    const data = async () => {
      const collectionPath = collection(db, `/users/${user.uid}/events`);
      const queryRef = query(collectionPath, where("softRemoved", "==", false));

      try {
        const querySnapshot = await getDocs(queryRef);
        console.log("querySnapshot", querySnapshot);

        querySnapshot.forEach((doc) => {
          const eventData = doc.data();
          console.log("Datos del evento:", eventData);
          console.log(new Date((eventData.start as Timestamp).toDate()));
          const data = {
            title: eventData.title,
            end: new Date((eventData.end as Timestamp).toDate()),
            start: new Date((eventData.start as Timestamp).toDate()),
          };
          setEvents((prev) => [...prev, data as any]);
        });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    data();
  }, [db, firstFetch, user]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box display="flex" alignContent="center" justifyContent="left">
            <SpentManagement
              add={true}
              icon={<AddIcon />}
              onModalOpen={handleOpenModal}
            />
            <SpentManagement add={false} icon={<DeleteIcon />} />
          </Box>
          <CalendarPage events={events} />
        </Container>
        <Modal
          open={openCreateModal}
          className={classes.center}
          onClose={handleOpenModal}
          disableEscapeKeyDown={false}
        >
          <Box
            className={classes.createModal}
            component="form"
            onSubmit={handleAddSpent}
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
              />
              <FormHelperText id="title-helper-text">
                Add a title to event.
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth className={classes.margin15px}>
              <InputLabel id="employees-select-label">Employees</InputLabel>
              <Select
                required
                labelId="employees-label"
                id="employee"
                value={selectedEmployee}
                label="Employees"
                onChange={(event) => handleSelectEmployee(event.target.value)}
              >
                <MenuItem value={"Fiorella"}>Fiorella</MenuItem>
              </Select>
              <FormHelperText id="Price-helper-text">
                Select the assign employees.
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.margin15px} fullWidth>
              <InputLabel htmlFor="Price">Price</InputLabel>
              <OutlinedInput
                type="number"
                id="price"
                aria-describedby="Price-text"
                label="Price"
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
              />
              <FormHelperText id="description-helper-text">
                Add a description to event.
              </FormHelperText>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker
                className={classes.margin15px}
                sx={{ width: "100%" }}
                defaultValue={startDateEvent}
                label="Select the day and the time to start the event"
                onChange={(newValue: any) => {
                  const formattedDate: any = dayjs(newValue).toDate();
                  setStartDataEvent(formattedDate);
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker
                sx={{ width: "100%" }}
                className={classes.margin15px}
                defaultValue={startDateEvent}
                label="Select the day and the time to end the event"
                onChange={(newValue: any) => {
                  const formattedDate: any = dayjs(newValue).toDate();
                  setEndDateEvent(formattedDate);
                }}
              />
            </LocalizationProvider>
            <Box className={classes.endButtons}>
              <Button onClick={handleOpenModal}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default DashboardHome;
