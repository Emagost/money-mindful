import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme: any) => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainCalendar: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },
  mainContainer: {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  padding20px: {
    padding: "20px",
  },
  calenderBg: {
    width: "100%",
    height: "100%",
    background: "#e8f1f2",
  },
  createModal: {
    width: "600px",
    height: "750px",
    padding: "20px",
    position: "relative",
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
  endButtons: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: "15px",
  },
  margin15px: {
    marginBottom: "18px",
  },
  w100: {
    width: "100%",
  },
  flexW100: {
    display: "flex",
    width: "100%",
  },
}));

export default useStyles;
