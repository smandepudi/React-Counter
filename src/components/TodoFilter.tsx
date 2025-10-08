import { Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/todosSlice";

export default function TodoFilter() {

  const filterOptions = useSelector((state: RootState) => state.todos.filter);
  const dispatch = useDispatch();
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={filterOptions}
        onChange={(_, newValue) => dispatch(setFilter(newValue))}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="All" value="all" />
        <Tab label="Active" value="active" />
        <Tab label="Completed" value="completed" />
      </Tabs>
    </Box>
  );
}
