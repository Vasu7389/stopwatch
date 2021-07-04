import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [[h, m, s], setTimer] = useState([0, 0, 0]);
  const [laps, setLaps] = useState([{}]);

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

  const onPause = () => {
    setIsStarted(false);
  };

  const onReset = () => {
    setIsStarted(false);
    setTimer([0, 0, 0]);
  };

  const onLapClick = () => {
    let temp = [...laps];
    const lastSplitTime = temp[temp.length - 1].splitTime;
    const splitTime = new Date(0, 0, 0, 0).toTimeString();
    const lapTime = Math.abs(new Date(splitTime) - new Date(lastSplitTime));
    console.log(lapTime);
    temp.push({
      lapTime,
      splitTime,
    });
    setLaps(temp);
  };

  return (
    <div className="stopwatch">
      <div className="container">
        <div className="clock">
          {h}:{m}:{s}
          <i className="fas fa-flag flagIcon" onClick={onLapClick}></i>
        </div>
        <div className="button-row">
          <Button onClickHandler={onReset}>Reset</Button>
          {isStarted ? (
            <Button onClickHandler={onPause}>Pause</Button>
          ) : (
            <Button onClickHandler={() => setIsStarted(true)}>Start</Button>
          )}
        </div>
        {laps &&
          laps.map((lap, index) => (
            <p key={index}>
              <span>{lap.lapTime}</span> <span>{lap.splitTime}</span>
            </p>
          ))}
      </div>
    </div>
  );
};

export default Stopwatch;
