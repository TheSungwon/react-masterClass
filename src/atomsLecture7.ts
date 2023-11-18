import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minute",
  default: 0,
});

// <'N'umber> X
export const hourState = selector<number>({
  key: "hour",
  get: ({ get }) => {
    const minutes = get(minuteState);
    console.log(minutes, "select");
    return minutes / 60;
  },

  set: ({ set }, newValue) => {
    // 2번째 argument는 set에 보내는 값을 받을 수 있다.
    console.log(newValue, "newValue");
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);

    //
  },
});

export interface IToDo {
  id: number;
  text: string;
}

//toDos state는
//string type의 property 와, string typ의 array로 이루어져 있다.
interface IToDoState {
  // [key: string]: string[];
  [key: string]: IToDo[];
}

//IToDoState typescript variable form
// const toDos: IToDoState = {
//   "property1": [
//     { id: 1, text: "todo1" },
//     { id: 2, text: "todo2" },
//   ],
//   "property2": [
//     { id: 3, text: "todo3" },
//     { id: 4, text: "todo4" },
//   ],
// };

export const toDoState = atom<IToDoState>({
  key: "toDo",
  // default: ["a", "b", "c", "d", "f"],
  default: {
    "TO DO": [], // TO 띄어쓰기 Do 를 표현하기 위해서 "" 사용
    Doing: [],
    Done: [],
  },
});
