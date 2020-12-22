function runAstarStep() {

    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].f) {
            winner = i;
        }
    }
    current = openSet[winner];

    if(openSet[winner] == end) {
      return "solution found!"
    }
    removeFromArray(openSet, current)
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i]
        
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
            var tempG = current.g + distance(neighbor, current);

            if (openSet.includes(neighbor)) {
                if (tempG < neighbor.g) {
                    neighbor.g = tempG;
                    neighbor.previous = current;
                }
            } else {
                neighbor.g = tempG;
                neighbor.previous = current;
                openSet.push(neighbor);
            }

            neighbor.h = distance(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;

        }

    }

    if (openSet.length > 0) {
        return "still searching"
    } else {
        return "can't get there!"
    }

}