import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IToDo } from "../atomsLecture7";
const Wrapper = styled.div`
  background-color: ${({ theme: { boardColor } }) => {
    console.log(boardColor);
    return boardColor;
  }};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;

  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${({ isDraggingOver, draggingFromThisWith }) =>
    isDraggingOver
      ? "#dfe6e9"
      : draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 1s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoardProps {
  //   toDos: string[];
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

//boardId는 recoil toDoState default object key
function Board({ toDos, boardId }: IBoardProps) {
  //ref 는 react js component를 통해 html 요소를 가져오는 것.. e.g. getElementById
  //   const inputRef = useRef<HTMLInputElement>(null); //default 값은 null , e.g. getElementById
  //   const onClick = (event: any) => {
  //     //useRef를 사용할 땐 react js 말고 vanilla js 를 쓴다?
  //     console.log(event.currentTarget);
  //     console.log(inputRef.current);
  //     inputRef.current?.focus();
  //     setTimeout(() => {
  //       inputRef.current?.blur();
  //     }, 5000);
  //   };
  //   <input ref={inputRef} type="text" />
  //   <button onClick={onClick}>click</button>

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          placeholder={`add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => {
          //snapshot => info로 변경
          // snapshot.isDraggingOver 드래그해서 들어왔는지 boolean으로 확인
          // snapshot.draggingFromThisWith 드래그 했는지
          //   console.log(magic);
          return (
            <Area
              isDraggingOver={info.isDraggingOver}
              draggingFromThisWith={Boolean(info.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard
                  key={toDo.id}
                  index={index}
                  toDoId={toDo.id}
                  toDoText={toDo.text}
                />
              ))}
              {magic.placeholder}
              {/* placeholder를 사용하면 드래그할 때 Droppable 크기가 고정 */}
            </Area>
          );
        }}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
