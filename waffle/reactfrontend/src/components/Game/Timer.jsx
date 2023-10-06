import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

function Timer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const record = useRef();
  record.current = timeElapsed;
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(timeElapsed => timeElapsed + 30);
    }, 30);
    return () => {
      alert(record.current / 1000 + "초 소요");
      clearInterval(timer);
    };
  }, []);
  return (
    <Container>
      <Front>{Math.floor(timeElapsed / 1000)}:</Front>
      <Back>{(timeElapsed % 1000) / 10}</Back>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 5vh;
  width: 10vw;
  height: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.5vh;
`;

const Front = styled.div`
  text-align: right;
`;

const Back = styled.div`
  width: 1em;
`;

export default Timer;