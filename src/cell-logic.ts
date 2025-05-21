export interface Cell {
	state: number
	neighbors: number[]
}

export class InvalidGameDimensions extends Error {}

export function cellsFrom(arg1: never[][]): any {
	if (arg1.length <= 1 && !arg1[0].length) {
		throw new InvalidGameDimensions("Invalid game dimensions")
	}
	return arg1.flat()
}

export function newStateForCell(cell: Cell): any {
	return 0
}
