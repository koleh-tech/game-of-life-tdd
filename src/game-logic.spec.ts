import { describe, expect, test } from "vitest"
import {
	createGameStateFrom,
	GameState,
	InvalidGameDimensions,
} from "./game-logic"
import type { Cell } from "./cell-logic"

describe("enrichGameState", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => new GameState([[]]).flattened()).toThrow(InvalidGameDimensions)
	})

	test("flattens game state to one dimension", () => {
		expect(new GameState([[0, 0]]).flattened().length).toEqual(2)
	})
})

describe("enrichGameState neighboring cell population", () => {
	test("no neighbors", () => {
		const expected: Cell = { state: 0, neighbors: [] }
		expect(new GameState([[0]]).flattened()[0]).toEqual(expected)
	})

	test("corner neighbors", () => {
		const expected: Cell = { state: 1, neighbors: [0, 0, 0] }
		expect(
			new GameState([
				[0, 0, 0],
				[0, 0, 0],
				[1, 0, 0],
			]).flattened()[6],
		).toEqual(expected)
	})

	test("surrounded by neighbors", () => {
		const expected: Cell = { state: 1, neighbors: [0, 0, 0, 0, 0, 0, 0, 0] }
		expect(
			new GameState([
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0],
			]).flattened()[4],
		).toEqual(expected)
	})
})

describe("nextGeneration", () => {
	test("applies rules to each cell", () => {
		const statusChecker = (cell: Cell) => 0
		const cell = { state: 0, neighbors: [] }
		expect(
			createGameStateFrom([cell, cell, cell], new GameState([[0, 0, 0]])),
		).toEqual([[0, 0, 0]])
	})
})
