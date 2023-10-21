import { atom } from "recoil";

export const isDarkAtom = atom({
  //atom은 2가지를 필요로 함  key, default
  //key는 unique , default 는 값
  key: "isDark",
  default: false,
});
