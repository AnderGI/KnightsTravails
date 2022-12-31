class Node {
  constructor(row, col, distanceFromStartingPoint, antecessor) {
    this.row = row;
    this.col = col;
    this.distanceFromStartingPoint = distanceFromStartingPoint;
    this.antecessor = antecessor;
  }
  getPositionString() {
    return `${this.row}, ${this.col}`;
  }
}
function getPossibleMoves(row, col) {
  let possibleMovements = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];
  let moves = [];

  possibleMovements.forEach((movement) => {
    if (
      movement[0] + row >= 1 &&
      movement[0] + row <= 8 &&
      movement[1] + col >= 1 &&
      movement[1] + col <= 8
    )
      moves.push([movement[0] + row, movement[1] + col]);
  });

  return moves;
}
function minimumMoves([strRow, strCol], [dstRow, dstCol]) {
  let queu = [];
  let node = new Node(strRow, strCol, 0, null);
  queu.push(node);
  const visited = new Set();

  while (queu.length > 0) {
    //REMOVE
    let node = queu.shift(); //Would be better to use a Queu class to get the element on O(1) time rather than O(n) time
    const { row, col, distanceFromStartingPoint, antecessor } = node;

    //PROCESS
    if (row === dstRow && col == dstCol) return node;
    visited.add(node.getPositionString());
    //ADD
    for (let neighbour of getPossibleMoves(row, col)) {
      const [r, c] = neighbour;
      const neighbourNode = new Node(r, c, distanceFromStartingPoint + 1, node);
      if (!visited.has(neighbourNode.getPositionString()))
        visited.add(neighbourNode.getPositionString());
      queu.push(neighbourNode);
    }
  }
}

function arrayOfTotalMinimumMoves(node) {
  let totalMinimumMoves = [];
  while (node !== null) {
    totalMinimumMoves.push([node.row, node.col]);
    node = node.antecessor;
  }

  return totalMinimumMoves;
}

//let node = minimumMoves([1, 1], [5, 5])
//console.log(arrayOfTotalMinimumMoves(node))

function createCells() {
  const chessBoard = document.querySelector("div.chess");
  let redTurn = true;
  for (let row = 1; row <= 8; row++) {
    const rowCell = chessBoard.appendChild(document.createElement("div"));
    rowCell.classList.add("row", row);
    for (let col = 1; col <= 8; col++) {
      const colCell = document.createElement("div");
      colCell.classList.add("col", col);
      if (redTurn) {
        if (col % 2 !== 0) colCell.classList.add("dark");
      }

      if (!redTurn) {
        if (col % 2 === 0) colCell.classList.add("dark");
      }

      rowCell.appendChild(colCell);
    }
    redTurn = !redTurn;
  }
}

createCells();

function cellClick() {
  const columnCell = document.querySelectorAll("div.col");
  columnCell.forEach((cell) => {
    cell.textContent = "";
    cell.removeEventListener("click", cellCoor);
    cell.addEventListener("click", cellCoor, { once: true });
  });
}

cellClick();

let firstCoord;
let secondCoord;
let firstB = true;

function cellCoor(e) {
  let cell = e.target;
  const colValue = cell.classList[1];
  const rowValue = cell.parentElement.classList[1];
  const coordinates = [parseInt(rowValue), parseInt(colValue)];
  if (firstB) {
    firstCoord = coordinates;
    cell.textContent = "str";
    firstB = false;
    console.log(firstCoord);
  } else {
    secondCoord = coordinates;
    cell.textContent = "dst";
    console.log(secondCoord);
  }
}

const displayCoordinates = (arrayOfArrays) => {
  //get the selected cells
  //fist get the row from a rows nodeList; access it with an index
  //second get all the cells from those rows and access the
  //correspondig cell with an index
  //use arrayOfSelectedCells as a stack
  let arrayOfSelectedCells = [];
  let firstElement = arrayOfArrays[0];
  let lastElement = arrayOfArrays[arrayOfArrays.length - 1];
  const rows = document.querySelectorAll("div.row");
  arrayOfArrays.forEach((array) => {
    const [row, col] = array;
    arrayOfSelectedCells.push(
      rows[row - 1].querySelectorAll("div.col")[col - 1]
    );
  });

  let counter = 0;
  while (arrayOfSelectedCells.length > 0) {
    let currentCell = arrayOfSelectedCells.pop();
    counter++;
    currentCell.textContent = counter;
  }
  alert(
    `A total ${
      (counter - 1)
    } of moves are needed to go from ${firstElement} to ${lastElement}`
  );
};

document.querySelector("button.travelBtn").addEventListener("click", () => {
  let node = minimumMoves(firstCoord, secondCoord);
  console.log(arrayOfTotalMinimumMoves(node));
  cellClick();
  displayCoordinates(arrayOfTotalMinimumMoves(node));
  firstB = true;
});
