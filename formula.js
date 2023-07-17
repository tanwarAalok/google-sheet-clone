for(let i = 0; i<rows; i++){
    for(let j = 0; j<cols; j++){
        let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = getActiveCellAndProps(address);
            let enteredData = activeCell.innerText;

            if(enteredData === cellProp.value) return;

            cellProp.value = enteredData;

            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
        })
    }
}

let formulaBar =  document.querySelector('.formula-bar');
formulaBar.addEventListener('keydown', (e) => {
    let inputFormula = formulaBar.value;
    if(e.key === 'Enter' && inputFormula){
        //check if formula is changed
        let address = addressBar.value;
        let [cell, cellProps] = getActiveCellAndProps(address);
        if(inputFormula !== cellProps.formula) removeChildFromParent(inputFormula);

        let evaluatedValue = formulaEvaluator(inputFormula);
        setCellUIAndCellProp(evaluatedValue, inputFormula, address);
        addChildToParent(inputFormula);
        updateChildrenCells(address);
    }
})

function updateChildrenCells(parentAddress){
    let [parentCell, parentCellProp] = getActiveCellAndProps(parentAddress);
    let childrens = parentCellProp.children;

    for(let i = 0; i<childrens.length; i++){
        let childAddress = childrens[i];
        let [childCell, childCellProp] = getActiveCellAndProps(childAddress);
        let childFormula = childCellProp.formula;
        let evaluatedValue = formulaEvaluator(childFormula);
        setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}

function addChildToParent(formula){
    let encodedFormula = formula.split(" ");
    let childAddress = addressBar.value;
    for(let i = 0; i<encodedFormula.length; i++){
        let firstCharASCII = encodedFormula[i].charCodeAt(0);
        if(firstCharASCII >= 65 && firstCharASCII <= 90){
            let [parentCell, parentCellProp] = getActiveCellAndProps(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula){
    let encodedFormula = formula.split(" ");
    let childAddress = addressBar.value;
    for(let i = 0; i<encodedFormula.length; i++){
        let firstCharASCII = encodedFormula[i].charCodeAt(0);
        if(firstCharASCII >= 65 && firstCharASCII <= 90){
            let [parentCell, parentCellProp] = getActiveCellAndProps(encodedFormula[i]);
            parentCellProp.children = parentCellProp.children.filter((child) => child !== childAddress);
        }
    }
}

function formulaEvaluator(formula){
    let encodedFormula = formula.split(" ");
    for(let i = 0; i<encodedFormula.length; i++){
        let firstCharASCII = encodedFormula[i].charCodeAt(0);
        if(firstCharASCII >= 65 && firstCharASCII <= 90){
            let [cell, cellProp] = getActiveCellAndProps(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address){
    let [cell, cellProp] = getActiveCellAndProps(address);
    cell.innerText = evaluatedValue;
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}