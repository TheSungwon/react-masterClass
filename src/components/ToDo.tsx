import styled, { keyframes } from "styled-components";
import { IToDo, categories, todoState } from "../atomsTodo";
import { useSetRecoilState } from "recoil";

const breathe = keyframes`
0% {opacity:1; }
50%{opacity:0.5; }
100%{opacity:1;}
`;
const Loader = styled.span`
  color: white;
  text-align: center;
  animation: ${breathe} 1.5s infinite;
  padding: 5px;

  // display: block;
`;

const Button = styled.button`
  background: ${({ children }) =>
    children === "Doing" ? "yellow" : children === "To Do" ? "white" : "red"};

  font-size: 1em;
  border: solid #bf4f74;
  border-radius: 30px;
  animation: ${breathe} 3.5s infinite;
  cursor: pointer;
  :hover {
    background-color: aqua;
    border-color: transparent;
  }
  margin-inline: 5px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

function ToDo({ text, category, ...todo }: IToDo) {
  //todo에는 text, category, id가 있지만 두 개를 빼서 todo에는 id만 남는다.
  console.log({ todo });

  const setTodo = useSetRecoilState(todoState);

  const onClick = (newCategory: IToDo["category"]) => {
    //typescript select category
    // newCategory:"TO_DO" | "DOING" | "DONE" 처럼 쓸 수 있지만 인터페이스 키값 셀렉해서 사용하기

    setTodo((oldTodo) => {
      // console.log(oldTodo, "setTodo");
      // console.log(todo.id, "todo.id");
      const targetIndex = oldTodo.findIndex((td) => td.id === todo.id);
      console.log(targetIndex, "targetIndex");

      const newTD = { text, id: todo.id, category: newCategory };
      // console.log(oldTD, "oldTD");
      // console.log(newTD, "newTD");
      console.log([
        ...oldTodo.slice(0, targetIndex),
        newTD,
        ...oldTodo.slice(targetIndex + 1),
      ]);
      const newToDoArray = [
        ...oldTodo.slice(0, targetIndex),
        newTD,
        ...oldTodo.slice(targetIndex + 1),
      ];
      //배열을 삭제하지 않고 slice와 targetIndex로 새 배열을 만들어서 교체하기
      // [1,2,3,4,5] 와 index가 2 이면
      // slice(0,2)하면 [1,2] 까지 자르고
      // + 변경하려는 값
      // slice(target+1) [4,5] 까지 잘라서 세 개를 합쳐서 반환하면 변경 된다.

      return newToDoArray;
    });
  };

  const onClickDelete = (todoId: any) => {
    console.log(todoId);
    setTodo((oldTodo) => {
      const targetIndex = oldTodo.findIndex((find) => find.id === todoId);
      console.log(oldTodo.filter((_, i) => i !== targetIndex));

      console.log(targetIndex);

      const afterDeleteArray = oldTodo.filter((_, i) => i !== targetIndex);
      return afterDeleteArray;
    });
  };
  //컴포넌트는 key 필요없으므로 삭제 <li key={todo.id} ....
  return (
    <li>
      <Loader>
        {category} : {text}
      </Loader>
      <div>
        {/* TO_DO" | "DOING" | "DONE */}
        {category !== categories.DOING && (
          <Button onClick={() => onClick(categories.DOING)}>Doing</Button>
        )}
        {category !== categories.TO_DO && (
          <Button onClick={() => onClick(categories.TO_DO)}>To Do</Button>
        )}
        {category !== categories.DONE && (
          <Button onClick={() => onClick(categories.DONE)}>Done</Button>
        )}
        <button onClick={() => onClickDelete(todo.id)}>delete</button>
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
