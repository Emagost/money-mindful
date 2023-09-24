import React, { useState, useContext } from "react";
import { Container, Paper, Typography, Theme, useTheme } from "@mui/material";
import Calendar from "react-calendar";
import useStyles from "./styles";

const CalendarPage = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: any) => {
    // Aquí puedes realizar acciones adicionales cuando se selecciona una fecha en el calendario
    setSelectedDate(date instanceof Date ? date : null);
  };

  const calendarStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    background: theme.palette.mode === "dark" ? "#000" : "#fff", // Cambia el fondo según el tema
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        calendarType="gregory"
        tileClassName={classes.tileClass}
      />
    </Container>
  );
};

export default CalendarPage;
