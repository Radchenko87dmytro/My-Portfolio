import React, { useReducer } from "react";
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
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./state/todolists-reducer";
import {  changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

  function removeTask(id: string, todolistId: string) {
    dispatchToTasksReducer(removeTaskAC(id, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(removeTaskAC(title, todolistId))
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) { 
    dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId))
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(id,newTitle, todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC( value, todolistId)
    dispatchToTodolistsReducer(action)
  }

  let removeTodolist = (todolistId: string) => {
    const action: any = removeTodolistAC(todolistId)
     dispatchToTasksReducer(action)
     dispatchToTodolistsReducer(action)
  };

  function changeTodolistTitle(id: string, newTitle: string) {
    const action = changeTodolistTitleAC(id, title)
dispatchToTodolistsReducer(action)
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title)
    dispatchToTasksReducer(action)
    dispatchToTodolistsReducer(action)
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

export default AppWithReducers;
