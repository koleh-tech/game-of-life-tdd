import { describe, expect, test } from "vitest"
import {
	oldFunc,
	flattenGridIntoCells,
	InvalidGameDimensions,
} from "./grid-logic"
import type { Cell } from "./cell-logic"

describe("GameState flatten", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => flattenGridIntoCells([[]])).toThrow(InvalidGameDimensions)
	})

	test("flattens game state to 1D", () => {
		expect(flattenGridIntoCells([[0, 0]]).length).toEqual(2)
	})

	describe("order goes", () => {
		test("left to right", () => {
			expect(flattenGridIntoCells([[0, 1, 0]])[1].state).toEqual(1)
		})

		test("top down", () => {
			expect(
				flattenGridIntoCells([
					[0, 0],
					[0, 1],
					[1, 1],
				])[4].state,
			).toEqual(1)
		})
	})
})

describe("GameState flatten neighboring cell population", () => {
	test("no neighbors", () => {
		const expected: Cell = { state: 0, neighbors: [] }
		expect(flattenGridIntoCells([[0]])[0]).toEqual(expected)
	})

	test("corner neighbors", () => {
		const expected: Cell = { state: 1, neighbors: [0, 0, 0] }
		expect(
			flattenGridIntoCells([
				[0, 0, 0],
				[0, 0, 0],
				[1, 0, 0],
			])[6],
		).toEqual(expected)
	})

	test("surrounded by neighbors", () => {
		const expected: Cell = { state: 1, neighbors: [0, 0, 0, 0, 0, 0, 0, 0] }
		expect(
			flattenGridIntoCells([
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0],
			])[4],
		).toEqual(expected)
	})
})

describe("createGameStateFrom", () => {
	test("brings 2D back", () => {
		const cell = { state: 0, neighbors: [] }
		expect(oldFunc([cell, cell, cell], [[0, 0, 0]])).toEqual([[0, 0, 0]])
	})

	test("if no change, order is preserved", () => {
		const deadCell = { state: 0, neighbors: [] }
		const aliveCell = { state: 1, neighbors: [] }
		expect(
			oldFunc(
				[
					deadCell,
					deadCell,
					deadCell,
					deadCell,
					aliveCell,
					deadCell,
					deadCell,
					deadCell,
					deadCell,
				],
				[
					[0, 0, 0],
					[0, 1, 0],
					[0, 0, 0],
				],
			),
		).toEqual([
			[0, 0, 0],
			[0, 1, 0],
			[0, 0, 0],
		])
	})
})
