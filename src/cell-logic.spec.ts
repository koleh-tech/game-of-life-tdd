import { describe, expect, test } from "vitest"
import { updateCell } from "./cell-logic"

describe("stateForCell", () => {
    test("1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.", () => {
        expect(updateCell({ state: 1, neighbors: [0, 0] }).state).toBe(0)
        expect(updateCell({ state: 1, neighbors: [1, 0] }).state).toBe(0)
    })

    test("2. Any live cell with more than three live neighbours dies, as if by overcrowding.", () => {
        expect(updateCell({ state: 1, neighbors: [1, 1, 1, 1] }).state).toBe(0)
    })

    describe("3. Any live cell with two or three live neighbours lives on to the next generation.", () => {
        test("lives on", () => {
            expect(updateCell({ state: 1, neighbors: [1, 1, 0] }).state).toBe(1)
            expect(updateCell({ state: 1, neighbors: [1, 1, 1] }).state).toBe(1)
        })

        test("already dead", () => {
            expect(updateCell({ state: 0, neighbors: [1, 1, 0] }).state).toBe(0)
        })
    })

    test("4. Any dead cell with three live neighbours becomes a live cell.", () => {
        expect(updateCell({ state: 0, neighbors: [1, 1, 1, 0] }).state).toBe(1)
    })

    test("4. Any dead cell with six live neighbours becomes a live cell.", () => {
        expect(
            updateCell({ state: 0, neighbors: [1, 1, 1, 1, 1, 1, 0] }).state,
        ).toBe(1)
    })
})
