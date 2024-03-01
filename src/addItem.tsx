import { ChangeEvent, useState, KeyboardEvent } from "react";

export type AddItemFormPropsType = {
  addTask: (title: string, todolistId: string) => void;
  id: string;
};
export function AddItemForm(props: AddItemFormPropsType) {
  const [title, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13 && title.trim() !== "") {
      props.addTask(title, props.id);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim(), props.id);
      setNewTaskTitle("");
      setError("");
    } else {
      setError("Field is required");
    }
  };
  return (
    <div>
      <input
        value={title}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
