import { describe, expect, test } from "vitest"
import { InvalidGameDimensions, CellGrid } from "./grid-logic"
import type { Cell } from "./cell-logic"

describe("CellGrid", () => {
    test("throws error if game dimensions invalid", () => {
        expect(() => new CellGrid([[]]).updateCells()).toThrow(
            InvalidGameDimensions,
        )
    })

    test("calls cellUpdater on each cell", () => {
        const expected: Cell = {
            state: 1,
            neighbors: [0, 0, 0, 0, 0, 0, 0, 0],
        }
        expect(
            new CellGrid(
                [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
                (cell) => ({ ...cell, state: 1 }),
            ).updateCells()[1][1],
        ).toEqual(expected)
    })
    describe("Populating of neighboring cells", () => {
        test("neighbors go from top left to bottom right", () => {
            const expected: Cell = {
                state: 1,
                neighbors: [1, 0, 0, 0, 0, 0, 0, 0],
            }
            expect(
                new CellGrid(
                    [
                        [1, 0, 0],
                        [0, 1, 0],
                        [0, 0, 0],
                    ],
                    (cell) => cell,
                ).updateCells()[1][1],
            ).toEqual(expected)
        })

        test("corner neighbors", () => {
            const expected: Cell = {
                state: 1,
                neighbors: [0, 0, 0, 0, 0, 0, 0, 1],
            }
            expect(
                new CellGrid(
                    [
                        [0, 1, 0],
                        [0, 0, 0],
                        [1, 0, 0],
                    ],
                    (cell) => cell,
                ).updateCells()[2][0],
            ).toEqual(expected)
        })
    })
})
