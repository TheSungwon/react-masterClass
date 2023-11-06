import { useRecoilState, useRecoilValue } from "recoil";
import { hourState, minuteState } from "./atomsLecture7";

function AppLecture7() {
  const [minuets, setMinutes] = useRecoilState(minuteState);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // + 를 붙이면 string to number casting
  };

  const hour = useRecoilValue(hourState);
  console.log(hour);
  console.log(minuets, "select recoil value");
  return (
    <div>
      <input
        value={minuets}
        onChange={onChange}
        type="number"
        placeholder="Minutes"
      />
      <input value={hour} type="number" placeholder="Hours" />
    </div>
  );
}

export default AppLecture7;
