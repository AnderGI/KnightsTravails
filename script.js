class Node {
    constructor(row, col, distanceFromStartingPoint, antecessor){
        this.row = row;
        this.col = col;
        this.distanceFromStartingPoint = distanceFromStartingPoint;
        this.antecessor = antecessor;
    }
    getPositionString() {
        return `${this.row}, ${this.col}`;
    }
}
function getPossibleMoves(row, col){
    let possibleMovements = [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2]
    ]
    let moves = [];

    possibleMovements.forEach(movement => {
        if(movement[0] + row >= 1 && movement[0] + row <= 8 && 
            movement[1] + col >= 1 && movement[1] + col <= 8) moves.push([movement[0] + row, movement[1] + col]);

    })

    return moves;
}
function minimumMoves([strRow, strCol], [dstRow, dstCol]){
    let queu = [];
    let node = new Node(strRow, strCol, 0, null);
    queu.push(node);
    const visited = new Set();

    while(queu.length > 0){
        //REMOVE
        let node = queu.shift() //Would be better to use a Queu class to get the element on O(1) time rather than O(n) time
        const {row, col, distanceFromStartingPoint, antecessor} = node;

        //PROCESS
        if(row === dstRow && col == dstCol) return node;
        visited.add(node.getPositionString())
        //ADD
        for(let neighbour of getPossibleMoves(row, col)){
            const [r, c] = neighbour;
            const neighbourNode = new Node(r, c, distanceFromStartingPoint + 1, node);
            if(!(visited.has(neighbourNode.getPositionString()))) visited.add(neighbourNode.getPositionString());
            queu.push(neighbourNode);
        }
    }
}

function arrayOfTotalMinimumMoves(node){
    let totalMinimumMoves = [];
    while(node !== null){
        totalMinimumMoves.push([node.row, node.col]);
        node = node.antecessor;
    }

    return totalMinimumMoves;
}

let node = minimumMoves([1, 1], [5, 5])
console.log(arrayOfTotalMinimumMoves(node))


function createCells(){
    const chessBoard = document.querySelector("div.chess");
    for(let row = 1; row <= 8; row++ ){
        const rowCell = chessBoard.appendChild(document.createElement("div"));
        for(let col = 1; col <= 8; col++){
            const colCell = document.createElement('div');
            rowCell.appendChild(colCell)
            
        }
    }

}

createCells();