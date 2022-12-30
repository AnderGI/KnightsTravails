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
            if(visited.has(neighbour.getPositionString())) continue;
            queu.push(neighbourNode);
        }
    }
}