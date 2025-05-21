import type { Cell } from "./cell-logic"

export class InvalidGameDimensions extends Error {}

export class GameState {
	constructor(public state: number[][]) {}

	flattened(): Cell[] {
		if (this.state.length <= 1 && !this.state[0].length) {
			throw new InvalidGameDimensions("Invalid game dimensions")
		}
		const result: Cell[] = []
		for (let row = 0; row < this.state.length; row++) {
			for (let column = 0; column < this.state[row].length; column++) {
				const neighbors: number[] = [
					this.state[row - 1]?.[column - 1],
					this.state[row - 1]?.[column],
					this.state[row - 1]?.[column + 1],
					this.state[row]?.[column - 1],
					this.state[row]?.[column + 1],
					this.state[row + 1]?.[column - 1],
					this.state[row + 1]?.[column],
					this.state[row + 1]?.[column + 1],
				].filter((n) => n !== undefined)
				result.push({ state: this.state[row][column], neighbors: neighbors })
			}
		}
		return result
	}

	// static meothod:
	inflate(flattened: Cell[]) {
		return createGameStateFrom(flattened, this.state)
	}
}

export function createGameStateFrom(flattened: Cell[], gameState: GameState) {
	const numCols = gameState.state[0].length
	const cellStates = flattened.map((cell) => cell.state)
	const result = []
	for (let row = 0; row < gameState.state.length; row++) {
		const startOfSlice = row * numCols
		const endOfSlice = (row + 1) * numCols
		result.push(cellStates.slice(startOfSlice, endOfSlice))
	}
	return result
}
