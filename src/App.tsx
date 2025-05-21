import { useEffect, useState } from "react"
import "./App.css"
import {
	createGameStateFrom as createGameStateFrom,
	GameState,
} from "./game-logic"
import { newStateForCell } from "./cell-logic"

function App() {
	const [gameBoard, setGameBoard] = useState<number[][]>([[0, 0, 0]])

	//
	// start looping every half second:
	useEffect(() => {
		const interval = setInterval(() => {
			const previousGeneration = new GameState(gameBoard)
			const nextGeneration = previousGeneration.flatten().map(newStateForCell)
			setGameBoard(createGameStateFrom(nextGeneration, previousGeneration))
		}, 1000)
		return () => clearInterval(interval)
	})
	return (
		<>
			<h1>Game of life</h1>
			<p>Game state</p>
			<pre>{JSON.stringify(gameBoard)}</pre>
		</>
	)
}

export default App
