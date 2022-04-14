import { makeStyles } from "@material-ui/core/styles";

const useCustomStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  icon: {
    marginTop: "30%",
    marginBottom: 60,
    fontSize: 100,
    color: theme.palette.primary.main
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    width: 300,
    display: "block",
    marginBottom: 100,
    color: "white"
  }
}));

export default useCustomStyles;
