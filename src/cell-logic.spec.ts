import { describe, expect, test } from "vitest"
import { InvalidGameDimensions, cellsFrom, newStateForCell } from "./cell-logic"

describe("stateForCell", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => cellsFrom([[]])).toThrow(InvalidGameDimensions)
	})

	test("game state flattened to one dimension", () => {
		expect(cellsFrom([[0, 0]]).length).toEqual(2)
	})

	test("returns dead for no live neighbors", () => {
		expect(newStateForCell({ state: 0, neighbors: [] })).toBe(0)
	})
})
