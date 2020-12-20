import React from "react";
import { RequestService, ActionService } from "../../services/listen";
import { CellService } from "../../services/cell";

//import { ListenService } from "../services/listen";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    return;
  }
  disableClass = cell => {
    return cell === null ? "" : "disabled";
  };
  generateClass = (cell, i, j) => {
    let cellClass = ''
    if (cell !== null) {
      cellClass = `cell-${cell}`
    }
    return `r${i}${j} i${j} j${i} ${cellClass} ${this.disableClass(cell)}`;
  };
  addSelectClass = position => {
    let elements = document.querySelectorAll(position);
    elements.forEach(element => {
      element.classList.add("select");
    });
  };

  clearSelectClass = () => {
    let elements = document.querySelectorAll(".select");
    elements.forEach(element => {
      element.classList.remove("select");
    });
  };
  onclick = (e, cell, row, column) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    e.persist();

    if (cell !== null) {
      return;
    }
    //console.log(cell, row, column);
    if (document.getElementsByClassName("select").length > 0) {
      CellService.resetCells()
    }
  
    this.addSelectClass(`.i${column}`);
    this.addSelectClass(`.j${row}`);
    document
      .getElementsByClassName(`i${column} j${row}`)[0]
      .classList.add("selected");

    RequestService.requestNumber(row,column);
  };
componentDidMount(){
  let self = this
  ActionService.onReset().subscribe(data => {
    if(data.action === 'reset') {
      self.clearSelectClass();
      document
      .getElementsByClassName("selected")[0]
      .classList.remove("selected");

    }
  })
}
  render() {
    return (
      <React.Fragment>
        <td
          key={this.props.column}
          className={this.generateClass(
            this.props.cell,
            this.props.row,
            this.props.column
          )}
          onClick={e =>
            this.onclick(e, this.props.cell, this.props.row, this.props.column)
          }
        >
          {this.props.value}
        </td>
      </React.Fragment>
    );
  }
}
export default Cell;
