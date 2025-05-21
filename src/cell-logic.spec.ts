import { describe, expect, test } from "vitest"
import { newStateForCell } from "./cell-logic"

describe("stateForCell", () => {
	test("returns dead for no live neighbors", () => {
		expect(newStateForCell({ state: 1, neighbors: [] }).state).toBe(0)
	})
})
