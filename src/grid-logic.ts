import type { Cell, CellState } from "./cell-logic"

export class InvalidGameDimensions extends Error {}

export class CellGrid {
    constructor(private stateGrid: CellState[][]) {}
    updateCells() {
        if (this.stateGrid.length <= 1 && !this.stateGrid[0].length) {
            throw new InvalidGameDimensions("Invalid game dimensions")
        }
        return this.stateGrid.map((row) => [...row])
    }
}

export function flattenGridIntoCells(grid: CellState[][]) {
    if (grid.length <= 1 && !grid[0].length) {
        throw new InvalidGameDimensions("Invalid game dimensions")
    }
    const result: Cell[] = []
    const getCellAtcoordinate = (row: number, col: number) =>
        grid[(row + grid.length) % grid.length][
            (col + grid[0].length) % grid[0].length
        ]

    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
            result.push({
                state: grid[row][column],
                neighbors: [
                    getCellAtcoordinate(row - 1, column - 1),
                    getCellAtcoordinate(row - 1, column),
                    getCellAtcoordinate(row - 1, column + 1),
                    getCellAtcoordinate(row, column - 1),
                    getCellAtcoordinate(row, column + 1),
                    getCellAtcoordinate(row + 1, column - 1),
                    getCellAtcoordinate(row + 1, column),
                    getCellAtcoordinate(row + 1, column + 1),
                ],
            })
        }
    }
    return result
}

export type GridDimensions = {
    numRows: number
    numCols: number
}

export function expand(
    cellsToExpand: Cell[],
    { numRows, numCols }: GridDimensions,
) {
    const cellStates = cellsToExpand.map((cell) => cell.state)
    const result = []
    for (let row = 0; row < numRows; row++) {
        const startOfSlice = row * numCols
        const endOfSlice = (row + 1) * numCols
        result.push(cellStates.slice(startOfSlice, endOfSlice))
    }
    return result
}
