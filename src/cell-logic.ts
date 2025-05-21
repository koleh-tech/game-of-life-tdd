export class InvalidGameDimensions extends Error {}

export function stateForCell(arg0: number, arg1: never[][]): any {
	throw new InvalidGameDimensions("Invalid game dimensions")
}
