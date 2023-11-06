import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minute",
  default: 0,
});

export const hourState = selector({
  key: "hour",
  get: ({ get }) => {
    const minutes = get(minuteState);
    console.log(minutes, "select");
    return minutes / 60;
  },
});
