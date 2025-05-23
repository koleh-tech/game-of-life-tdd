import type { CellState } from "./cell-logic"

export type Coordinate = {
	row: number
	col: number
}

export class CellGridEditor {
	constructor(public readonly originalGrid: CellState[][]) {}

	withInvertedCellStateAt({ row, col }: Coordinate) {
		const newGrid = this.originalGrid.map((row) => [...row])
		newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0
		return newGrid
	}
}
