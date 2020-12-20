import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Border from "./components/border/border";
import InputBtn from "./components/inputbtn/inputbtn";
import TimerComponent from "./components/timer/timer";

function App() {
  return (
    <div className="App">
      <div className="left-container">
        <TimerComponent />
      </div>
      <div className="left-container">
        <Border />
        <InputBtn />
      </div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
