import { useState } from "react";

function ToDoList() {
  const [toDo, setTodo] = useState("");

  //   event: React.FormEvent<HTMLInputElement> 타입스크립트
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setTodo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={toDo} onChange={onChange} placeholder="what a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
