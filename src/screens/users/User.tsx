import { useParams } from "react-router-dom";
import { db } from "../../db";

function User() {
  const { userId } = useParams();
  console.log(userId);

  return (
    <h1>
      User with it {userId} is named: {db[Number(userId) - 1].name}
    </h1>
  );
}

export default User;
