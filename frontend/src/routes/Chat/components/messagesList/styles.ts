import { makeStyles } from "@material-ui/core/styles";

export const useCustomStyles = makeStyles(() => ({
  listContainer: {
    height: 500,
    padding: 10,
    overflowY: "auto"
  },
  item: {
    whiteSpace: "pre-wrap"
  }
}));

export default useCustomStyles;
