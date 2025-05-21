import type { Cell } from "./cell-logic"

export class InvalidGameDimensions extends Error {}

export class GameState {
	constructor(private state: number[][]) {}
	enrichGameState(): Cell[] {
		if (this.state.length <= 1 && !this.state[0].length) {
			throw new InvalidGameDimensions("Invalid game dimensions")
		}
		const result: Cell[] = []
		for (let i = 0; i < this.state.length; i++) {
			for (let j = 0; j < this.state[i].length; j++) {
				const neighbors: number[] = [
					this.state[i - 1]?.[j - 1],
					this.state[i - 1]?.[j],
					this.state[i - 1]?.[j + 1],
					this.state[i]?.[j - 1],
					this.state[i]?.[j + 1],
					this.state[i + 1]?.[j - 1],
					this.state[i + 1]?.[j],
					this.state[i + 1]?.[j + 1],
				].filter((n) => n !== undefined)
				result.push({ state: this.state[i][j], neighbors: neighbors })
			}
		}
		return result
	}
}
