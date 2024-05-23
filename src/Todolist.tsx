import "./App.css";
import { FilterValuesType } from "./App";
import { useState } from "react";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export interface PropsType {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
}

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  console.log(newTaskTitle);

  return (
    <div className="todolist">
      <div>
        <h1>{props.title}</h1>
        <div>
          <input
            className="input-area"
            value={newTaskTitle}
            onChange={(e) => {
              setNewTaskTitle(e.currentTarget.value);
            }}
          />
          <button
            className="button"
            onClick={() => {
              props.addTask(newTaskTitle);
              setNewTaskTitle("");
            }}
          >
            <h2>Add</h2>
          </button>
        </div>
        <ul>
          {props.tasks.map((t) => {
            return (
              <li key={t.id}>
                <input type={"checkbox"} checked={t.isDone} />
                <span>{t.title}</span>
                <button
                  onClick={() => {
                    props.removeTask(t.id);
                  }}
                >
                  <h2>Delete</h2>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="filter-section">
          <button
            onClick={() => {
              props.changeFilter("all");
            }}
          >
            <h2> All</h2>
          </button>
          <button
            onClick={() => {
              props.changeFilter("active");
            }}
          >
            <h2>Active</h2>
          </button>
          <button
            onClick={() => {
              props.changeFilter("completed");
            }}
          >
            <h2>Completed</h2>
          </button>
        </div>
      </div>
    </div>
  );
}
