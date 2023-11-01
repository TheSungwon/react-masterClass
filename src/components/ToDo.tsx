import styled, { keyframes } from "styled-components";
import { IToDo, todoState } from "../atomsTodo";
import { useSetRecoilState } from "recoil";

const breathe = keyframes`
0% {opacity:1;}
50%{opacity:0.5;}
100%{opacity:1;}
`;
const Loader = styled.span`
  color: red;
  text-align: center;
  animation: ${breathe} 0.5s infinite;

  // display: block;
`;

const Button = styled.button`
  background: ${({ children }) =>
    children === "Doing" ? "yellow" : children === "To Do" ? "white" : "dark"};

  font-size: 1em;
  border: solid #bf4f74;
  border-radius: 30px;
  animation: ${breathe} 3.5s infinite;
  cursor: pointer;

  display: "flex";
`;

function ToDo({ text, category, ...todo }: IToDo) {
  //todo에는 text, category, id가 있지만 두 개를 빼서 todo에는 id만 남는다.
  console.log({ todo });

  const setTodo = useSetRecoilState(todoState);

  const onClick = (newCategory: IToDo["category"]) => {
    //typescript select category
    // newCategory:"TO_DO" | "DOING" | "DONE" 처럼 쓸 수 있지만 인터페이스 키값 셀렉해서 사용하기

    setTodo((oldTodo) => {
      console.log(oldTodo, "setTodo");
      console.log(todo.id, "todo.id");
      const targetIndex = oldTodo.findIndex((td) => td.id === todo.id);
      console.log(targetIndex, "targetIndex");

      const oldTD = oldTodo[targetIndex];
      const newTD = { text, id: todo.id, category: newCategory };
      console.log(oldTD, "oldTD");
      console.log(newTD, "newTD");
      return oldTodo;
    });
  };
  //컴포넌트는 key 필요없으므로 삭제 <li key={todo.id} ....
  return (
    <li style={{ marginBottom: "1em" }}>
      <Loader>
        {category} : {text}
      </Loader>
      <div>
        {/* TO_DO" | "DOING" | "DONE */}
        {category !== "DOING" && (
          <Button onClick={() => onClick("DOING")}>Doing</Button>
        )}
        {category !== "TO_DO" && (
          <Button onClick={() => onClick("TO_DO")}>To Do</Button>
        )}
        {category !== "DONE" && (
          <Button onClick={() => onClick("DONE")} color="red">
            Done
          </Button>
        )}
        {/* onClick을 익명함수로 만들어서 사용해야 인자를 전달할 수 있다. */}

        {/* 익명함수없이 함수명만 써서 사용하려면 */}
        {/* {category !== "DONE" && <Button name="DONE" onClick={onClick}>Done</Button>} */}
        {/* 만약 onClick에 인자없이 함수명만 넣어서 사용한다면 name을 지정해서 사용하고 */}
        {/* const onClick = (event:React.MouseEvent<HTMLButtonElement>=>{
            const {currentTarget:{name},} = event; 
            console.log(name);
            } 이렇게 바꿔주면 사용할 수 있다. */}
      </div>
    </li>
  );
}

export default ToDo;
