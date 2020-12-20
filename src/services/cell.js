import { easy } from "./levels/easy";
import { medium } from "./levels/medium";
import { hard } from "./levels/hard";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomBoardFor(array) {
  var idx = randomIntFromInterval(0, array.length - 1);
  return array[idx];
}

export const CellService = {
  getCellsLevel: function(difficulty) {
    switch (difficulty) {
      case "medium":
        return getRandomBoardFor(medium);
      case "hard":
        return getRandomBoardFor(hard);
      default:
        return getRandomBoardFor(easy);
    }
  },
  resetCells: function() {
    let elements = document.querySelectorAll(".select");
    elements.forEach(element => {
      element.classList.remove("select");
    });

    if (document.getElementsByClassName("selected").length > 0) {
      document
        .getElementsByClassName("selected")[0]
        .classList.remove("selected");
    }
    this.showSelecting()
  },
  checkConflicts: function(cells) {
    let line = [];
    console.log(cells);
  },
  showSelecting: function(value) {
    let selectClass = "bgSelecting";

    let elements = document.querySelectorAll(`.${selectClass}`);
    elements.forEach(element => {
      element.classList.remove(selectClass);
    });

    if (value === undefined) {
      return;
    }

    document.getElementById(`cell-${value}`).classList.add(selectClass);
    elements = document.querySelectorAll(`.cell-${value}`);
    elements.forEach(element => {
      element.classList.add(selectClass);
    });
  }
};
