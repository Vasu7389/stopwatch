import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Stopwatch from "./stopwatch/Stopwatch";
import Timer from "./timer/Timer";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="header">
          <Link to="/">Stopwatch</Link>
          <Link to="/timer">Timer</Link>
        </div>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Stopwatch} />
            <Route path="/timer" component={Timer} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
