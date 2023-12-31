import React from "react";
//import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { dargTheme, darkTheme, theme } from "./theme";
import AppLecture7 from "./AppLecture7";
import AppLecture8 from "./AppLecture8";
import AppLecture9 from "./AppLecture9";
import { createRoot } from "react-dom/client";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  color:${(props) => props.theme.white?.lighter};
  line-height: 1.2;
  background-color:black;
  
}
a {
  text-decoration:none;
  color:inherit;
}
`;

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

const root = createRoot(document.getElementById("root") as HTMLElement);

// ReactDOM.render(
root.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* recoil을 사용하기 위한 선언 + atoms.ts 파일생성*/}

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppLecture9 />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
