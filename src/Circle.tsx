import React from "react";
import styled from "styled-components";

interface ContainerProps {
  aaa: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${(props) => props.aaa};
`;

///////////////////////////

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container aaa={bgColor} />;
}

export default Circle;

//ex
//interface는 TypeScript와 코드가 실행되기 전에 확인.
interface PlayerShape {
  name: string;
  age: number;
}
//prop types는 코드 실행 후에 브라우저에 에러 출력.

const sayHello = (playerObj: PlayerShape) =>
  `hello ${playerObj.name} you are ${playerObj.age} years old.`;

sayHello({ name: "sw", age: 999 });
