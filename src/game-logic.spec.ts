import { describe, expect, test } from "vitest"
import {
	createGameStateFrom,
	GameState,
	InvalidGameDimensions,
} from "./game-logic"
import type { Cell } from "./cell-logic"

describe("GameState flatten", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => new GameState([[]]).flatten()).toThrow(InvalidGameDimensions)
	})

	test("flattens game state to 1D", () => {
		expect(new GameState([[0, 0]]).flatten().length).toEqual(2)
	})
	test("goes left to right", () => {
		expect(new GameState([[0, 1, 0]]).flatten()[1].state).toEqual(1)
	})
})

describe("GameState flatten neighboring cell population", () => {
	test("no neighbors", () => {
		const expected: Cell = { state: 0, neighbors: [] }
		expect(new GameState([[0]]).flatten()[0]).toEqual(expected)
	})

	test("corner neighbors", () => {
		const expected: Cell = { state: 1, neighbors: [0, 0, 0] }
		expect(
			new GameState([
				[0, 0, 0],
				[0, 0, 0],
				[1, 0, 0],
			]).flatten()[6],
		).toEqual(expected)
	})

	test("surrounded by neighbors", () => {
		const expected: Cell = { state: 1, neighbors: [0, 0, 0, 0, 0, 0, 0, 0] }
		expect(
			new GameState([
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0],
			]).flatten()[4],
		).toEqual(expected)
	})
})

describe("createGameStateFrom", () => {
	test("brings 2D back", () => {
		const cell = { state: 0, neighbors: [] }
		expect(
			createGameStateFrom([cell, cell, cell], new GameState([[0, 0, 0]])),
		).toEqual(new GameState([[0, 0, 0]]))
	})
})
