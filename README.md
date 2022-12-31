# KnightsTravails
The aim of this project was to sum up and use as efficiently as possible the data structures that I've learnt in the 
"A Bit of Computer Science" assigment of the Javascript course from The Odin Project. 

The general idea of the algorithm behind is to have a Node which will have a row and column value, a distanceFromStartingPoint value (0 for the first node and
+1 for each new node) and a antecessor pointer (which will be the reference for the previous move / Node). From the starting position a breadth-first-search will 
occur, in which all the possible moves will be created. Those values will be used to create new Node objects, with a +1 distance value, a reference to the
previous position node and new row and column values depending on their position in the board. The BFS will stop once the destination coordinates and therefore,
destination node has been found. A queu will be used to implement that. Also s Set object is going to be used as a way of keeping track of the visited values.
So the coordinates for each node will be stored inside the set and every time a new move is made, the coordinates of that move will hsve to be inside the set in order
to push that new node into the queu.

Once the destination node has been found the function will return that node. And with it all the reference values to the previous moves / nodes. The nodes coordinates
will be kept inside an array for the front-end.
