import React from "react";
import "./border.scss";
import chunk from "lodash.chunk";
import Cells from "./cells";
import { ListenService, ActionService, CounterService } from "../../services/listen";
import { CellService } from "../../services/cell";

class Border extends React.Component {
  array = [];
  board_ = "";
  columns = 9;

  constructor() {
    super();
    this.initBoard();
    return;
  }
 //   if (i % 9 === 0) {
  //       k++;
  //       this.array[k] = [];
  //   }
  //   this.array[k].push(0);  // for (var i = 0, k = -1; i < 81; i++) {

    componentDidMount() {
      let self = this;
  
      ListenService.onChangeValue().subscribe(data => {
        self.array[data.i][data.j].curr = data.value;
        CellService.checkConflicts(self.array);
        self.counterNumbers();
        self.setState({});
      });
  
      ActionService.onReset().subscribe(data => {
        if (data.action === "reset") {
          return this.reset();
        }
        if (data.action === "rePlay") {
          return this.rePlay();
        }
        if (data.action === "counter") {
          return this.counterNumbers();
        }
      });
    }
  
    rePlay = () => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          this.array[i][j].curr = this.array[i][j].org;
        }
      }
  
      CellService.resetCells();
      CellService.showSelecting();
      this.setState({});
    };
  
    reset = () => {
      CellService.resetCells();
      this.initBoard();
      this.counterNumbers();
      this.setState({});
    };
  
    counterNumbers = () => {
      let nums = {};
      for(var i=0; i<this.columns; i++) {
        for(var j=0; j<this.columns; j++) {
          let value = this.array[i][j].curr;
          if (value > 0) {
            nums[value] = nums.hasOwnProperty(value) ? nums[value] + 1 : 1;
          }
        }
      }
  // for (let i = 0; i < 81; i++) {
  //   let value = this.board_[i];
  //   if (value > 0) {
  //     nums[value] = nums.hasOwnProperty(value) ? nums[value] + 1 : 1;
  //   }
  // }
  console.log(nums)
  CounterService.changeCounter(nums);
};

initBoard = () => {
  this.array = [];
  this.board_ = CellService.getCellsLevel("easy");
  let board = this.board_;
  for (let i = 0; i < 81; i++) {
    if (board[i] === "0") {
      this.array.push({
        org: null,
        curr: null,
        hasConflict: false
      });
    } else {
      this.array.push({
        org: parseInt(board[i]),
        curr: parseInt(board[i]),
        hasConflict: false
      });
    }
  }
  this.array = chunk(this.array, 9);
};

render() {
  return (
    <React.Fragment>
      <div className="board">
        <table>
          <tbody>
            {this.array.map(function(line, i) {
              return <Cells key={i} line={line} row={i} />;
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
}

export default Border;
