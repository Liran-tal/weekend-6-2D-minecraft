"use strict";

const gameBoard = document.querySelector("#game-board");
const toolBox = document.querySelector("#tool-box");
const inventory = document.querySelector('.inventory');
const INVENTORY_CAPACITY = 8;
let activeTool = undefined;
let activeInventoryMaterial = undefined;
let activeBoardMaterial = undefined;
let inventoryIndexToUse = 0;

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
		[0, 0, 0, 6, 6, 6, 6, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
	const material = target.className;
	console.log(material);
	if (activeTool) {
		if (materialToolMatch[material] === activeTool.dataset.tool) {
			// TODO: check classList vs className for one element
			target.classList.remove(material);
			addToInventory(material);
		}
		else {
			// TODO: make background flash red
		}	
	}
	else if (activeInventoryMaterial && !material) {
		target.classList.add(activeInventoryMaterial.dataset.material);
	}
}

gameBoard.addEventListener('click', gameBoardHandler);

function toolHandler({target}) {
	// const tool = target.dataset.tool;
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

function setSelected(elm) {
	elm.classList.add('in-use');
}

function unSetSelected(elm) {
	elm.classList.remove('in-use');
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
	
function handleInventory() {

	
	
}
	// if (activeTool) {
	// 	unSetSelected(activeTool);
	// }
	// if (target === activeTool){
	// 	activeTool = undefined;
	// 	return;
	// }
	// setSelected(target);
	// activeTool = target;

function addToInventory(material) {
	const first_free_box = materialsInventory.find((item) => {
		return item.dataset.material === '';
	})
	if (first_free_box) {
		first_free_box.classList.add(material);
		first_free_box.dataset.material = material;
	}
	else{
		
	}
}


