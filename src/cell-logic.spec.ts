import { describe, expect, test } from "vitest"
import { newStateForCell } from "./cell-logic"

describe("stateForCell", () => {
	test("returns dead for no live neighbors", () => {
		expect(newStateForCell({ state: 1, neighbors: [] }).state).toBe(0)
	})

	test("3. Any live cell with two or three live neighbours lives on to the next generation.", () => {
		expect(newStateForCell({ state: 1, neighbors: [0, 0] }).state).toBe(1)
	})
})
