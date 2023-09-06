let rows = 100;
let cols = 26;

let addressColContainer = document.querySelector(".address-col-container");
let addressRowContainer = document.querySelector(".address-row-container");
let cellsContainer = document.querySelector(".cells-container");
let addressBar = document.querySelector(".address-bar");


for(let i = 0; i<rows; i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i+1;
    addressColContainer.appendChild(addressCol);
}
for(let i = 0; i<cols; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowContainer.appendChild(addressRow);
}

for(let row = 0; row < rows; row++){
    let cellRow = document.createElement("div");
    cellRow.setAttribute("class", "cell-row");
    for(let col = 0; col < cols; col++){
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");

        cell.setAttribute("rowId", row);
        cell.setAttribute("colId", col);

        cellRow.appendChild(cell);
        addressBarDisplay(cell, row, col);
    }
    cellsContainer.appendChild(cellRow);
}

function addressBarDisplay(cell, row, col){
    cell.addEventListener('click', (e) => {
        let rowId = row+1;
        let colId = String.fromCharCode(65+col);
        addressBar.value = `${colId}${rowId}`;
    })
}

