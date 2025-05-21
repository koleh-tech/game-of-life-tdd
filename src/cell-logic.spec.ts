import { describe, expect, test } from "vitest"
import { InvalidGameDimensions, stateForCell } from "./cell-logic"

describe("stateForCell", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => stateForCell(0, [[]])).toThrow(InvalidGameDimensions)
	})
})
