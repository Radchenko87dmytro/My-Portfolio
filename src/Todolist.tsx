import "./App.css";
import { FilterValuesType } from "./App";
import { ChangeEvent, useState } from "react";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export interface PropsType {
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
}

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  console.log(newTaskTitle);

  const taskTitleHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTaskTitle(event.currentTarget.value);
  };

  const addTaskHandler = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const removeTaskHandler = (id: string) => {
    props.removeTask(id);
  };

  return (
    <div className="todolist">
      <div>
        <h1>What to learn</h1>
        <div className="input-container">
          <input
            className="input-area"
            value={newTaskTitle}
            onChange={taskTitleHandler}
          />
          <button className="button" onClick={addTaskHandler}>
            Add
          </button>
        </div>
        <ul>
          {props.tasks.map((t) => {
            return (
              <li className="task-item" key={t.id}>
                <input
                  className="custom-checkbox"
                  type={"checkbox"}
                  checked={t.isDone}
                />
                <span>{t.title}</span>
                <button
                  className="button del"
                  onClick={() => {
                    removeTaskHandler(t.id);
                  }}
                >
                  Delete
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
