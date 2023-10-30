import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { todoState } from "../atomsTodo";

interface IToDoForm {
  todo: string;
}

function CreateToDo() {
  const { register, handleSubmit, formState, reset } = useForm<IToDoForm>();
  const setTodo = useSetRecoilState(todoState);
  //recoil을 state처럼 사용 할 때는 useRecoilState

  const onValid = ({ todo }: IToDoForm) => {
    reset();

    setTodo((prev) => [
      { text: todo, id: Date.now(), category: " TO_DO" },
      ...prev,
    ]);
    //기존값 다시 받아서 todo값 추가된 배열 반환
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", {
            required: "please write a To Do.",
            validate: (value) => (value === "1" ? "no '1' allowed" : true),
          })}
          placeholder="write a to do"
          autoCorrect="none"
        />
        <span style={{ color: "red" }}>
          {formState?.errors?.todo ? formState?.errors?.todo?.message : ""}
        </span>
        <button>add .</button>
      </form>
    </>
  );
}

export default CreateToDo;
