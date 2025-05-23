import { updateCell, type Cell, type CellState } from "./cell-logic"

export class InvalidGameDimensions extends Error {}
export type Coordinate = {
    row: number
    col: number
}

export class CellGrid {
    constructor(
        private stateGrid: CellState[][],
        private cellUpdater: (cell: Cell) => Cell = updateCell,
    ) {}

    updateCells() {
        if (this.stateGrid.length <= 1 && !this.stateGrid[0].length)
            throw new InvalidGameDimensions("Invalid game dimensions")

        return this.stateGrid.map((rowRef, row) =>
            rowRef.map((cellState, column) =>
                this.cellUpdater({
                    neighbors: this.neighborsForCell({ row, column }),
                    state: cellState,
                }),
            ),
        )
    }

    private neighborsForCell({ row, column }: { row: number; column: number }) {
        return [
            this.cellAtcoordinate(row - 1, column - 1),
            this.cellAtcoordinate(row - 1, column),
            this.cellAtcoordinate(row - 1, column + 1),
            this.cellAtcoordinate(row, column - 1),
            this.cellAtcoordinate(row, column + 1),
            this.cellAtcoordinate(row + 1, column - 1),
            this.cellAtcoordinate(row + 1, column),
            this.cellAtcoordinate(row + 1, column + 1),
        ]
    }

    /**
     * If coordinate lies beyond the grid dimensions, it will wrap around
     */
    private cellAtcoordinate(row: number, col: number) {
        const numCols = this.stateGrid[0].length
        const numRows = this.stateGrid.length
        return this.stateGrid[(row + numRows) % numRows][
            (col + numCols) % numCols
        ]
    }
}
