import { FilterValuesType } from "./App";
import { ChangeEvent, useState, KeyboardEvent } from "react";
function sum(a: number, b: number) {
  alert(a + b);
}

//sum(12, 14);

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

  const onNetTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNetTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
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
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={() => {
            props.changeFilter("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
