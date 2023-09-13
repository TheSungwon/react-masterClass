import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
  `;

  const H1 = styled.h1`
    color: ${(props) => props.theme.textColor};
  `;

  interface DummyProps {
    text: string;
    otherThing?: boolean; // optional
    active?: boolean;
  }

  function Dummy({ text, otherThing, active = false }: DummyProps) {
    return <H1>{text}</H1>;
  }

  //https://legacy.reactjs.org/docs/events.html
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };

  // typescript library 가 없는 라이브러리면
  // npm i --save-dev @types/~~~ , ~~~라이브러리 이름
  return (
    <Container>
      <H1>protected</H1>
      <Dummy text="dddd" active />
      <Dummy text="dddd" active={true} />
      {/* <form> */}
      <button onClick={onClick}></button>
      {/* </form> */}
    </Container>
  );
}

export default App;
