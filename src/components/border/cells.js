import React from "react";
import Cell from "./cell";

class Cells extends React.Component {
  constructor(props) {
    super(props);
    return;
  }
  drawLine = (line, row) => {
    return line.map(function(cell, column) {
      return (
      <Cell key={column} cell={cell.org} value={cell.curr} row={row} column={column}></Cell>
      )
    });
  };
  render() {
    return (
      <React.Fragment>
        <tr key={this.props.row}>
          {this.drawLine(this.props.line, this.props.row)}
        </tr>
      </React.Fragment>
    );
  }
}
export default Cells;
