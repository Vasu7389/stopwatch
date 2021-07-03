import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [millisecond, setMilliSecond] = useState(0);
  const [msInterval, setMsInterval] = useState();
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [laps, setLaps] = useState([{}]);

  useEffect(() => {
    if (millisecond === 60) {
      setSecond(second + 1);
      setMilliSecond(0);
    }
    if (second === 60) {
      setMinute(minute + 1);
      setSecond(0);
    }
  });

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
    <div className="App">
      <h1>Stopwatch</h1>
      <div className="container">
        <div className="clock">
          {minute}:{second}:{millisecond}
          <i className="fas fa-flag flagIcon" onClick={onLapClick}></i>
        </div>
        <div className="button-row">
          <button className="buttons" onClick={onReset}>
            Reset
          </button>
          {isStarted ? (
            <button className="buttons" onClick={onPause}>
              Pause
            </button>
          ) : (
            <button className="buttons" onClick={onStart}>
              Start
            </button>
          )}
        </div>
        {laps &&
          laps.map((lap) => (
            <p>
              <span>{lap.lapTime}</span> <span>{lap.splitTime}</span>
            </p>
          ))}
      </div>
    </div>
  );
}

export default App;
