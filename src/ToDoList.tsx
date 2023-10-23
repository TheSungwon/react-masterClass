import { useState } from "react";
import { useForm } from "react-hook-form";

//react hook form 안 썻을 경우..
// function ToDoList() {
//   const [toDo, setTodo] = useState("");

//   //   event: React.FormEvent<HTMLInputElement> 타입스크립트
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;

//     setTodo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={toDo} onChange={onChange} placeholder="what a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, watch } = useForm();
  console.log(register("aaaa"));
  //register가 위의 것들을 해줌 onChange, setState..
  //register반환 값 .. name, onBlur, onChange, ref ..
  //onBlur는 input바깥쪽 클릭

  //  input에 register를 spread연산으로 props주기
  //{name: 'dd', onChange: ƒ, onBlur: ƒ, ref: ƒ}

  //
  //watch는 form의 입력값 변화 관찰
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("todo")} placeholder="Write a To Do" />
        <input {...register("qq")} placeholder="qq" />
        <input {...register("ww")} placeholder="ww" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
