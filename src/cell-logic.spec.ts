import { describe, expect, test } from "vitest"
import { InvalidGameDimensions, cellsFrom, newStateForCell } from "./cell-logic"

describe("stateForCell", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => cellsFrom([0, 0], [[]])).toThrow(InvalidGameDimensions)
	})

	test("returns dead for no live neighbors", () => {
		expect(newStateForCell({ state: 0, neighbors: [] })).toBe(0)
	})
})
