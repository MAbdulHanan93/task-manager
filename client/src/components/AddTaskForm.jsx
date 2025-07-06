import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { addTask } from "../api/tasks";
function AddTaskForm({ fetchData }) {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    let { data } = await addTask({ description: task });
    alert(data.msg);
    fetchData();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "90%",
        maxWidth: "600px",
        margin: "20px auto",
      }}
    >
      <TextField
        label="Add new task"
        variant="outlined"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
        sx={{
          input: {
            color: "white",
            backgroundColor: "#424242", // dark grey background
          },
          "& .MuiInputLabel-root": {
            color: "white", // default label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white", // label color on focus
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // default border
            },
            "&:hover fieldset": {
              borderColor: "blue", // on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main", // on focus
            },
          },
        }}
      />
      <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
    </Box>
  );
}

export default AddTaskForm;
