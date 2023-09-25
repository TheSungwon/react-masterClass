import { Link, Outlet, useParams } from "react-router-dom";
import { db } from "../../db";

function User() {
  const { userId } = useParams();
  console.log(userId);

  return (
    <div>
      <h1>
        User with it {userId} is named: {db[Number(userId) - 1].name}
      </h1>
      <hr />
      <Link to={"followers"}>See Followers</Link>
      <Outlet context={{ nameOfMyUser: db[Number(userId) - 1].name }} />
    </div>
  );
}

export default User;
