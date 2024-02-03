import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist, PropsType } from "./Todolist";

function App() {
  let tasks = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ];

  function removeTask(id: number) {
    //debugger;
    let resultTasks = tasks.filter((t) => {
      if (t.id !== id) return true;
      else return false;
    }); //t.id !=== id
    console.log(resultTasks);
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
