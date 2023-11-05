import { atom, selector } from "recoil";

// export type categories = "TO_DO" | "DOING" | "DONE";
// or
export enum categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",

  //
  // "TO_DO"
  // "DOING"
  // "DONE"
  // 만 쓰면 순서대로 index로 변환됨
}

// atom에 쓰이는 타입스크립트 , default는 배열.
export interface IToDo {
  text: string;
  id: number;
  //category: "TO_DO" | "DOING" | "DONE"; //string 형태로 해당 3가지 값만 받을 수 있다.
  //or
  category: categories;
}

//배열형태로 ITODo[]
export const todoState = atom<IToDo[]>({
  key: "todo",
  default: [],
});

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TO_DO,
  //default: "TO_DO",
});

//selector는 atom을 가져다가 *output을 변형한다. (e.g. category 분류) state를 변형하지 않음
//get function으로 atom을 불러옴
//e.g. useRecoilValue(todoSelector)
export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const toDos = get(todoState); //todo atom을 받아와서 category를 filter로
    //구별해서 다시 배열에 담아 반환. => [[{},{}, ],[{}, ],[{},{}, {}, ]]  이중배열

    // using select
    const todosCategory = get(categoryState);
    return toDos.filter((todo) => todo.category === todosCategory);

    // not using select
    // return [
    //   toDos.filter((todo) => todo.category === "TO_DO"),
    //   toDos.filter((todo) => todo.category === "DOING"),
    //   toDos.filter((todo) => todo.category === "DONE"),
    // ];
  },
});
