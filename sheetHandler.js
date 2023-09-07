let sheetFolderContainer = document.querySelector(".sheet-folder-container");
let sheetAddBtn = document.querySelector(".sheet-add-icon");

sheetAddBtn.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML = `
        <div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div> 
    `

    sheetFolderContainer.appendChild(sheet);
    sheet.scrollIntoView();

    createSheetDB();
    createGraphComponentMatrix();
    handleActiveSheet(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown", (e) => {
        // checking for right click only
        if(e.button !== 2) return;

        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length === 1){
            alert("Cannot delete, you need atleast one sheet.");
            return;
        }

        let response = confirm("Do you want delete sheet permanently ?");
        if(response === false) return;

        let sheetId = Number(sheet.getAttribute("id"));
        allSheetsDB.splice(sheetId, 1);
        allGraphComponentMatrix.splice(sheetId,  1);

        // make previous sheet active
        let activeIndex = Math.max(0, Number(sheetId - 1));
        handleSheetUIRemoval(sheet, activeIndex);
        sheetDB = allSheetsDB[activeIndex];
        graphComponentMatrix = allGraphComponentMatrix[activeIndex];
        handleSheetProperties();
    })
}

function handleSheetUIRemoval(sheet, activeIndex){
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i<allSheetFolders.length; i++){
        allSheetFolders[i].setAttribute("id", i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerHTML = `Sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor = "transparent";
    }

    allSheetFolders[activeIndex].style.backgroundColor = "#ced6e0";
}
function handleSheetUI(sheet){
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i<allSheetFolder.length; i++){
        allSheetFolder[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "#ced6e0";
}
function handleActiveSheet(sheet){
    sheet.addEventListener("click", (e) => {
        let sheetId = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetId);
        handleSheetProperties(sheetId);
        handleSheetUI(sheet);
    })
}

function handleSheetDB(sheetId){
    sheetDB = allSheetsDB[sheetId];
    graphComponentMatrix = allGraphComponentMatrix[sheetId];
}

function handleSheetProperties(sheetId){
    for(let i = 0; i<rows; i++){
        for(let j = 0; j<cols; j++){
            let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
            cell.click();
        }
    }
    // By default, first cell should be active
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function defaultCellProps(){
    return {
        bold: false,
        italic: false,
        underline: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: "14",
        fontColor: "#000000",
        BGColor: "#ecf0f1",
        value: "",
        formula: "",
        children: []
    };
}
function createSheetDB(){
    let sheetDB = [];

    for(let i = 0; i<rows; i++){
        let sheetRow = [];
        for(let j = 0; j<cols; j++){
            let cellProp = defaultCellProps();
            sheetRow.push(cellProp)
        }
        sheetDB.push(sheetRow);
    }
    allSheetsDB.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphComponentMatrix = [];

    for(let i = 0; i<rows; i++){
        let row = [];
        for(let j = 0; j<cols; j++){
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }

    allGraphComponentMatrix.push(graphComponentMatrix);
}