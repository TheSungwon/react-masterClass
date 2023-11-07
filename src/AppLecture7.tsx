import { useRecoilState, useRecoilValue } from "recoil";
import { hourState, minuteState } from "./atomsLecture7";

function AppLecture7() {
  const [minuets, setMinutes] = useRecoilState(minuteState);
  const onChangeMinute = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // + 를 붙이면 string to number casting
  };

  //const hour = useRecoilValue(hourState);
  const [hour, setHour] = useRecoilState(hourState);
  //select를 useRecoilState로 받으면
  // 첫 번째 배열의 요소는 get property
  // 두 번째 배열의 요소는 set property
  const onChangeHour = (event: React.FormEvent<HTMLInputElement>) => {
    setHour(+event.currentTarget.value); //select의 set 두 번째 인자
  };

  console.log(hour);
  console.log(minuets, "select recoil value");
  return (
    <div>
      <input
        value={minuets}
        onChange={onChangeMinute}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hour}
        onChange={onChangeHour}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default AppLecture7;
