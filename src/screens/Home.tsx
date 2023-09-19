function Home() {
  const users: any = []; //에러발생을 위해 선언

  return <h1>{users[0].name}</h1>; //에러발생을 위해 선언
}

export default Home;
