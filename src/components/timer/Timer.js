import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Timer.css";

const Timer = () => {
  const [[h, m, s], setTimer] = useState([0, 0, 0]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timerID = setInterval(() => onStart(), 1000);
    return () => {
      clearInterval(timerID);
    };
  });

  const onStart = () => {
    if (h === 0 && m === 0 && s === 0) {
      setIsStarted(false);
      return;
    }
    if (!isStarted) return;
    if (m === 0 && s === 0) {
      setTimer([h - 1, 59, 59]);
    } else if (s === 0) {
      setTimer([h, m - 1, 59]);
    } else {
      setTimer([h, m, s - 1]);
    }
  };

  const onReset = () => {
    setIsStarted(false);
    setTimer([0, 0, 0]);
  };

  return (
    <div className="timer">
      <input
        type="text"
        className="timer-input"
        value={h}
        onChange={(e) => setTimer([e.target.value, m, s])}
      />
      <input
        type="text"
        className="timer-input"
        value={m}
        onChange={(e) => setTimer([h, e.target.value, s])}
      />
      <input
        type="text"
        className="timer-input"
        value={s}
        onChange={(e) => setTimer([h, m, e.target.value])}
      />
      <div className="button-row">
        <Button onClickHandler={onReset}>Reset</Button>
        {isStarted ? (
          <Button onClickHandler={() => setIsStarted(false)}>Pause</Button>
        ) : (
          <Button
            onClickHandler={() => setIsStarted(true)}
            disabled={h === 0 && m === 0 && s === 0}
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
