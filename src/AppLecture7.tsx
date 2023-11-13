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
import DraggableCard from "./componentsLecture7/DraggableCard";
import Board from "./componentsLecture7/Board";
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
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`;

//const todos = ["a", "b", "c", "d", "f"];
function AppLecture7() {
  // DragDropContext -> 필수값 onDragEnd, 자식요소
  // ㄴDroppable 필수값 droppableId, 함수형 자식요소
  //  ㄴDraggable 필수값 draggableId, index, 함수형 자식요소
  //
  //
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
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

    console.log(info);
    const { draggableId, destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      //옮기는 board(source)와 옮겨질 board(destination)가 같은지 check

      setToDos((allBoards) => {
        //source board 값 가져와서 mutate 해주기
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1); //옮긴 번호 위치 삭제
        boardCopy.splice(destination?.index, 0, draggableId); //옮겨질 번호 위치에 값 입력

        return {
          ...allBoards, //toDos State의 property 값들 가져오기
          [source.droppableId]: boardCopy,
          //...allBoards는 source.droppableId를 따로 적어주었기 때문에
          //source.droppableId를 제외한 property들이 입력되고
          //[source.droppableId]:boardCopy 를 따로 입력해줌
        };
      });
    }

    //
    //
    //
    //
    //destination을 제자리에 둘 수도 있으므로, destination값이 없을수 있다.
    // if (!destination) return;

    // setToDos((oldToDos) => {
    //   const toDosCopy = [...oldToDos];
    //   //toDosCopy에서 source.index의 1개 삭제
    //   toDosCopy.splice(source.index, 1);

    //   //toDosCopy에 destination.index 위치에 draggableId값 추가
    //   toDosCopy.splice(destination?.index, 0, draggableId);

    //   return toDosCopy;
    // });
  }; // 드래그를 끝난 시점에 실행되는 함수
  //
  // const x = { a:[1,2,4], b:[5,6,7]};
  // Object.keys(x).map((boardId) => x[boardId]);
  //
  //

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <GlobalStyle />
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
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
