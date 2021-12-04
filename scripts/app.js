"use strict";

const gameBoard = document.querySelector("#game-board");
const toolBox = document.querySelector("#tool-box");
const inventory = document.querySelector('.inventory');
const INVENTORY_CAPACITY = 8;
const messageBox = document.querySelector('.message-box');
const messageBoxText = document.querySelector('.message-box-text');
const messageBoxButton = document.querySelector('.message-box-btn');

let activeTool = undefined;
let activeInventoryMaterial = undefined;
let activeBoardMaterial = undefined;
let inventoryOccupied = 0;

// const gameElements = {
// 	const gameBoard = document.querySelector("#game-board");
// 	const inventory = document.querySelector('.inventory');
// 	const INVENTORY_CAPACITY = 8;
// 	const materialArr = [
// 		null,
// 		"tree",
// 		"leaves",
// 		"rock",
// 		"ground",
// 		"grass",
// 		"cloud"
// 	]
	
// }

const materialArr = [
	null,
	"tree",
	"leaves",
	"rock",
	"ground",
	"grass",
	"cloud"
]

const materialToolMatch = {
	"tree": 'axe',
	"leaves": 'axe',
	"rock": 'pickaxe',
	"ground": 'shovel',
	"grass": 'shovel',
	"cloud": ''
}

// function createMatrix(columns, rows) {
	const gameBoardMatrix = [
		//21*21
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 6, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 2, 2, 0, 0, 3, 3, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 2, 2, 0, 0, 3, 3, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	];
	// return gameBoardMatrix;
	// }
	
	// *** Build game board ***

// function setGameBoard(columns, rows) {
	// gameBoardMatrix = createMatrix(columns, rows);
	// runs on each row
	gameBoardMatrix.forEach((row, yIndex) => {
		// runs on each column
		row.forEach((column, xIndex) => {
			// save current position id
			const currentPositionId = gameBoardMatrix[yIndex][xIndex];
			// create a block
			const block = document.createElement("div");
			// add style by id as both class and data
			if (currentPositionId !== 0) {
				block.classList.add(materialArr[currentPositionId]);
				block.dataset.material = materialArr[currentPositionId];
			}
			// set data for xIndex and yIndex
			block.dataset.xIndex = xIndex;
			block.dataset.yIndex = yIndex;
			// add to html
			gameBoard.appendChild(block);
		})
	});
// }

function gameBoardHandler({target}){
	if (target !== gameBoard) {
		const material = target.dataset.material;
		if (activeTool) {
			if (materialToolMatch[material] === activeTool.dataset.tool) {
				extractMaterial(target, material)
			}
			else if (isNotMessageBox(target)){
				blinkWrongTool(activeTool);
			}	
		}
		else if (activeInventoryMaterial && !material) {
			target.classList.add(activeInventoryMaterial.dataset.material);
			target.dataset.material = activeInventoryMaterial.dataset.material;
			removeFromInventory();
		}
	}
}

function isNotMessageBox(target) {
	return (target !== messageBox &&
			target !== messageBoxText && 
			target !== messageBoxButton);
}

function extractMaterial(block, material) {
	if (inventoryOccupied < INVENTORY_CAPACITY) {
		block.classList.remove(material);
		block.dataset.material = '';
		addToInventory(material);
	}
	else {
		messageInventoryFull()
	}
}

gameBoard.addEventListener('click', gameBoardHandler);

function toolHandler({target}) {
	if (target !== toolBox){
		if (activeInventoryMaterial) {
			unSetSelected(activeInventoryMaterial);
			activeInventoryMaterial = undefined;
		}
		if (activeTool) {
			unSetSelected(activeTool);
		}
		if (target === activeTool){
			activeTool = undefined;
			return;
		}
		setSelected(target);
		activeTool = target;
	}
}

function setSelected(elm) {
	elm.classList.add('in-use');
}

function unSetSelected(elm) {
	elm.classList.remove('in-use');
}

function blinkWrongTool(tool) {
	setTimeout(() => {
		tool.style.backgroundColor = 'red';
	}, 0);
	setTimeout(function() {
		tool.style.backgroundColor = 'blue';
	}, 150);
}

toolBox.addEventListener('click', toolHandler);


		// Build inventory
// function createInventory() {
	const materialsInventory = []; // experimental
	const num_columns = (INVENTORY_CAPACITY > 15) ? 3 : 2;
	const num_rows = Math.floor(INVENTORY_CAPACITY / num_columns);
	for (let yIndex = 1; yIndex <= num_rows; ++ yIndex){
		for (let xIndex = 1; xIndex <= num_columns; ++ xIndex){
			const item = document.createElement('div');
			item.classList.add("inventory-item");
			item.dataset.material = '';
			item.dataset.xIndex = xIndex;
			item.dataset.yIndex = yIndex;
			materialsInventory.push(item);
			inventory.append(item);
		}
	}
	// const materialsInventory = [...inventory.children];
// }
	
function handleInventory({target}) {
	if (target !== inventory){
		if (activeTool) {
			unSetSelected(activeTool);
			activeTool = undefined;
		}
		if (activeInventoryMaterial) {
			unSetSelected(activeInventoryMaterial);
		}
		if (target === activeInventoryMaterial){
			activeInventoryMaterial.dataset.material = undefined;
			return;
		}
		setSelected(target);
		activeInventoryMaterial = target;
	}	
}

function addToInventory(material) {
	const first_free_box = materialsInventory.find((item) => {
		return item.dataset.material === '';
	})
	first_free_box.classList.add(material);
	first_free_box.dataset.material = material;
	++ inventoryOccupied;
}

function removeFromInventory() {
	unSetSelected(activeInventoryMaterial);
	activeInventoryMaterial.classList.remove(activeInventoryMaterial.dataset.material);
	activeInventoryMaterial.dataset.material = ''
	activeInventoryMaterial = undefined;
	-- inventoryOccupied;
}



inventory.addEventListener('click', handleInventory);

messageBoxButton.addEventListener('click', () => {
	messageBox.classList.add('hide');
})

function messageInventoryFull() {
	messageBox.classList.remove('hide');
	messageBoxText.innerText = "Inventory Full";
}

