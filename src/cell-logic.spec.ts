import { describe, expect, test } from "vitest"
export class InvalidGameDimensions extends Error {}
describe("stateForCell", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => stateForCell(0, [[]])).toThrow(InvalidGameDimensions)
	})
})

function stateForCell(arg0: number, arg1: never[][]): any {
	throw new InvalidGameDimensions("Invalid game dimensions")
}
