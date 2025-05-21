import type { Cell } from "./cell-logic"

export class InvalidGameDimensions extends Error {}

export class GameState {
	nextGeneration() {
		const halfway = this.enrichGameState().map((cell) =>
			this.statusChecker(cell),
		)
		const numRows = this.state.length
		const numColumns = this.state[0].length
		const result = []
		for (let row = 0; row < numRows; row++) {
			const sliceOfHalfway = halfway.slice(
				row * numColumns,
				(row + 1) * numColumns,
			)
			result.push(sliceOfHalfway)
		}

		return result
	}
	constructor(
		private state: number[][],
		private statusChecker: (cell: Cell) => number,
	) {}
	enrichGameState(): Cell[] {
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
}
