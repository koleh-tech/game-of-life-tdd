import type { Cell } from "./cell-logic"

export class InvalidGameDimensions extends Error {}

export class GameState {
	constructor(public board: number[][]) {}

	flatten(): Cell[] {
		if (this.board.length <= 1 && !this.board[0].length) {
			throw new InvalidGameDimensions("Invalid game dimensions")
		}
		const result: Cell[] = []
		for (let row = 0; row < this.board.length; row++) {
			for (let column = 0; column < this.board[row].length; column++) {
				const neighbors: number[] = [
					this.board[row - 1]?.[column - 1],
					this.board[row - 1]?.[column],
					this.board[row - 1]?.[column + 1],
					this.board[row]?.[column - 1],
					this.board[row]?.[column + 1],
					this.board[row + 1]?.[column - 1],
					this.board[row + 1]?.[column],
					this.board[row + 1]?.[column + 1],
				].filter((n) => n !== undefined)
				result.push({ state: this.board[row][column], neighbors: neighbors })
			}
		}
		return result
	}
}

export function createGameStateFrom(cells: Cell[], gameState: GameState) {
	const numCols = gameState.board[0].length
	const cellStates = cells.map((cell) => cell.state)
	const result = []
	for (let row = 0; row < gameState.board.length; row++) {
		const startOfSlice = row * numCols
		const endOfSlice = (row + 1) * numCols
		result.push(cellStates.slice(startOfSlice, endOfSlice))
	}
	return new GameState(result)
}
