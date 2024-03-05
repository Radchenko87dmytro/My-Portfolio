import { useState, ChangeEvent } from "react";

type EditableSpanPropsType = {
  title: string;
};

export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
  };

  const activateViewMode = () => {
    setEditMode(false);
    setTitle(props.title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    ></input>
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}-</span>
  );
}
