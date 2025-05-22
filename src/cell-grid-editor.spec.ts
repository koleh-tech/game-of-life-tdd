import { describe, expect, test } from "vitest"
import { CellGridEditor } from "./grid-logic"

export type Coordinate = {
	row: number
	col: number
}
describe("updatedCellsAtCoordinate", () => {
	test("returns a new cell grid", () => {
		const originalGrid = new CellGridEditor([[0, 0]])
		expect(
			invertCellStateAtCoordinate({ row: 0, col: 0 }, originalGrid).board,
		).toEqual([[1, 0]])
	})
})

function invertCellStateAtCoordinate(
	arg0: Coordinate,
	originalGrid: CellGridEditor,
) {
	const result = originalGrid.board
	result[arg0.row][arg0.col] = result[arg0.row][arg0.col] === 0 ? 1 : 0
	return new CellGridEditor(result)
}
