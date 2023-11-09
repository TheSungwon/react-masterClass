import { useRecoilState, useRecoilValue } from "recoil";
import { hourState, minuteState } from "./atomsLecture7";
//
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function AppLecture7() {
  // DragDropContext -> 필수값 onDragEnd, 자식요소
  // ㄴDroppable 필수값 droppableId, 함수형 자식요소
  //  ㄴDraggable 필수값 draggableId, index, 함수형 자식요소
  //
  const onDragEnd = () => {}; // 드래그를 끝난 시점에 실행되는 함수
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="one">
          {() => (
            <ul>
              <Draggable draggableId="first" index={0}>
                {() => <li>One</li>}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {() => <li>Two</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
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
