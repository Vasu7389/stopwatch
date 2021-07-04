import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [[h, m, s], setTimer] = useState([0, 0, 0]);

  useEffect(() => {
    const timerId = setInterval(() => onStart(), 1000);
    return () => clearInterval(timerId);
  });

  const onStart = () => {
    if (!isStarted) return;
    if (m === 60 && s === 60) {
      setTimer([h + 1, 0, 0]);
    } else if (s === 60) {
      setTimer([h, m + 1, 0]);
    } else {
      setTimer([h, m, s + 1]);
    }
  };

  const onReset = () => {
    setIsStarted(false);
    setTimer([0, 0, 0]);
  };

  return (
    <div className="stopwatch">
      <div className="container">
        <div className="clock" onClick={() => setIsStarted(true)}>
          <div className="clock-border-ring">
            <div className="clock-border-ring-inner"></div>
          </div>
          <div className="clock-timer">
            {h < 10 && 0}
            {h}:{m < 10 && 0}
            {m}:{s < 10 && 0}
            {s}
          </div>
        </div>
        <div className="button-row">
          <Button onClickHandler={onReset}>Reset</Button>
          <Button onClickHandler={() => setIsStarted(!isStarted)}>
            {isStarted ? <>Pause</> : <>Start</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
