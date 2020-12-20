import React from "react";
import "./timer.scss";
import moment from "moment/moment.js";

class TimerComponent extends React.Component {
  positions = ["h1", "h2", ":", "m1", "m2", ":", "s1", "s2"];

  constructor() {
    super();
    return;
  }

  componentDidMount() {
    this.updateTime();
  }

  clearOldTimeByDiv = (el) => {
    let element = document.getElementById(el)
    let classes = element.classList;
    classes.forEach(function(className, index) {
      element.classList.remove(className);
    });
  }

  clearOldTime = () => {
    let self = this
    this.positions.forEach(function(position, index) {
      if(position !== ':') {
        self.clearOldTimeByDiv(position)
      }
    })
  };

  updateTime = () => {
    let digit_to_name = "zero one two three four five six seven eight nine".split(
      " "
    );
    let now = moment().format("hhmmss");
    this.clearOldTime();
    document.getElementById("h1").classList.add(digit_to_name[now[0]]);
    document.getElementById("h2").classList.add(digit_to_name[now[1]]);
    document.getElementById("m1").classList.add(digit_to_name[now[2]]);
    document.getElementById("m2").classList.add(digit_to_name[now[3]]);
    document.getElementById("s1").classList.add(digit_to_name[now[4]]);
    document.getElementById("s2").classList.add(digit_to_name[now[5]]);
    setTimeout(this.updateTime, 1000);
  };

  createDiv = (position, index) => {
    let d = new Array(7).fill("");
    if (position === ":") {
      return <div key={index} className="dots" />;
    }
    return (
      <div id={position} key={index}>
        {d.map(function(v_, index) {
          return (
            <span key={`${position}${index}`} className={`d${index + 1}`} />
          );
        })}
      </div>
    );
  };

  createPosElement = () => {
    let self = this;
    return this.positions.map(function(position, index) {
      return self.createDiv(position, index);
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="clock" className="digital-clock digits">
          {this.createPosElement()}
        </div>
      </React.Fragment>
    );
  }
}

export default TimerComponent;
