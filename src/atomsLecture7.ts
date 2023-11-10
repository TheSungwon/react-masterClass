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

export const toDoState = atom({
  key: "toDo",
  default: ["a", "b", "c", "d", "f"],
});
