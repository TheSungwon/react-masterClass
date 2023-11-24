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
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

function AppLecture8() {
  // framer motion을 사용해서 animate하려면
  // <motion.div ~~ 으로 시작해서 사용
  // <div>으로 animate 불가

  const myVariants = {
    start: { scale: 0 },

    end: {
      scale: 1,
      rotateZ: 360,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: 0.5,
      },
    },
  };

  const Circle = styled(motion.div)`
    background-color: white;
    height: 70px;
    width: 70px;
    border-radius: 35px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    place-self: center;
  `;

  const boxVariants = {
    start: { opacity: 0, scale: 0 },
    end: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.5,

        delayChildren: 0.25, //자식 요소에 실행됨
        staggerChildren: 0.25, //자식 요소 첫 번째부터 다음 순서 대로 0.5씩 증가
      },
    },
  };

  const circleVariants = {
    start: {
      opacity: 0,
      y: 100,
      x: 100,
    },
    end: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Box variants={boxVariants} initial="start" animate="end">
          {/* 자식요소들은 부모요소의 initial과 animate를 상속 받는다. 대신 이름 같게 */}
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
        </Box>
      </Wrapper>
    </>
  );
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Box
          // transition={{
          //   type: "spring",
          //   damping: 20,
          //   stiffness: 100,
          //   delay: 0.5,
          // }}
          // initial={{ scale: 0 }}
          // animate={{ scale: 1, rotateZ: 360 }} 3개 props를 myVariants 변수로 정의
          variants={myVariants}
          initial="start" // myVariants 의 start
          animate="end" // myVariants 의 end
        />
        {/* initial 초기상태 설정 */}
        {/* animate은 기본으로 spring (튕기는 모션) */}
      </Wrapper>
    </>
  );
}

export default AppLecture8;
