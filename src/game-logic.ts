import type { Cell } from "./cell-logic"

export class InvalidGameDimensions extends Error {}

export class GameState {
	constructor(public board: number[][]) {}
}

export function flattenGridIntoCells(grid: number[][]) {
	if (grid.length <= 1 && !grid[0].length) {
		throw new InvalidGameDimensions("Invalid game dimensions")
	}
	const result: Cell[] = []
	for (let row = 0; row < grid.length; row++) {
		for (let column = 0; column < grid[row].length; column++) {
			const neighbors: number[] = [
				grid[row - 1]?.[column - 1],
				grid[row - 1]?.[column],
				grid[row - 1]?.[column + 1],
				grid[row]?.[column - 1],
				grid[row]?.[column + 1],
				grid[row + 1]?.[column - 1],
				grid[row + 1]?.[column],
				grid[row + 1]?.[column + 1],
			].filter((n) => n !== undefined)
			result.push({ state: grid[row][column], neighbors: neighbors })
		}
	}
	return result
}

export function createGameStateFrom(
	cells: Cell[],
	previousGameState: GameState,
) {
	const previousGrid = previousGameState.board
	return new GameState(newCreation(cells, previousGrid))
}

function newCreation(cells: Cell[], previousGrid: number[][]) {
	const numCols = previousGrid[0].length
	const cellStates = cells.map((cell) => cell.state)
	const result = []
	for (let row = 0; row < previousGrid.length; row++) {
		const startOfSlice = row * numCols
		const endOfSlice = (row + 1) * numCols
		result.push(cellStates.slice(startOfSlice, endOfSlice))
	}
	return result
}
