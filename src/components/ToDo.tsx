import styled, { keyframes } from "styled-components";
import { IToDo } from "../atomsTodo";

function ToDo({ ...todo }: IToDo) {
  console.log({ todo });

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
    background: ${(props) => props.theme.accentColor};

    font-size: 1em;
    border: solid #bf4f74;
    border-radius: 30px;
    animation: ${breathe} 3.5s infinite;
  `;
  //컴포넌트는 key 필요없으므로 삭제 <li key={todo.id} ....
  return (
    <li>
      <Loader>{todo.text} </Loader>
      <Button>To Do</Button>
      <Button>Doing</Button>
      <Button color="red">Done</Button>
    </li>
  );
}

export default ToDo;
