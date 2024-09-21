import { useEffect, useState } from "react";
import "./AppHeader.css";
import { Todolist, TaskType } from "./Todolist";
import { onAuthStateChanged } from "firebase/auth";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { User } from "firebase/auth";
import user from "./components/AuthDetails";
import AuthDetails from "./components/AuthDetails";

interface ToDoListProps {
  user: User;
}

export type FilterValuesType = "all" | "completed" | "active";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>(
    localStorage.getItem("todoListTasks")
      ? JSON.parse(localStorage.getItem("todoListTasks") || "[]")
      : [
          // { id: 1, title: "CSS", isDone: true },
          // { id: 2, title: "JS", isDone: true },
          // { id: 3, title: "React", isDone: false },
          // { id: 4, title: "Redux2", isDone: false },
        ]
  );

  const fetchTasks = async (userId: any) => {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userTasks: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(userTasks);
  };
  //fetchTasks()

  console.log(tasks);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: number) {
    let newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    localStorage.setItem("todoListTasks", JSON.stringify(newTasks));
  }

  function addTask(title: string) {
    let newTask = { id: Date.now(), title: title, isDone: false };
    console.log(Date.now());
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
    localStorage.setItem("todoListTasks", JSON.stringify(newTasks));
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => !t.isDone);
  }

  const changeStatus = (id: number, isDone: boolean) => {
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
    localStorage.setItem("todoListTasks", JSON.stringify([...tasks]));
  };

  return (
    <div className="App">
      <Todolist
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
      <div className="links">
        <p>icons8.com</p>
      </div>
    </div>
  );
};

export default App;
