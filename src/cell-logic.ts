export interface Cell {
	state: number
	neighbors: number[]
}

export class InvalidGameDimensions extends Error {}

export function cellsFrom(arg0: number, arg1: never[][]): any {
	if (arg1.length <= 1 && !arg1[0].length) {
		throw new InvalidGameDimensions("Invalid game dimensions")
	}
	return 0
}

export function newStateForCell(cell: Cell): any {
	return 0
}
