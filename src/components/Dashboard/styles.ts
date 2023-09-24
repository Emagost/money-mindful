import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: any) => ({
  center: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  mainCalendar: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },
  calenderBg: {
    width: "100%",
    height: "100%",
    background: theme.palette.mode === "dark" ? "#000" : "#fff",
  },
  tileClass: {
    width: "50px",
    height: "40px",
    display: "flex",
    justifyContent: "space-around",
    margin: "6px",
    alignItems: "center",
    cursor: "pointer",
    border: "1px solid #ccc",
  },
}));

export default useStyles;
