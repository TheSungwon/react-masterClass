import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box1 = styled.div`
  background-color: teal;
  width: 500px;
  height: 500px;
`;

const Text = styled.span`
  color: white;
  font-size: 200px;
`;

const Box2 = styled.div`
  background-color: tomato;
  width: 500px;
  height: 500px;
`;
function App() {
  return (
    <Father>
      <Box1>
        <Text>hello</Text>
      </Box1>
      <Box2 />
    </Father>
  );
}

export default App;
