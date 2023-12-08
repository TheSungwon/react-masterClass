import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routesLecture9/Home";
import Tv from "./routesLecture9/Tv";
import Search from "./routesLecture9/Search";
import Header from "./componentsLecture9/Heaer";

function AppLecture9() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppLecture9;

// router 6이전 버전
// <Router>
//     <Switch>
//         <Route>
//         </Route>
//     </Switch>
// </Router>
