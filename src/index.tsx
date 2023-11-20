import React from "react";
//import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { dargTheme, darkTheme } from "./theme";
import AppLecture7 from "./AppLecture7";
import AppLecture8 from "./AppLecture8";

const queryClient = new QueryClient();

// @@@@coin project
// ReactDOM.render(
//   <React.StrictMode>
//     <RecoilRoot>
//       {/* recoil을 사용하기 위한 선언 + atoms.ts 파일생성*/}
//       <QueryClientProvider client={queryClient}>
//         {/* QueryClientProvider = > userQuery를 사용하기위한 선언 */}

//         <App />
//       </QueryClientProvider>
//     </RecoilRoot>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// @@@@To-Do list project
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* recoil을 사용하기 위한 선언 + atoms.ts 파일생성*/}

      <ThemeProvider theme={dargTheme}>
        <AppLecture8 />
        {/* <App /> */}
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
