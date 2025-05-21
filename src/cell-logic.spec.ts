import { describe, expect, test } from "vitest"
import { InvalidGameDimensions, stateForCell } from "./cell-logic"

describe("stateForCell", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => stateForCell([0, 0], [[]])).toThrow(InvalidGameDimensions)
	})

	test("returns dead for no live neighbors", () => {
		expect(stateForCell([0, 0], [[0]])).toBe(0)
	})
})
