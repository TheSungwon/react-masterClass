import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../apiLecture9";
import styled from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled(motion.div)`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled(motion.div)`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  /* background-image: ${(props) => props.bgphoto};  url()안에 넣어줘야 함*/
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  //위에서 아래로 gradient // 0, 0, 0, 1 -> 0, 0, 0, 0
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  /* color: red; */
  font-size: 20px;
  border-radius: 10px;

  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  cursor: pointer;
`;

const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};

const boxVariants = {
  normal: {
    scale: 1,
    transition: {
      // type: "tween",
    },
  },
  hover: {
    scale: 1.3,
    y: -50,

    transition: {
      delay: 0.3,
      duration: 0.3,
      // type: "tween",
    },
  },
};

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme?.black?.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      // type: "tween",
    },
  },
};

const BigMovie = styled(motion.div)<{ scrollY: number }>`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: red;
  border-radius: 20;

  /* top: ${(props) => props.scrollY}px; */
  left: 0;
  right: 0;
  margin: auto;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

//offset = 3 , index = 0, 1
//[0,1,2,3,4,5,].slice(offset*index, offset*index+offset)
//=> 0,1,2 _ 3,4,5
const offset = 6; //보여줄 페이지 수

function Home() {
  // react router 5 -> 6 변경
  // 1. useHistory() => useNavigate()
  // 2. useRouteMatch() => useMatch()
  const history = useNavigate();

  const onBoxClicked = (movieId: number) => {
    history(`/movies/${movieId}`);
  };

  const bigMovieMatch = useMatch("/movies/:movieId");
  console.log(bigMovieMatch);

  const onOverlayClicked = () => {
    history(`/`);
    //history.goback() => navigate(-1)
  };

  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  // console.log(data);
  const totalMovies = data && data?.results.length - 1; //첫 번째 영화 제외
  const maxIndex = totalMovies && Math.floor(totalMovies / offset) - 1; //4.2라면 0.2도 보여줘야 하기 때문에 ceil로 올림처리 + ceil이므로 -1
  //or 잘려보이는게 싫다면 Math.floor

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () =>
    data && leaving
      ? toggleLeaving()
      : setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            {/* data?.results[0].backdrop_path 가 없으면 ""을 보내게 함 */}

            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            {/* <AnimatePresence mode="wait"> */}
            <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
              {/* onExitComplete exit가 끝나면 실행되는 prop */}
              {/* initial initial 실행 X (페이지 시작 할 때 animate 실행 X) */}
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1) //첫 번째 영화 제외
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => {
                    return (
                      <Box
                        layoutId={movie.id + ""}
                        onClick={() => onBoxClicked(movie.id)}
                        variants={boxVariants}
                        initial="normal"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        key={movie.id}
                        bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      >
                        <Info variants={infoVariants}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </Box>
                    );
                  })}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch && (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  layoutId={bigMovieMatch.params?.movieId}
                  scrollY={scrollY.get()}
                  style={{ top: scrollY.get() + 100 }}
                ></BigMovie>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
