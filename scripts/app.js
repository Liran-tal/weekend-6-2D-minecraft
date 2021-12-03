"use strict";

const gameBoard = document.querySelector("#game-board");
const toolBox = document.querySelector("#tool-box");
const inventory = document.querySelector('.inventory');
const INVENTORY_CAPACITY = 8;

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
				// add style by id
				if (currentPositionId !== 0) {
					block.classList.add(materialArr[currentPositionId]);
				}
				// add to html
				gameBoard.appendChild(block);
			})
		});
// }
		
function toolHandler(target) {
	const tool = target.classList[1];
}
function markSelected(elm) {
	elm.classList.contains('in-use') ? 
}


		// Build inventory
// function createInventory() {
	const num_columns = (INVENTORY_CAPACITY > 15) ? 3 : 2;
	const num_rows = Math.floor(INVENTORY_CAPACITY / num_columns);
	for (let i = 1; i <= num_rows; ++ i){
		for (let j = 1; j <= num_columns; ++ j){
			const item = document.createElement('div');
			item.classList.add("inventory-item");
			inventory.append(item);
		}
	}
	const materialsInventory = [...inventory.children];
// }
	
function editInventory(event) {
	
}

function addToInventory({target}) {
	const first_free_box = materialsInventory.find((div) => {
		div.classList[0] === undefined;
	})

	first_free_box.classList.add(target.classList[0]);
}

toolBox.addEventListener("click" ({}));

gameBoard.addEventListener("click", )
