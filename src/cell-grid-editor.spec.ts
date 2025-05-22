import { describe, expect, test } from "vitest"
import { GameState } from "./game-logic"

export type Coordinate = {
	row: number
	col: number
}
describe("updatedCellsAtCoordinate", () => {
	test("returns a new cell grid", () => {
		const originalGrid = new GameState([[0, 0]])
		expect(
			invertCellStateAtCoordinate({ row: 0, col: 0 }, originalGrid).board,
		).toEqual([[1, 0]])
	})
})

function invertCellStateAtCoordinate(
	arg0: Coordinate,
	originalGrid: GameState,
) {
	const result = originalGrid.board
	result[arg0.row][arg0.col] = result[arg0.row][arg0.col] === 0 ? 1 : 0
	return new GameState(result)
}
