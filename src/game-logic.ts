import type { Cell } from "./cell-logic"

export class InvalidGameDimensions extends Error {}

export class GameState {
	constructor(private state: number[][]) {}
	enrichGameState(arg1: number[][] = []): Cell[] {
		this.state
		// __AUTO_GENERATED_PRINT_VAR_START__
		console.log("GameState#enrichGameState this.state: %s", this.state) // __AUTO_GENERATED_PRINT_VAR_END__
		if (arg1.length <= 1 && !arg1[0].length) {
			throw new InvalidGameDimensions("Invalid game dimensions")
		}
		const result: Cell[] = []
		for (let i = 0; i < arg1.length; i++) {
			for (let j = 0; j < arg1[i].length; j++) {
				const neighbors: number[] = [
					arg1[i - 1]?.[j - 1],
					arg1[i]?.[j + 1],
					arg1[i - 1]?.[j],
					arg1[i]?.[j - 1],
					arg1[i - 1]?.[j + 1],
					arg1[i + 1]?.[j + 1],
				].filter((n) => n !== undefined)
				result.push({ state: arg1[i][j], neighbors: neighbors })
			}
		}
		return result
	}
}
