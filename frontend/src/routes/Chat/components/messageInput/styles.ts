import { makeStyles } from "@material-ui/core/styles";

export const useCustomStyles = makeStyles((theme) => ({
  inputContainer: {
    display: "flex",
    padding: "0 10px"
  },
  textInput: {
    alignSelf: "center"
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    display: "block",
    color: "white",
    marginLeft: 10,
    height: "fit-content",
    alignSelf: "center"
  }
}));

export default useCustomStyles;
