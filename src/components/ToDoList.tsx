import { todo } from "node:test";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  IToDo,
  categories,
  categoryState,
  todoSelector,
  todoState,
} from "../atomsTodo";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

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

const Div = styled.div`
  margin: 1em;
  padding: 1em;
`;

function ToDoList() {
  const todoRecoil = useRecoilValue(todoState);
  //const [toDo, doing, done] = useRecoilValue(todoSelector); // todoSelector는 2중배열이기 때문에 구조분해[]
  //todoSelector가 더 이상 이중배열을 반환 하지 않도록 변경 됨

  const todos = useRecoilValue(todoSelector);

  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (value: IToDo["category"]) => {
    return setCategory(value);
  };
  console.log(category); //recoil value는 함수 밖에서 찍어보기
  console.log(todos);

  return (
    <>
      <Div>
        {/* using select */}
        <select onInput={(e) => onInput(e.currentTarget.value as categories)}>
          <option value={categories.TO_DO}>TO DO</option>
          <option value={categories.DOING}>DOING</option>
          <option value={categories.DONE}>DONE</option>
        </select>
        <CreateToDo />
        <ul>
          {todos?.map((todo) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </ul>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/* not using select */}
        {/* <h1 style={{ fontSize: "35px", color: "green" }}>To Do List</h1>
        <ul>
          {toDo.map((todo) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </ul>
        <hr />
        <h1 style={{ fontSize: "35px", color: "green" }}>Doing List</h1>
        <ul>
          {doing.map((todo) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </ul>
        <hr />
        <h1 style={{ fontSize: "35px", color: "green" }}>Done List</h1>
        <ul>
          {done.map((todo) => (
            <ToDo key={todo.id} {...todo} />
          ))}
        </ul>
        <hr /> */}
      </Div>
    </>
  );
}
export default ToDoList;
//
//
//
//
//
//

//react hook form e.g.
interface IForm {
  email: string;
  firstName?: string; //필수값 아니라면 ?
  lastName?: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}

function ToDoListUseReactHookForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError, //에러 발생 시키기 (e.g. 비밀번호 체크, 전체form)
    //발생하는 문제에 따라 추가적인 에러를 설정할 수 있게 해줌
    //사용법은 onValid 화살표 함수
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com", //defaultValues로 기본값 설정
    },
  });
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
  const onValid = (data: IForm) => {
    //valid 통과하고 클릭해야 실행 됨

    console.log(data, "onValid");
    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "password are not the same!!!" },
        {
          shouldFocus: true, // 에러난 곳으로 포커스 이동
        }
      );
    }

    // setError("extraError", { message: "server offline" });
  };

  //...register 에 {required:true} 유효성검증 , {required:true, minLength: 5}
  //입력안된 채로 submit하면 invalid input에 포커스 커서

  //formState
  //console.log(formState.errors); //어떤 종류의 에러인지, 에러가 발생했는지
  console.log(errors);

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
        onSubmit={handleSubmit(onValid)} //handleSubmit => hook form
      >
        <input
          style={{
            borderColor: errors?.email?.message && "red",
            borderWidth: "10px",
          }}
          {...register("email", {
            required: "email check error",
            pattern: {
              value: /^[A-Za-z0-9._%+_]+@naver.com/,
              message: "only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span style={{ color: "red" }}>{errors?.email?.message}</span>
        {/* <input {...(register("qq"), { required: true })} placeholder="qq" /> 
        괄호 위치 확인!!!!!!! 
         괄호가 (register required true면 submit할 때 input box에 toggle 생성? + submit, formState안됨
         괄호가 register( required true면 submit할 때 input box에 toggle 생성 X, formState됨
        */}
        <input
          {...register("firstName", {
            required: "write here",
            minLength: {
              value: 5,
              message: "write more than five words",
            },
            validate: (value) =>
              value?.includes("sssss") ? "no 'sssss' allowed" : true,
            //argument는 현재값, return true면 valid무조건 통과, false면 불가
            //return 에 문자열 넣으면 valid message출력
            //또는 input에 여러 개 검사가 필요할 수도 있기 때문에 객체 리터럴로 선언
          })}
          placeholder="firstName"
        />
        <span style={{ color: "red" }}>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", {
            required: "has errors",
            minLength: {
              value: 5,
              message: "write more than five words",
            },
            validate: {
              //아무렇게나 써도 됨
              asdfafd: (value) => (value?.includes("aaa") ? "aaa" : true),
              fdsa: (value) => (value?.includes("bbb") ? "bbb" : true),
              ffff: async (value) => (value?.includes("bbb") ? "bbb" : true),
              //async로 만들어서 서버응답을 받을 수도 있음
            },
          })}
          placeholder="lastName"
        />
        <span style={{ color: "red" }}>
          {errors?.lastName?.message as string}
        </span>
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
        <span style={{ color: "red" }}>
          {errors?.password?.message as string}
        </span>
        <input
          {...register("passwordCheck", {
            required: "password errors",
            minLength: {
              value: 5,
              message: "5글자이상 필요",
            },
          })}
          placeholder="password check"
        />
        <span style={{ color: "red" }}>
          {errors?.passwordCheck?.message as string}
        </span>

        <button>Add</button>
        {errors?.extraError?.message}
      </form>
    </div>
  );
}
