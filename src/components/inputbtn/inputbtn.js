import React from "react";
import "./inputbtn.scss";
import chunk from "lodash.chunk";
import { RequestService, ListenService, ActionService, CounterService } from "../../services/listen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes, faRandom } from "@fortawesome/free-solid-svg-icons";
import { CellService } from "../../services/cell";

class InputBtn extends React.Component {
  // board = "1234567890";
  // array = [];
  // constructor() {
  //   super();
  //   for (let i = 0; i < 10; i++) {
  //     this.array.push(parseInt(this.board[i]));
  //   }
  //   this.array = chunk(this.array, 5);
  //   console.log(this.array);
  // }
  cells = chunk(new Array(12).fill(""), 6);
  request_i = -1;
  request_j = -1;
  columns = 6;

  componentDidMount() {
    RequestService.onRequest().subscribe(data => {
      this.request_i = data.i;
      this.request_j = data.j;
    });

    ActionService.onReset().subscribe(data => {
      if (data.action === "reset" || data.action === "rePlay") {
        this.request_i = -1;
        this.request_j = -1;
      }
    });
    CounterService.onCounter().subscribe(data => {
      Object.keys(data.nums).forEach(function(key, index) {
        let total = `total${key}`;
        document.getElementById(total).innerHTML = data.nums[key];
      });
    });
    ActionService.counter();
  }

  onclick = (e, row, column) => {
    e.preventDefault();
    e.stopPropagation();
    e.persist();
    let value = this.columns * row + column + 1;

    if (value === 10) {
      return ActionService.reset();
    }

    if (value === 12) {
      return ActionService.rePlay();
    }

    if (this.request_i === -1 && this.request_j === -1) {
      CellService.showSelecting(value);
      return;
    }

    let data = {
      i: this.request_i,
      j: this.request_j,
      value: value > 9 ? "" : value
    };
    CellService.showSelecting(value);
    ListenService.setValue(data.value, data.i, data.j);
  };

  showValue = value => {
    if (value < 10) {
      return value;
    }
    switch (value) {
      case 10:
        return <FontAwesomeIcon icon={faRandom} />;
      case 11:
        return <FontAwesomeIcon icon={faCircle} className="color-blue" />;
      default:
        return <FontAwesomeIcon icon={faTimes} />;
    }
  };

  create_td = (row, column) => {
    let self = this;
    let value = this.columns * row + column + 1;
    let tdID = `cell-${value}`;
    return (
      <td key={column} id={tdID} onClick={e => self.onclick(e, row, column)}>
        {this.showValue(value)}
        <div id={`total${value}`} className="total" />
      </td>
    );
  };

  create_tr = (line, row) => {
    let self = this;
    return (
      <tr key={row}>
        {line.map(function(cell, column) {
          return self.create_td(row, column);
        })}
      </tr>
    );
  };
  create_cells = () => {
    let self = this;
    return this.cells.map(function(line, row) {
      return self.create_tr(line, row);
    });
  };
  // sendValue = (e, row, column) => {
  //   console.log(row,column);
  // }
  render() {
    return (
      <React.Fragment>
        <div className="inputbtn">
          <table>
            <tbody>
              {/* {this.array.map(function(line, i) {
              return (
                <tr key={i}>
                  {line.map(function(cell, j) {
                    return <td key={j}>{cell === 0 ? "" : cell}</td>;
                  })}
                </tr>
              );
            })} */}
              {/* {this.cells.map(function(line, row) {
                return (
                  <tr key={row}>
                    {line.map(function(cell, column) {
                      return (
                        <td key={column} onClick={e => self.onClick(e, row, column)}>
                          {5 * row + column + 1 > 9 ? 'C' : 5 * row + column + 1}
                        </td>
                      );
                    })}
                  </tr>
                );
              })} */}
              {this.create_cells()}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default InputBtn;
