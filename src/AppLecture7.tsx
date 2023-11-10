import { useRecoilState, useRecoilValue } from "recoil";
import { hourState, minuteState, toDoState } from "./atomsLecture7";
//
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:black
}
a {
  text-decoration:none;
  color:inherit
}
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;
const Board = styled.div`
  background-color: ${({ theme: { boardColor } }) => {
    console.log(boardColor);
    return boardColor;
  }};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
`;
const Card = styled.div`
  background-color: ${({ theme: { cardColor } }) => cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-top: 10px;
`;

const todos = ["a", "b", "c", "d", "f"];
function AppLecture7() {
  // DragDropContext -> 필수값 onDragEnd, 자식요소
  // ㄴDroppable 필수값 droppableId, 함수형 자식요소
  //  ㄴDraggable 필수값 draggableId, index, 함수형 자식요소
  //
  //
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    //using splice method
    // How to use 'splice'
    // const x = ["a", "b", "c", "d", "f"];
    // (5) ['a', 'b', 'c', 'd', 'f']
    // x.splice(1,1);
    // ['b']
    // (4) ['a', 'c', 'd', 'f']
    // x.splice(3,0,"b");
    // (5) ['a', 'c', 'd', 'b', 'f']
    //
    //
    // splice는 mutation
    // e.g. x.splice를 하면 x값이 바뀜
    // non-mutation은 name.toUpperCase()을 해도 name값은 그대로 인 경우

    console.log(draggableId);
    console.log(destination);
    console.log(source);

    //destination을 제자리에 둘 수도 있으므로, destination값이 없을수 있다.
    if (!destination) return;

    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      //toDosCopy에서 source.index의 1개 삭제
      toDosCopy.splice(source.index, 1);

      //toDosCopy에 destination.index 위치에 draggableId값 추가
      toDosCopy.splice(destination?.index, 0, draggableId);

      return toDosCopy;
    });
  }; // 드래그를 끝난 시점에 실행되는 함수
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <GlobalStyle />
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => {
              //   console.log(magic);
              return (
                <Board
                  ref={magic.innerRef}
                  {...magic.droppableProps}
                  style={{ fontSize: "20px" }}
                >
                  {toDos.map((toDo, index) => (
                    <Draggable key={toDo} draggableId={toDo} index={index}>
                      {/* 버그를 방지하기 위해 key값에는 index값이 아닌 draggableId와 같은 toDo를 줘야함 */}

                      {(magic) => {
                        // console.log(magic);
                        return (
                          <Card ref={magic.innerRef} {...magic.draggableProps}>
                            <span {...magic.dragHandleProps}>❤</span>
                            {toDo}
                          </Card>
                          //dragHandleProps를 준 요소만 드래그 가능
                        );
                      }}
                    </Draggable>
                  ))}
                  {magic.placeholder}
                  {/* placeholder를 사용하면 드래그할 때 Droppable 크기가 고정 */}
                </Board>
              );
            }}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
export default AppLecture7;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
function AppLecture7_recoilSetPractce() {
  const [minuets, setMinutes] = useRecoilState(minuteState);
  const onChangeMinute = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // + 를 붙이면 string to number casting
  };

  //const hour = useRecoilValue(hourState);
  const [hour, setHour] = useRecoilState(hourState);
  //select를 useRecoilState로 받으면
  // 첫 번째 배열의 요소는 get property
  // 두 번째 배열의 요소는 set property
  const onChangeHour = (event: React.FormEvent<HTMLInputElement>) => {
    setHour(+event.currentTarget.value); //select의 set 두 번째 인자
  };

  console.log(hour);
  console.log(minuets, "select recoil value");
  return (
    <div>
      <input
        value={minuets}
        onChange={onChangeMinute}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hour}
        onChange={onChangeHour}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}
