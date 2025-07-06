import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../utils/auth";
import { getTasks } from "../api/tasks";
import { Grid, Box } from "@mui/material";
import TaskItem from "../components/TaskItem";
import AddTaskForm from "../components/AddTaskForm";

function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await getTasks();
    if (res.success) {
      setTasks(res.data);
    } else {
      setTasks([]);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      return navigate("/login");
    }

    fetchData();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>

      <AddTaskForm fetchData={fetchData} />

      {tasks.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No tasks at the moment</h3>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={3}
              maxWidth="lg"
              sx={{ margin: "20px auto" }}
            >
              {tasks
                ?.map((task) => (
                  <TaskItem key={task._id} task={task} fetchData={fetchData} />
                ))
                .reverse()}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}

export default Home;
