import "./App.css";
import { FilterValuesType } from "./App";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}
interface Task {
  // isDone?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | undefined
  isDone: boolean;
}

export interface PropsType {
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  //changeTaskStatus: (id:string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState("");
  const [isDone, setIsDone] = useState<Task>({ isDone: false });
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Set status
  useEffect(() => {
    if (newTaskTitle.trim() === "") {
      setBtnDisabled(true);
      setError("Type please the text");
      //setNewTaskTitle("Type please the text");
    } else if (newTaskTitle.trim().length >= 20) {
      setBtnDisabled(true);
      setError("Text schould be schorter");
      // setNewTaskTitle("Text schould be schorter");
    } else {
      setBtnDisabled(false);
      setError("");
    }
  }, [newTaskTitle]);
  console.log(newTaskTitle);

  const taskTitleHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTaskTitle(event.currentTarget.value);
  };

  const addTaskHandler = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");

    // if (newTaskTitle.trim() !== "") {
    //   props.addTask(newTaskTitle);
    //   setNewTaskTitle("");
    // setError("");
    //}
  };

  const removeTaskHandler = (id: string) => {
    props.removeTask(id);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDone({ isDone: event.target.checked });
    console.log(isDone);
  };

  //const errorMessage = "Title is requered";

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
          <button
            className="button"
            onClick={addTaskHandler}
            disabled={btnDisabled}
          >
            Add
          </button>
        </div>
        {/* {errorMessage && !btnDisabled} */}
        <p className="error">{error}</p>
        <ul>
          {props.tasks.map((t) => {
            return (
              <li className="task-item" key={t.id}>
                <input
                  className="custom-checkbox"
                  type={"checkbox"}
                  checked={t.isDone}
                  //checked={isDone}
                  onChange={onChangeHandler}
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
