import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist } from "./Todolist";

function App() {
  return (
    <div className="App">
      <Todolist title="What to learn" />
      <Todolist title="Movies" />
      <Todolist title="Songs" />
      <Todolist />
    </div>
  );
}

export default App;
