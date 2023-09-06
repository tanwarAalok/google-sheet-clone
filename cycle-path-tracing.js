
async function traceCyclicPath(cycleResponse){
    let [source_row, source_col] = cycleResponse;
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
    let response = await dfs(source_row, source_col, visited, dfsVisited);
    return Promise.resolve(response);

}

function colorPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}

async function dfs(row, col, visited, dfsVisited){
    visited[row][col] = true;
    dfsVisited[row][col] = true;

    let cell = document.querySelector(`.cell[rowId="${row}"][colId="${col}"]`);
    cell.style.backgroundColor = "lightblue";
    await colorPromise(); // wait for 1 sec

    for(let children = 0; children < graphComponentMatrix[row][col].length; children++){
        let [rowId, colId] = graphComponentMatrix[row][col][children];
        if(!visited[rowId][colId]){
            let response = await dfs(rowId, colId, visited, dfsVisited);
            if(response) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
            }
        }
        else if(dfsVisited[rowId][colId]) {
            let cyclicCell = document.querySelector(`.cell[rowId="${rowId}"][colId="${colId}"]`);
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();

            cyclicCell.style.backgroundColor = "transparent";
            await colorPromise();

            cell.style.backgroundColor = "transparent";
            await colorPromise();

            return Promise.resolve(true);
        }
    }

    dfsVisited[row][col] = false;
    return Promise.resolve(false);
}
