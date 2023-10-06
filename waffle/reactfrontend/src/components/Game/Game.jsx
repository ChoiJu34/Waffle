import React, { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import Timer from "./Timer";

let array = [];
for (let i = 1; i <= 25; i++) {
  array.push(i);
}

function OneFifty() {

  const [numbers, setNumbers] = useState(array);
  const [gameDone, setGameDone] = useState(false);
  const [current, setCurrent] = useState(1);

  const handleClick = num => {
    if (num === current && gameDone) {
      if (num === 50) {
        console.log("완료");
        endGame();
      }

      const index = numbers.indexOf(num);
      setNumbers(numbers => [
        ...numbers.slice(0, index),
        num < 26 ? num + 25 : 0,
        ...numbers.slice(index + 1)
      ]);
      setCurrent(current => current + 1);
    }
  };

  const startGame = () => {
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameDone(true);
  };
  const endGame = () => {
    setGameDone(false);
  };

  return (
    <Wrapper>
    <div className="title">당신에게 알맞은 패키지를 만들고 있어요</div>
    <Container>
      <Board numbers={numbers} handleClick={handleClick}></Board>
      {gameDone ? (
        <Timer />
      ) : (
        <StartButton onClick={startGame}>시작</StartButton>
      )}
    </Container>
    </Wrapper>
  );
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Wrapper = styled.div`
    .title {
    font-size: 2.3vh;
    margin-top: 7vh;
  }
`

const Container = styled.div`
  width: 100vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.button`
  margin-top: 5vh;
  width: 25vw;
  height: 5vh;
  border: none;
  border-radius: 10px;
  background-color: #9AC5F4;
  font-weight: 800;
  color: white;
  font-size: 2.5vh;
`;

export default OneFifty;