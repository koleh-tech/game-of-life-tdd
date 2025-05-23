import type { Cell, CellState } from "./cell-logic"

export class InvalidGameDimensions extends Error {}
const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
]

export function flattenGridIntoCells(grid: CellState[][]) {
    if (grid.length <= 1 && !grid[0].length) {
        throw new InvalidGameDimensions("Invalid game dimensions")
    }
    const result: Cell[] = []
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
            const neighbors = directions
                .map(([dx, dy]) => grid[row + dx]?.[column + dy])
                .filter((n) => n !== undefined)
            // const neighbors: number[] = [
            //     grid[row - 1]?.[column - 1],
            //     grid[row - 1]?.[column],
            //     grid[row - 1]?.[column + 1],
            //     grid[row]?.[column - 1],
            //     grid[row]?.[column + 1],
            //     grid[row + 1]?.[column - 1],
            //     grid[row + 1]?.[column],
            //     grid[row + 1]?.[column + 1],
            // ].filter((n) => n !== undefined)
            result.push({ state: grid[row][column], neighbors: neighbors })
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
