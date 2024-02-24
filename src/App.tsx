import React from "react";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist, PropsType, TaskType } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id); //t.id !=== id
    setTasks(filteredTasks);
    console.log(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];

    setTasks(newTasks);
  }

  function changeTaskStatus(taskId: string, isDone: boolean) {
    console.log(taskId, " ", isDone);

    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {}

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: v1(), title: "What to learn", filter: "active" },
    { id: v1(), title: "What to buy", filter: "completed" },
  ]);

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodolist = tasks;

        if (tl.filter === "completed") {
          tasksForTodolist = tasks.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodolist = tasks.filter((t) => t.isDone === false);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
          />
        );
      })}

      {/* <Todolist title="Movies" tasks={tasks2} /> */}
    </div>
  );
}

export default App;
