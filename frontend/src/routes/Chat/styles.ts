import { makeStyles } from "@material-ui/core/styles";

export const useCustomStyles = makeStyles(() => ({
  container: {
    overflow: "hidden"
  },
  body: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0",
    boxShadow: "0px 2px 4px #dadada",
    backgroundColor: "#fff"
  }
}));

export default useCustomStyles;
