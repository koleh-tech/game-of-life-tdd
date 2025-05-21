export class InvalidGameDimensions extends Error {}

export function stateForCell(arg0: number, arg1: never[][]): any {
	if (arg1.length <= 1 && !arg1[0].length) {
		throw new InvalidGameDimensions("Invalid game dimensions")
	}
	return 0
}
