import { useEffect, useState } from "react"
import "./App.css"
import { createGameStateFrom, GameState } from "./game-logic"
import { updateCell } from "./cell-logic"

function App() {
	const [gameBoard, setGameBoard] = useState<number[][]>([
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 1, 1, 1, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
	])
	const [runningState, setRunningState] = useState(false)

	function runOneIteration() {
		const previousGeneration = new GameState(gameBoard)
		const nextGeneration = previousGeneration.flatten().map(updateCell)
		setGameBoard(createGameStateFrom(nextGeneration, previousGeneration).board)
	}

	function loopEverySecond() {
		const interval = setInterval(runOneIteration, 1000)
		return () => clearInterval(interval)
	}

	useEffect(() => {
		return loopEverySecond()
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
			<div className="controls">
				<h1>Game of life</h1>
				<button onClick={() => setRunningState(!runningState)}>
					{runningState ? "Stop" : "Start"}
				</button>
			</div>
			<div>{cellGrid}</div>
		</>
	)
}

function renderCell(state: number) {
	const blankCell = (
		<span role="img" aria-label="life">
			⬛
		</span>
	)
	const lifeEmoji = (
		<span role="img" aria-label="life">
			🟩
		</span>
	)
	return <td>{state === 1 ? lifeEmoji : blankCell}</td>
}

export default App
