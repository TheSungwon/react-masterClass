import { useQuery } from "react-query";
import { getMovies } from "../apiLectre9";

function Home() {
  const { data, isLoading } = useQuery(["aa"], getMovies);
  console.log(data);
  return <div style={{ backgroundColor: "white", height: "200vh" }}>home</div>;
}

export default Home;
