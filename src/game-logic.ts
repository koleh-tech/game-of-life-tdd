import type { Cell } from "./cell-logic"

export class InvalidGameDimensions extends Error {}

export class GameState {
	constructor(
		private state: number[][],
		private statusChecker: (cell: Cell) => number,
	) {}

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
		const halfway = flattened.map((cell) => this.statusChecker(cell))
		return createGameStateFrom(halfway, this.state)

		const result = []
		for (let row = 0; row < this.state.length; row++) {
			const startOfSlice = row * this.state[0].length
			const endOfSlice = (row + 1) * this.state[0].length
			result.push(halfway.slice(startOfSlice, endOfSlice))
		}
		return result
	}
}

function createGameStateFrom(flattened: number[], state) {
	const halfway = flattened

	const result = []
	for (let row = 0; row < state.length; row++) {
		const startOfSlice = row * state[0].length
		const endOfSlice = (row + 1) * state[0].length
		result.push(halfway.slice(startOfSlice, endOfSlice))
	}
	return result
}
