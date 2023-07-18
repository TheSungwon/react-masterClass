import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
0%{
  transform:rotate(0deg);
  border-radius:0px;
}
50%{
  // transform:rotate(360deg);
  border-radius:100px;
}
100%{
  transform:rotate(360deg);
  // transform:rotate(0deg);
  border-radius:0px;
}
// from{
//   transform:rotate(0deg);
//   border-radius:0px;
// }
// to{
//   transform:rotate(360deg);
//   border-radius:100px;
// }
`;

const animation = keyframes`
from{
  background-color: tomato;
  font-size: 30px;
}
to{
  background-color: teal;
  font-size: 100px;
}
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Btn = styled.button`
  background-color: black; //??? 왜 없으면 not working animation?
  animation: ${animation} 3s infinite;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 3s linear infinite;

  // span {
  ${Emoji} {
    // font-size: 36px;
    &:hover {
      font-size: 100px;
    }
    &:active {
      //click하고있으면 동작 <-> inactive
      opacity: 0;
    }
  }
  // span:hover{
  //   blah~
  // }
  // span안에 &:~ 해주것과 동일
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">😎</Emoji>
        <Emoji>😎</Emoji>
      </Box>
      <Btn>hello</Btn>
    </Wrapper>
  );
}

export default App;
