import {
  AnimatePresence,
  motion,
  motionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  background: linear-gradient(135deg, #e09, #d0e);

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
  const x = motionValue(0);
  //x 위치가 바뀌어도 리렌더는 되지 않음. x값 위치를 확인하려면 useEffect로 체크

  const scale = useTransform(x, [-400, 0, 400], [2, 1, 0.1]);
  const rotateZ = useTransform(x, [-400, 400], [-360, 360]);
  //인자1 변경할 motionValue, 인자2 변경될 위치, 인자3 변경될 위치에서 받을 값
  // useEffect(() => {
  //   x.onChange(() => console.log(x.get()));
  //   scale.onChange(() => console.log(scale.get()));
  // }, [x]);

  const gradient = useTransform(
    x,
    [-400, 400],
    [
      "linear-gradient(135deg,#5300ee,#00abee0ee)",

      "linear-gradient(135deg,#58be43,#ee0000)",
    ]
  );

  ///////////////////////
  //scroll값인 motionValue -> useViewportScroll();에서 useScroll()로 변경됨
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    scrollY.onChange(() => {
      // console.log(scrollY.get(), scrollYProgress.get());
    });
  }, [scrollY, scrollYProgress]);

  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 5]);
  /////////////////
  /////////////////
  // svg
  const Svg = styled(motion.svg)`
    width: 300px;
    height: 300px;
    path {
      stroke: black;
      stroke-width: 2;
    }
  `;

  const svg = {
    start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
    end: {
      pathLength: 1,
      fill: "rgba(255,123,222,1)",
      // transition: { duration: 2 },
    },
  };

  const [showing, setShowing] = useState(false);
  const toggleShowing = () => {
    return setShowing((pre) => !pre);
  };
  const animatePresenceVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 360,
      transition: {
        duration: 1,
      },
    },
    leave: {
      opacity: 0,
      scale: 0,
      y: 100,
    },
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <button onClick={toggleShowing}>click</button>
        <AnimatePresence>
          {/* 태그가 조건으로 나타낼때 animatePresence는 바깥에 안에는 조건  */}
          {showing ? (
            <Svg
              variants={animatePresenceVariants} //AnimatePresence
              initial="initial" //AnimatePresence
              animate="visible" //AnimatePresence
              exit="leave" //AnimatePresence
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <motion.path
                variants={svg}
                initial="start"
                animate="end"
                transition={{
                  default: { duration: 5 },
                  fill: { duration: 2, delay: 1 },
                }}
                d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z"
              />
            </Svg>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
    // <>
    //   <GlobalStyle />
    //   <Wrapper style={{ background: gradient }}>
    //     <button onClick={() => x.set(200)}>click me</button>
    //     <Box style={{ x, scale: scaleY, rotateZ }} drag="x" dragSnapToOrigin />
    //   </Wrapper>
    // </>
  );
}

export default AppLecture8;
