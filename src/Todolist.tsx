//import "./AppHeader.css";
import "./AppTasks.css";
import { FilterValuesType } from "./App";
import { ChangeEvent, useEffect, useState } from "react";

export interface TaskType {
  id: number;
  title: string;
  isDone: boolean;
}

export interface PropsType {
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeStatus: (id: number, isDone: boolean) => void;
  filter: FilterValuesType;
}

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Set status
  useEffect(() => {
    if (newTaskTitle.trim() === "") {
      setError("Please type some text");
      setBtnDisabled(true);
    } else if (newTaskTitle.trim().length >= 20) {
      setBtnDisabled(true);
      setError("Text cannot be longer then 20 letters.");
    } else {
      setBtnDisabled(false);
      setError("");
    }
  }, [newTaskTitle]);

  const taskTitleHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTaskTitle(event.currentTarget.value);
  };

  const addTaskHandler = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const removeTaskHandler = (id: number) => {
    props.removeTask(id);
  };

  return (
    <div className="todolist-container">
      <div className="todolist-log">
        <img src="../public/favicon.ico" alt="" />
        <div>
          <button style={{ height: "40px", fontSize: "20px" }}>Log In</button>
          <button style={{ height: "40px", fontSize: "20px" }}>Log Out</button>
        </div>
      </div>
      <div>
        <div className="input-container">
          <input
            className="input-area"
            type="text"
            id="input-area"
            value={newTaskTitle}
            onChange={taskTitleHandler}
            placeholder="Add a new task..."
            maxLength={20}
          />

          <button
            className={btnDisabled ? "add-button-disabled" : "add-button"}
            onClick={(e) => {
              e.stopPropagation();
              addTaskHandler();
            }}
            disabled={btnDisabled}
          >
            Add
          </button>
        </div>

        <p className={error ? "error" : "errorHidden"}>
          {error ? error : "hidden"}
        </p>

        <div className="filter-section">
          <button
            className={props.filter === "all" ? "active-filter" : ""}
            onClick={() => {
              props.changeFilter("all");
            }}
          >
            <h2> All</h2>
          </button>
          <button
            className={props.filter === "active" ? "active-filter" : ""}
            onClick={() => {
              props.changeFilter("active");
            }}
          >
            <h2>Active</h2>
          </button>
          <button
            className={props.filter === "completed" ? "active-filter" : ""}
            onClick={() => {
              props.changeFilter("completed");
            }}
          >
            <h2>Completed</h2>
          </button>
        </div>
        <ul className="task-section">
          {props.tasks.length === 0 && (
            <div className="task-message">
              <p>You don't have any items on this list</p>
            </div>
          )}
          {props.tasks.map((t) => {
            const onChangeHandler = (
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              props.changeStatus(t.id, event.currentTarget.checked);
            };
            return (
              <div className="task-item" key={t.id}>
                <div className="task-container">
                  <input
                    className="custom-checkbox"
                    type={"checkbox"}
                    checked={t.isDone}
                    onChange={onChangeHandler}
                  />
                  <span className={t.isDone ? "task-item-completed" : ""}>
                    {t.title}
                  </span>
                </div>

                <div
                  onClick={() => {
                    removeTaskHandler(t.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="50px"
                    height="50px"
                    viewBox="0 0 48 48"
                  >
                    <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 16.140625 6 C 14.303372 6 12.582924 6.9194511 11.564453 8.4492188 L 9.1972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 9.7636719 15 A 1.50015 1.50015 0 0 0 10.208984 15 L 36.330078 15 L 34.757812 29.679688 A 1.50015 1.50015 0 1 0 37.740234 29.998047 L 39.347656 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 38.802734 12 L 36.435547 8.4492188 C 35.416254 6.9202798 33.696001 6 31.859375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 16.140625 9 L 31.859375 9 C 32.696749 9 33.474746 9.4162203 33.939453 10.113281 L 35.197266 12 L 12.802734 12 L 14.060547 10.113281 A 1.50015 1.50015 0 0 0 14.0625 10.111328 C 14.525982 9.4151428 15.301878 9 16.140625 9 z M 10.572266 17.650391 A 1.50015 1.50015 0 0 0 9.1171875 19.330078 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 37.246094 34.605469 A 1.50015 1.50015 0 1 0 34.263672 34.287109 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 12.099609 19.011719 A 1.50015 1.50015 0 0 0 10.572266 17.650391 z"></path>
                  </svg>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
