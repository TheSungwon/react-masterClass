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
  const { register, watch, handleSubmit, formState } = useForm();
  //   console.log(register("aaaa"));
  //register가 위의 것들을 해줌 onChange, setState..
  //register반환 값 .. name, onBlur, onChange, ref ..
  //onBlur는 input바깥쪽 클릭

  //  input에 register를 spread연산으로 props주기
  //{name: 'dd', onChange: ƒ, onBlur: ƒ, ref: ƒ}

  //
  //watch는 form의 입력값 변화 관찰
  //   console.log(watch());

  //handleSubmit은 validation, preventDefault, ...기능
  //onValid 는필수, 와 onInvalid를 인자로 받음 onValid는 유효할때, onValid는 X
  const onValid = (data: any) => {
    console.log(data, "onValid");
  };
  //...register 에 {required:true} 유효성검증 , {required:true, minLength: 5}
  //입력안된 채로 submit하면 invalid input에 포커스 커서

  //formState
  console.log(formState.errors); //어떤 종류의 에러인지, 에러가 발생했는지

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...(register("todo"), { required: true, minLength: 5 })}
          placeholder="Write a To Do"
        />
        {/* <input {...(register("qq"), { required: true })} placeholder="qq" /> 
        괄호 위치 확인!!!!!!! 
         괄호가 (register required true면 submit할 때 input box에 toggle 생성? + submit, formState안됨
         괄호가 register( required true면 submit할 때 input box에 toggle 생성 X, formState됨
        */}
        <input {...register("qq", { required: true })} placeholder="qq" />
        <input
          {...register("ww", { required: "has errors", minLength: 10 })}
          placeholder="ww"
        />
        <input
          {...register("password", {
            required: "password errors",
            minLength: {
              value: 5,
              message: "5글자이상 필요",
            },
          })}
          placeholder="password"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
