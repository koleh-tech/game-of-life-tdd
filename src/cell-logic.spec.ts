import { describe, expect, test } from "vitest"
import {
	InvalidGameDimensions,
	cellsFrom,
	newStateForCell,
	type Cell,
} from "./cell-logic"

describe("stateForCell", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => cellsFrom([[]])).toThrow(InvalidGameDimensions)
	})

	test("game state flattened to one dimension", () => {
		expect(cellsFrom([[0, 0]]).length).toEqual(2)
	})

	test("results include neighboring cell states", () => {
		const expected: Cell = { state: 0, neighbors: [] }
		expect(cellsFrom([[0]])[0]).toEqual(expected)
	})

	test("returns dead for no live neighbors", () => {
		expect(newStateForCell({ state: 0, neighbors: [] })).toBe(0)
	})
})
