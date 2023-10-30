import { atom } from "recoil";

// atom에 쓰이는 타입스크립트 , default는 배열.
export interface IToDo {
  text: string;
  id: number;
  category: " TO_DO" | "DOING" | "DONE"; //string 형태로 해당 3가지 값만 받을 수 있다.
}

//배열형태로 ITODo[]
export const todoState = atom<IToDo[]>({
  key: "todo",
  default: [],
});
