import { describe, expect, test } from "vitest"
import { GameState, InvalidGameDimensions } from "./game-logic"
import type { Cell } from "./cell-logic"

describe("enrichGameState", () => {
	test("throws error if game dimensions invalid", () => {
		expect(() => new GameState([[]]).enrichGameState()).toThrow(
			InvalidGameDimensions,
		)
	})
	test("flattens game state to one dimension", () => {
		expect(new GameState([[0, 0]]).enrichGameState().length).toEqual(2)
	})
})

describe("enrichGameState neighboring cell population", () => {
	test("no neighbors", () => {
		const expected: Cell = { state: 0, neighbors: [] }
		expect(new GameState([[0]]).enrichGameState()[0]).toEqual(expected)
	})

	test("three neighbors", () => {
		const expected: Cell = { state: 1, neighbors: [0, 0, 0] }
		expect(
			new GameState([
				[0, 0],
				[1, 0],
			]).enrichGameState()[2],
		).toEqual(expected)
	})

	test("surrounded by neighbors", () => {
		const expected: Cell = { state: 1, neighbors: [0, 0, 0, 0, 0, 0, 0, 0] }
		expect(
			new GameState([
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0],
			]).enrichGameState()[4],
		).toEqual(expected)
	})
})
