import { useEffect, useState } from "react"
import "./App.css"
import { createGameStateFrom, GameState } from "./game-logic"
import { newStateForCell } from "./cell-logic"

function App() {
	const [gameState, setGameState] = useState<number[][]>([[0, 0, 0]])

	//
	// start looping every half second:
	useEffect(() => {
		const interval = setInterval(() => {
			const thing = new GameState(gameState).flatten().map(newStateForCell)
			setGameState(createGameStateFrom(thing, new GameState(gameState)))
		}, 1000)
		return () => clearInterval(interval)
	})
	return (
		<>
			<h1>Game of life</h1>
			<p>Game state</p>
			<pre>{JSON.stringify(gameState)}</pre>
		</>
	)
}

export default App
