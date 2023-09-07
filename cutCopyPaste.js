let ctrlKey;

document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
})
document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
})

for(let i = 0; i<rows; i++){
    for(let j = 0; j<cols; j++){
        let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
        handleSelectedCells(cell);
    }
}

let rangeStorage = [];
let copyBtn = document.querySelector(".copy");
let pasteBtn = document.querySelector(".paste");
let cutBtn = document.querySelector(".cut");

let copyData = [];
copyBtn.addEventListener('click', (e) => {
    if(rangeStorage.length === 0) {
        alert("Select at least one cells");
        return;
    }
    copyData = [];

    if(rangeStorage.length === 1){
        let rid = rangeStorage[0][0], cid = rangeStorage[0][1];
        copyData.push([sheetDB[rid][cid]]);
    }
    else{
        let {start_rid, start_cid, end_rid, end_cid} = getStartEndRange();

        for(let i = start_rid; i <= end_rid; i++) {
            let rowData = [];
            for (let j = start_cid; j <= end_cid; j++) {
                rowData.push(sheetDB[i][j]);
            }
            copyData.push(rowData);
        }
    }
    console.log(copyData);

    defaultSelectedCellsUI();
    rangeStorage = [];
});

pasteBtn.addEventListener('click', (e) => {
    if(copyData.length === 0) {
        alert("Nothing to copy");
        return;
    }

    let address = addressBar.value;
    let [start_rowId, start_colId] = decodeRowIdColId(address);

    for(let i = 0; i < copyData.length; i++){
        for(let j = 0; j < copyData[0].length; j++){
            let rid = i + start_rowId, cid = j + start_colId;
            updateCellProps(rid, cid, copyData[i][j]);
        }
    }
    copyData = [];
})

cutBtn.addEventListener('click', (e) => {
    if(rangeStorage.length === 0) {
        alert("Select at least one cells");
        return;
    }

    copyData = [];

    if(rangeStorage.length === 1){
        let rid = rangeStorage[0][0], cid = rangeStorage[0][1];
        copyData.push([sheetDB[rid][cid]]);
        updateCellProps(rid, cid, defaultCellProps());
    }
    else{
        let {start_rid, start_cid, end_rid, end_cid} = getStartEndRange();

        for(let i = start_rid; i <= end_rid; i++) {
            let rowData = [];
            for (let j = start_cid; j <= end_cid; j++) {
                rowData.push(sheetDB[i][j]);
                updateCellProps(i, j, defaultCellProps());
            }
            copyData.push(rowData);
        }
    }

    defaultSelectedCellsUI();
    rangeStorage = [];
})

function updateCellProps(rowId, colId, newCellProps){
    let cell = document.querySelector(`.cell[rowId="${rowId}"][colId="${colId}"]`);
    if(!cell) {
        console.log("Cell out of bound");
        return;
    }
    sheetDB[rowId][colId] = newCellProps;
    updateCellPropsUI(cell, newCellProps);
}

function handleSelectedCells(cell){
    cell.addEventListener("click", (e) => {
        if(!ctrlKey) return;
        if(rangeStorage.length >= 2) {
            defaultSelectedCellsUI();
            rangeStorage = [];
        }

        cell.style.border = "2px dashed #44a6c6"

        let rowId = Number(cell.getAttribute('rowId'));
        let colId = Number(cell.getAttribute('colId'));

        rangeStorage.push([rowId, colId]);

        if(rangeStorage.length === 2){
            let {start_rid, start_cid, end_rid, end_cid} = getStartEndRange();

            for(let i = start_rid; i <= end_rid; i++){
                for(let j = start_cid; j <= end_cid; j++){
                    let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
                    cell.style.border = "1px solid #dfe4ea";

                    if(i === start_rid) cell.style.borderTop = "2px dashed #44a6c6";
                    if(i === end_rid) cell.style.borderBottom = "2px dashed #44a6c6";
                    if(j === start_cid) cell.style.borderLeft = "2px dashed #44a6c6";
                    if(j === end_cid) cell.style.borderRight = "2px dashed #44a6c6";
                }
            }
        }
    })
}

function defaultSelectedCellsUI(){
    let {start_rid, start_cid, end_rid, end_cid} = getStartEndRange();

    for(let i = start_rid; i <= end_rid; i++){
        for(let j = start_cid; j <= end_cid; j++){
            let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
            cell.style.border = "1px solid #dfe4ea";
        }
    }
}

function getStartEndRange(){
    let start_rid,start_cid, end_rid, end_cid;
    if(rangeStorage.length === 1){
        start_rid = rangeStorage[0][0];
        start_cid = rangeStorage[0][1];
        end_rid = rangeStorage[0][0];
        end_cid = rangeStorage[0][1];
    }
    else {
        start_rid = Math.min(rangeStorage[0][0], rangeStorage[1][0]);
        start_cid = Math.min(rangeStorage[0][1], rangeStorage[1][1]);
        end_rid = Math.max(rangeStorage[0][0], rangeStorage[1][0]);
        end_cid = Math.max(rangeStorage[0][1], rangeStorage[1][1]);
    }
    return {start_rid, start_cid, end_rid, end_cid}
}