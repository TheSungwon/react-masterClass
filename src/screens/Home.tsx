import { Link } from "react-router-dom";
import { db } from "../db";

function Home() {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {db.map((db) => (
          <li key={db.id}>
            <Link to={`/users/${db.id}`}>{db.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
