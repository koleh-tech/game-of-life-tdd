import { useEffect, useState } from "react"
import "./App.css"
import {
	createGameStateFrom as createGameStateFrom,
	GameState,
} from "./game-logic"
import { updateCell } from "./cell-logic"

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
			const nextGeneration = previousGeneration.flatten().map(updateCell)
			setGameBoard(
				createGameStateFrom(nextGeneration, previousGeneration).board,
			)
		}, 1000)
		return () => clearInterval(interval)
	})
	const cellGrid = (
		<table>
			{gameBoard.map((row) => (
				<tr>{row.map(renderCell)}</tr>
			))}
		</table>
	)
	return (
		<>
			<h1>Game of life</h1>
			<p>Game state</p>
			{cellGrid}
		</>
	)
}

function renderCell(state: number) {
	return <td>{state === 1 ? "■" : "□"}</td>
}

export default App
