import type { Cell } from "./cell-logic"

export class InvalidGameDimensions extends Error {}

export function cellsFrom(arg1: number[][]): Cell[] {
	if (arg1.length <= 1 && !arg1[0].length) {
		throw new InvalidGameDimensions("Invalid game dimensions")
	}
	const result: Cell[] = []
	arg1.forEach((row) => {
		return row.forEach((cell) => {
			return result.push({ state: cell, neighbors: [] })
		})
	})
	return result
}
