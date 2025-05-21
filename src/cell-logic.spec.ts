import { describe, expect, test } from "vitest"
import { newStateForCell, type Cell } from "./cell-logic"

describe("stateForCell", () => {
	test("returns dead for no live neighbors", () => {
		const input: Cell = { state: 0, neighbors: [] }
		expect(newStateForCell(input)).toBe(0)
	})
})
