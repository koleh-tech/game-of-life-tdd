import { useEffect, useState } from "react"
import "./App.css"
import {
	createGameStateFrom as createGameStateFrom,
	GameState,
} from "./game-logic"
import { newStateForCell } from "./cell-logic"

function App() {
	const [gameBoard, setGameBoard] = useState<number[][]>([
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 1, 1, 1, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
	])

	//
	// start looping every half second:
	useEffect(() => {
		const interval = setInterval(() => {
			const previousGeneration = new GameState(gameBoard)
			const nextGeneration = previousGeneration.flatten().map(newStateForCell)
			setGameBoard(
				createGameStateFrom(nextGeneration, previousGeneration).board,
			)
		}, 1000)
		return () => clearInterval(interval)
	})
	const cellGrid = <pre>{JSON.stringify(gameBoard)}</pre>
	return (
		<>
			<h1>Game of life</h1>
			<p>Game state</p>
			{cellGrid}
		</>
	)
}

export default App
