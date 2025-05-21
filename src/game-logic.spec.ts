import { describe, expect, test } from "vitest"
import { cellsFrom, InvalidGameDimensions } from "./game-logic"
import type { Cell } from "./cell-logic"

describe("enrichGameState", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => cellsFrom([[]])).toThrow(InvalidGameDimensions)
	})

	test("flattens game state to one dimension", () => {
		expect(cellsFrom([[0, 0]]).length).toEqual(2)
	})

	test("results include neighboring cell states", () => {
		const expected: Cell = { state: 0, neighbors: [] }
		expect(cellsFrom([[0]])[0]).toEqual(expected)
	})
})
