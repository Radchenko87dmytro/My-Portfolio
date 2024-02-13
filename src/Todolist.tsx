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
  // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.charCode === 13) {
  //     props.addTask(newTaskTitle);
  //     setNewTaskTitle("");
  //   }
  // };
  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };
  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNetTitleChangeHandler}
          //onKeyDown={onKeyPressHandler}
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
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
