import { describe, expect, test } from "vitest"
import {
    flattenGridIntoCells,
    InvalidGameDimensions,
    expand,
    CellGrid,
} from "./grid-logic"
import type { Cell } from "./cell-logic"

describe("CellGrid", () => {
    test("throws error if game dimensions invalid", () => {
        expect(() => new CellGrid([[]]).updateCells()).toThrow(
            InvalidGameDimensions,
        )
    })
    describe("Populating neighboring cells", () => {
        test("neighbors go from top left to bottom right", () => {
            const expected: Cell = {
                state: 1,
                neighbors: [1, 0, 0, 0, 0, 0, 0, 0],
            }
            expect(
                new CellGrid([
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 0],
                ]).updateCells()[1][1],
            ).toEqual(expected)
        })

        test("corner neighbors", () => {
            const expected: Cell = {
                state: 1,
                neighbors: [0, 0, 0, 0, 0, 0, 0, 1],
            }
            expect(
                new CellGrid([
                    [0, 1, 0],
                    [0, 0, 0],
                    [1, 0, 0],
                ]).updateCells()[2][0],
            ).toEqual(expected)
        })
    })
})

describe("expand", () => {
    test("brings 2D back", () => {
        const cell = { state: 0, neighbors: [] }
        const cellsToExpand = [cell, cell, cell]
        const desiredGrid = [[0, 0, 0]]
        expect(
            expand(cellsToExpand, {
                numRows: desiredGrid.length,
                numCols: desiredGrid[0].length,
            }),
        ).toEqual(desiredGrid)
    })

    test("if no change, order is preserved", () => {
        const deadCell = { state: 0, neighbors: [] }
        const aliveCell = { state: 1, neighbors: [] }
        const cellsToExpand = [
            deadCell,
            deadCell,
            deadCell,
            deadCell,
            aliveCell,
            deadCell,
            deadCell,
            deadCell,
            deadCell,
        ]
        const desiredGrid = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
        ]
        expect(
            expand(cellsToExpand, {
                numRows: desiredGrid.length,
                numCols: desiredGrid[0].length,
            }),
        ).toEqual(desiredGrid)
    })
})
