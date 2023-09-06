let allGraphComponentMatrix = [];
let graphComponentMatrix = [];

function isGraphCycle(){
    let visited = [], dfsVisited = [];

    for(let i = 0; i<rows; i++){
        let visitedRow = [], dfsVisitedRow = [];
        for(let j = 0; j<cols; j++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }
    for(let i = 0; i<rows; i++){
        for(let j = 0; j<cols; j++){
            if(!visited[i][j]){
                let response = dfsCycleDetection(i, j, visited, dfsVisited);
                if(response) return [i, j];
            }
        }
    }
    return null;
}

function dfsCycleDetection(row, col, visited, dfsVisited){
    visited[row][col] = true;
    dfsVisited[row][col] = true;

    for(let children = 0; children < graphComponentMatrix[row][col].length; children++){
        let [rowId, colId] = graphComponentMatrix[row][col][children];
        if(!visited[rowId][colId]){
            let response = dfsCycleDetection(rowId, colId, visited, dfsVisited);
            if(response) return true; // found cycle
        }
        else if(dfsVisited[rowId][colId]) return true;
    }

    dfsVisited[row][col] = false;
    return false;
}
