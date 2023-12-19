import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routesLecture9/Home";
import Tv from "./routesLecture9/Tv";
import Search from "./routesLecture9/Search";
import Header from "./componentsLecture9/Header";

function AppLecture9() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies/:movieId" element={<Home />}></Route>
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

//1. Link에서 to는 상대경로로 적으시면 됩니다
//ex. '/tv' -> 'tv'
//
//2. exact가 사라졌습니다
//대신 알아서 최적의 경로를 react-router-dom이 판단하여 매칭해줍니다
//
//3. useRouteMatch가 useMatch로 변경되었습니다
//이 또한 상대경로로 작성하는 것으로 변경되었습니다
//ex. useRouteMatch('/tv') -> useMatch('tv')
