import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CalendarPage from "./CalendarPage";
import { useCallback, useEffect, useState } from "react";
import useStyles from "./styles";
import { getDBInstance } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../../hooks/AuthProvider";

import AddSpentButton from "./AddSpentButton";
import CreateEventModal from "./EventModal";
import { IEvent } from "../../types/event";
import { CircularProgress } from "@mui/material";

const DashboardHome = () => {
  const db = getDBInstance();
  const { user } = useAuth();
  const { classes } = useStyles();

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggleModal = useCallback(
    () => setOpenCreateModal(!openCreateModal),
    [openCreateModal]
  );

  const handleUpdateEvents = useCallback(async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }

    const collectionPath = collection(db, `/users/${user.uid}/events`);
    const queryRef = query(collectionPath, where("softRemoved", "==", false));

    try {
      const querySnapshot = await getDocs(queryRef);
      const allEvents = querySnapshot.docs.map((doc) => {
        const eventData = doc.data();
        return {
          ...eventData,
          start: eventData.start.toDate(),
          end: eventData.end.toDate(),
        } as IEvent;
      });
      setEvents(allEvents);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error", error);
      setIsLoading(false);
    }
  }, [db, user]);

  useEffect(() => {
    const data = async () => {
      await handleUpdateEvents();
    };

    data();
  }, [handleUpdateEvents]);

  return (
    <Box className={classes.flexW100}>
      <CssBaseline />
      <Box component="main" className={classes.mainContainer}>
        <Toolbar />
        <Box className={classes.padding20px}>
          <Box display="flex" alignContent="center" justifyContent="left">
            <AddSpentButton onModalOpen={handleToggleModal} />
          </Box>
          {!isLoading ? (
            <CalendarPage events={events} onUpdateData={handleUpdateEvents} />
          ) : (
            <Box className={`${classes.center} ${classes.margin15px}`}>
              <CircularProgress />
            </Box>
          )}
        </Box>
        {user && openCreateModal && (
          <CreateEventModal
            user={user}
            openModal={openCreateModal}
            onToggleModal={handleToggleModal}
            onUpdateData={handleUpdateEvents}
          />
        )}
      </Box>
    </Box>
  );
};

export default DashboardHome;
