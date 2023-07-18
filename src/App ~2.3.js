import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

// const BoxOne = styled.div`
//   background-color: teal;
//   height: 100px;
//   width: 100px;
// `;

// const BoxTwo = styled.div`
//   background-color: tomato;
//   height: 100px;
//   width: 100px;
// `;
const Box = styled.div`
  // background-color: tomato;
  background-color: ${(props) => props.bgColor};
  height: 100px;
  width: 100px;
`;

// const Circle = styled.div`
//   // background-color: tomato;
//   background-color: ${(props) => props.bgColor};
//   height: 100px;
//   width: 100px;
//   border-radius: 50px;
// `; 아래와 같이 Box의 모든 속성을 받아와서 사용 할 수 있다.

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Text = styled.span`
  color: white;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

//.attrs({ required: true ...})는 모든 input에 required true 적용
const Input = styled.input.attrs({ required: true, maxLength: 5 })`
  background-color: tomato;
`;
function App() {
  return (
    <>
      <Father>
        <Box bgColor="teal" />
        <Circle bgColor="tomato" />
        <Circle bgColor="whiteSmoke" />

        <br />
        <Btn>Log in</Btn>
        <Btn as="a" href="#">
          Log in
        </Btn>
        {/* Btn 컴포넌트는 그대로 사용하고 태그는 a 태그로 바꾸려면 as 속성 추가 */}
      </Father>
      <br />
      <br />
      <br />
      <Father as="header">
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
      </Father>
    </>
  );
}

export default App;
