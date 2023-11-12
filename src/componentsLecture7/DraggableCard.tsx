import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
const Card = styled.div`
  background-color: ${({ theme: { cardColor } }) => cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-top: 10px;
`;

interface IDraggableCardProps {
  toDo: string;
  index: number;
}
function DraggableCard({ toDo, index }: IDraggableCardProps) {
  console.log(toDo, " has been rendered~~~");
  return (
    <>
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
    </>
  );
}

// export default DraggableCard;
export default React.memo(DraggableCard);
//prop이 변하지 않았다면 리렌더 하지 않도록 하기위함
