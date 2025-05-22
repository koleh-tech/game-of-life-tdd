import { describe, expect, test } from "vitest"
import { CellGridEditor } from "./grid-logic"
describe("updatedCellsAtCoordinate", () => {
	test("returns a new cell grid", () => {
		const originalGrid = new CellGridEditor([[0, 0]])
		expect(
			originalGrid.invertCellStateAtCoordinate({ row: 0, col: 0 }),
		).toEqual([[1, 0]])
	})

	test("reset grid", () => {
		const originalGrid = new CellGridEditor([[0, 0]])
		expect(
			originalGrid.invertCellStateAtCoordinate({ row: 0, col: 0 }),
		).toEqual([[1, 0]])
		expect(originalGrid.originalGrid).toEqual([[0, 0]])
	})
})
