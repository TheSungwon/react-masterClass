import { atom, selector } from "recoil";

// atom에 쓰이는 타입스크립트 , default는 배열.
export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; //string 형태로 해당 3가지 값만 받을 수 있다.
}

//배열형태로 ITODo[]
export const todoState = atom<IToDo[]>({
  key: "todo",
  default: [],
});

//selector는 atom을 가져다가 *output을 변형한다. (e.g. category 분류) state를 변형하지 않음
//get function으로 atom을 불러옴
//e.g. useRecoilValue(todoSelector)
export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const toDos = get(todoState); //todo atom을 받아와서 category를 filter로
    //구별해서 다시 배열에 담아 반환. => [[{},{}, ],[{}, ],[{},{}, {}, ]]  이중배열

    return [
      toDos.filter((todo) => todo.category === "TO_DO"),
      toDos.filter((todo) => todo.category === "DOING"),
      toDos.filter((todo) => todo.category === "DONE"),
    ];
  },
});
