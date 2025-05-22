import { describe, expect, test } from "vitest"
import { newStateForCell } from "./cell-logic"

describe("stateForCell", () => {
	test("1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.", () => {
		expect(newStateForCell({ state: 1, neighbors: [0, 0] }).state).toBe(0)
		expect(newStateForCell({ state: 1, neighbors: [1, 0] }).state).toBe(0)
	})

	test("2. Any live cell with more than three live neighbours dies, as if by overcrowding.", () => {
		expect(newStateForCell({ state: 1, neighbors: [1, 1, 1, 1] }).state).toBe(0)
	})

	test("3. Any live cell with two or three live neighbours lives on to the next generation.", () => {
		expect(newStateForCell({ state: 1, neighbors: [1, 1, 0] }).state).toBe(1)
		expect(newStateForCell({ state: 1, neighbors: [1, 1, 1] }).state).toBe(1)
	})

	test.skip("4. Any dead cell with exactly three live neighbours becomes a live cell.", () => {
		expect(newStateForCell({ state: 0, neighbors: [0, 0, 0] }).state).toBe(1)
	})
})
