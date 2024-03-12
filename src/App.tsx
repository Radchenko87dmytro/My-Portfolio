import React from "react";
import { useState } from "react";

import "./App.css";
import { Todolist, PropsType, TaskType } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { title } from "process";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  function removeTask(id: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let filteredTasks = todolistTasks.filter((t) => t.id != id);
    tasks[todolistId] = filteredTasks;
    setTasks({ ...tasks });
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistId];
    let newTasks = [task, ...todolistTasks];
    tasks[todolistId] = newTasks;
    setTasks({ ...tasks });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks });
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: false },
    ],
  });

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolist([...filteredTodolist]);
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  function changeTodolistTitle(id: string, newTitle: string) {
    console.log(id, newTitle);
    const todolist = todolists.find((tl) => tl.id == id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolist([...todolists]);
    }
  }

  function addTodoList(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title,
    };
    setTodolist([todolist, ...todolists]);
    setTasks({
      ...tasks,
      [todolist.id]: [],
    });
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuItem />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={10}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasks[tl.id];

            if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.isDone === true
              );
            }
            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.isDone === false
              );
            }

            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
