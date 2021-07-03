import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Timer.css";

const Timer = () => {
  const [timer, setTimer] = useState(15);
  const [msInterval, setMsInterval] = useState();

  useEffect(() => {
    if (timer === 0) {
      clearInterval(msInterval);
    }
  });

  const onStart = () => {
    setMsInterval(
      setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000)
    );
  };

  const onReset = () => {};
  return (
    <div className="timer">
      <input
        type="text"
        className="timer-input"
        value={timer}
        onChange={(e) => setTimer(e.target.value)}
      />
      <div className="button-row">
        <Button onClickHandler={onReset}>Reset</Button>
        <Button onClickHandler={onStart}>Start</Button>
      </div>
    </div>
  );
};

export default Timer;
