import "./Todolist.css";
import { FilterValuesType } from "../../App";
import { ChangeEvent, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { EditableSpan } from "../EditableSpan";

const activeFilterClass =
  "text-xs w-20  mr-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer md:text-sm md:w-24 md:h-9";
const notActiveFilterClass =
  "text-xs w-20  mr-4 bg-gray-500 text-white rounded-lg  md:text-sm md:w-24 md:h-9";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export interface PropsType {
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeStatus: (id: string, isDone: boolean) => void;
  changeTaskTitle: (id: string, newValue: string) => void;
  filter: FilterValuesType;
  setUserId: (id: string | null) => void;
  setAuthUser?: (user: User | null) => void; // Make setAuthUser optional
  authUser: User | null;
}

const Todolist: React.FC<PropsType> = ({
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
  changeTaskTitle,
  filter,
  authUser, // Destructure authUser here
}) => {
  const [newTask, setNewTask] = useState<string>("");
  const [error, setError] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    if (newTask.trim() === "") {
      setBtnDisabled(true);
    } else if (newTask.trim().length >= 20) {
      setBtnDisabled(true);
      setError("Text cannot be longer then 20 letters.");
    } else {
      setBtnDisabled(false);
      setError("");
    }
  }, [newTask]);

  const taskTitleHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(event.currentTarget.value);
  };

  const addTaskHandler = async () => {
    addTask(newTask);
    setNewTask("");
  };

  const removeTaskHandler = (id: string) => {
    removeTask(id);
  };

  return (
    <div className="flex-1 p-4 justify-center items-center bg-gray-500">
      {authUser ? (
        <div className="bg-white w-96 sm:w-3/5 lg:w-1/2 flex flex-col place-self-center p-5 m-5 rounded-xl">
          <div className="flex justify-between items-center ">
            {/*item-container */}
            <input
              className="input-area text-sm  md:text-3xl md:h-14  text-center bg-transparent border-black border-2  rounded-lg w-full mr-4 py-2
               border-spacing-1"
              type="text"
              id="input-area"
              value={newTask}
              onChange={taskTitleHandler}
              onClick={() => setError("Please type some text")}
              placeholder="Add a new task..."
              maxLength={20}
            />

            <button
              id="add-button"
              className={
                btnDisabled
                  ? "add-button-disabled flex justify-center items-center text-sm w-20  px-4 py-2 bg-gray-500 text-white rounded-lg  md:text-xl md:w-3/12 md:h-14"
                  : "add-button flex justify-center items-center text-sm w-20  px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer md:text-xl md:w-3/12 md:h-14"
              }
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

          <div className="filter-section flex justify-start mt-2 w-full">
            <button
              className={
                filter === "all" ? activeFilterClass : notActiveFilterClass
              }
              onClick={() => {
                changeFilter("all");
              }}
            >
              <h2> All</h2>
            </button>
            <button
              className={
                filter === "active" ? activeFilterClass : notActiveFilterClass
              }
              onClick={() => {
                changeFilter("active");
              }}
            >
              <h2>Active</h2>
            </button>
            <button
              className={
                filter === "completed"
                  ? activeFilterClass
                  : notActiveFilterClass
              }
              onClick={() => {
                changeFilter("completed");
              }}
            >
              <h2>Completed</h2>
            </button>
          </div>
          <ul className="block justify-center items-center w-full max-h-[46vh] overflow-auto pt-3">
            {tasks.length === 0 && (
              <div className="task-message flex justify-center text-xl">
                <p>You don't have any items on this list</p>
              </div>
            )}
            {tasks.map((t) => {
              const onChangeStatusHandler = (
                event: React.ChangeEvent<HTMLInputElement>
              ) => {
                changeStatus(t.id, event.currentTarget.checked);
              };
              const onChangeTitleHandler = (newValue: string) => {
                changeTaskTitle(t.id, newValue);
              };
              return (
                <div
                  className="task-item flex justify-between items-center text-2xl bg-white font-normal not-italic p-4 mb-3  border-2 border-[rgb(156,142,142)] rounded-[8px]"
                  key={t.id}
                >
                  <div className="flex items-center">
                    <input
                      className="custom-checkbox"
                      type={"checkbox"}
                      checked={t.isDone}
                      onChange={onChangeStatusHandler}
                    />
                  </div>
                  <EditableSpan
                    title={t.title}
                    isDone={t.isDone}
                    onChange={onChangeTitleHandler}
                  />
                  <div className="flex justify-center items-center">
                    <div
                      className="pl-2"
                      onClick={() => {
                        removeTaskHandler(t.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="35px"
                        height="35px"
                        viewBox="0 0 48 48"
                      >
                        <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 16.140625 6 C 14.303372 6 12.582924 6.9194511 11.564453 8.4492188 L 9.1972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 9.7636719 15 A 1.50015 1.50015 0 0 0 10.208984 15 L 36.330078 15 L 34.757812 29.679688 A 1.50015 1.50015 0 1 0 37.740234 29.998047 L 39.347656 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 38.802734 12 L 36.435547 8.4492188 C 35.416254 6.9202798 33.696001 6 31.859375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 16.140625 9 L 31.859375 9 C 32.696749 9 33.474746 9.4162203 33.939453 10.113281 L 35.197266 12 L 12.802734 12 L 14.060547 10.113281 A 1.50015 1.50015 0 0 0 14.0625 10.111328 C 14.525982 9.4151428 15.301878 9 16.140625 9 z M 10.572266 17.650391 A 1.50015 1.50015 0 0 0 9.1171875 19.330078 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 37.246094 34.605469 A 1.50015 1.50015 0 1 0 34.263672 34.287109 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 12.099609 19.011719 A 1.50015 1.50015 0 0 0 10.572266 17.650391 z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="flex flex-col justify-center items-center font-serif italic font-bold bg-slate-400 w-full h-full  text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-3xl">
          Signed Out. No user logged in
        </p>
      )}
    </div>
  );
};

export default Todolist;
