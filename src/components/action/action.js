import React from "react";
import { ActionService } from "../../services/listen";

class ActionGame extends React.Component {
  reset = () => {
    ActionService.reset();
  };
  render() {
    return (
      <React.Fragment>
        <button className='btn btn-primary' onClick={() => this.reset()}>Chơi Lại</button>
      </React.Fragment>
    );
  }
}

export default ActionGame;