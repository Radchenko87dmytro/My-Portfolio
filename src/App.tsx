import React from "react";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist, PropsType } from "./Todolist";

function App() {
  let initTasks = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ];

  const [tasks, setTasks] = useState(initTasks);

  function removeTask(id: number) {
    //debugger;
    let filteredTasks = tasks.filter((t) => t.id !== id); //t.id !=== id
    setTasks(filteredTasks);
    console.log(filteredTasks);
  }

  // let tasks2: Array<TaskType> = [
  //   { id: 1, title: "Terminator", isDone: true },
  //   { id: 2, title: "Barbi", isDone: false },
  //   { id: 2, title: "Barbi", isDone: false },
  // ];

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />
      {/* <Todolist title="Movies" tasks={tasks2} /> */}
    </div>
  );
}

export default App;
