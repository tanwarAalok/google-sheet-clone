// Storage
let allSheetsDB = [];
let sheetDB = [];

{
    let sheetAddBtn = document.querySelector(".sheet-add-icon");
    sheetAddBtn.click();
}

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".bg-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let activeColorProp = "#d1d8e0";
let inactiveColorProp =  "#ecf0f1";

// Attach Property listeners
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProps(address);

    //Modification
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})
italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProps(address);

    //Modification
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp
})
underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProps(address);

    //Modification
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "unset";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp
})
fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProps(address);

    //Modification
    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})
fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProps(address);

    //Modification
    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})
fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProps(address);

    //Modification
    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})
BGColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndProps(address);

    //Modification
    cellProp.BGColor = BGColor.value;
    cell.style.backgroundColor = cellProp.BGColor;
    BGColor.value = cellProp.BGColor;
})
alignment.forEach((alignElem) => {
    alignElem.addEventListener('click', (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getActiveCellAndProps(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;
        cell.style.textAlign = cellProp.alignment;
        switch (alignValue){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

let allCells = document.querySelectorAll(".cell");
for(let i = 0; i<allCells.length; i++){
    defaultCellProperties(allCells[i]);
}

function defaultCellProperties(cell){
    cell.addEventListener('click', (e) => {
        let address = addressBar.value;
        let [rowId, colId] = decodeRowIdColId(address);
        let cellProp = sheetDB[rowId][colId];
        updateCellPropsUI(cell, cellProp);
    })
}

function updateCellPropsUI(cell, cellProp){
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "unset";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.BGColor;
    cell.style.textAlign = cellProp.alignment;

    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp
    fontSize.value = cellProp.fontSize;
    fontColor.value = cellProp.fontColor;
    fontFamily.value = cellProp.fontFamily;
    BGColor.value = cellProp.BGColor;
    switch (cellProp.alignment){
        case "left":
            leftAlign.style.backgroundColor = activeColorProp;
            centerAlign.style.backgroundColor = inactiveColorProp;
            rightAlign.style.backgroundColor = inactiveColorProp;
            break;
        case "center":
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = activeColorProp;
            rightAlign.style.backgroundColor = inactiveColorProp;
            break;
        case "right":
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = inactiveColorProp;
            rightAlign.style.backgroundColor = activeColorProp;
            break;
    }

    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.formula;
    cell.innerText = cellProp.value;
}

function getActiveCellAndProps(address){
    let [rowId, colId] = decodeRowIdColId(address);

    //Access cell and storage object
    let cell = document.querySelector(`.cell[rowId="${rowId}"][colId="${colId}"]`);
    let cellProp = sheetDB[rowId][colId];
    return [cell, cellProp];
}

function decodeRowIdColId(address){
    // address -> A1
    let rowId = Number(address.slice(1) - 1); //"1" -> 0
    let colId = Number(address.charCodeAt(0)) - 65; // "A" -> 0
    return [rowId, colId];
}

