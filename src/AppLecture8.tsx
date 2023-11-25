import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";

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
  font-family: 'Source Sans Pro', sans-serif;
  /* background-color:${(props) => props.theme.bgColor}; */
  color:black;
  line-height: 1.2;
  background:linear-gradient(135deg,#e09,#d0e);
}
a {
  text-decoration:none;
  color:inherit
}
`;

//animate가 style components를 사용하려면 styled(motion.TagName)
// const Wrapper = styled.div`
const Wrapper = styled(motion.div)`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  /* background-color: white; */
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function AppLecture8() {
  // framer motion을 사용해서 animate하려면
  // <motion.div ~~ 으로 시작해서 사용
  // <div>으로 animate 불가

  const boxVariants = {
    hover: {
      scale: 1.5,
      rotateZ: 90,
    },
    click: {
      borderRadius: "100px",
      scale: 1,
    },
    drag: {
      backgroundColor: "#4bcffa",
      transition: {
        duration: 3,
      },
    },
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* <Box
          whileHover={{ scale: 1.5, rotateZ: 90 }}
          whileTap={{ borderRadius: "100px", scale: 1 }}
        />
        variant 사용 X */}
        <Box
          drag
          whileDrag="drag"
          // 색을 변경할 때 색 이름 red 같은 건 안되고 rgb, hex  backgroundColor: "#4bcffa"
          variants={boxVariants}
          whileHover={true ? "hover" : "other"}
          whileTap="click"
        />
      </Wrapper>
    </>
  );
}

export default AppLecture8;
