import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [millisecond, setMilliSecond] = useState(0);
  const [msInterval, setMsInterval] = useState();
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [laps, setLaps] = useState([{}]);

  useEffect(() => {
    if (millisecond === 100) {
      setSecond(second + 1);
      setMilliSecond(0);
    }
    if (second === 60) {
      setMinute(minute + 1);
      setSecond(0);
    }
  }, [second, minute, millisecond]);

  const onStart = () => {
    setIsStarted(true);
    setMsInterval(
      setInterval(() => {
        setMilliSecond((millisecond) => millisecond + 1);
      }, 10)
    );
  };

  const onPause = () => {
    clearInterval(msInterval);
    setIsStarted(false);
  };

  const onReset = () => {
    setMilliSecond(0);
    setSecond(0);
    setMinute(0);
  };

  const onLapClick = () => {
    let temp = [...laps];
    const lastSplitTime = temp[temp.length - 1].splitTime;
    const splitTime = new Date(
      0,
      0,
      0,
      0,
      minute,
      second,
      millisecond
    ).toTimeString();
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
          {minute}:{second}:{millisecond}
          <i className="fas fa-flag flagIcon" onClick={onLapClick}></i>
        </div>
        <div className="button-row">
          <Button onClickHandler={onReset}>Reset</Button>
          {isStarted ? (
            <Button onClickHandler={onPause}>Pause</Button>
          ) : (
            <Button onClickHandler={onStart}>Start</Button>
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
