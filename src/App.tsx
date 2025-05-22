import { useEffect, useState, type Key } from "react"
import "./App.css"
import {
	createGameStateFrom,
	flattenGridIntoCells,
	GameState,
} from "./game-logic"
import { updateCell } from "./cell-logic"

function App() {
	const [gameBoard, setGameBoard] = useState<number[][]>([
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	])
	const [runningState, setRunningState] = useState(false)

	function runOneIteration() {
		const previousGeneration = new GameState(gameBoard)
		const nextGeneration = flattenGridIntoCells(gameBoard).map(updateCell)
		setGameBoard(createGameStateFrom(nextGeneration, previousGeneration).board)
	}

	function loopEverySecond() {
		const interval = setInterval(runOneIteration, 1000)
		return () => clearInterval(interval)
	}

	useEffect(() => {
		if (!runningState) return
		return loopEverySecond()
	})

	const cellGrid = (
		<table>
			<tbody>
				{gameBoard.map((row, index) => (
					<tr key={index}>{row.map(renderCell)}</tr>
				))}
			</tbody>
		</table>
	)
	return (
		<>
			<h1>Game of life</h1>
			<div className="card">
				<button onClick={() => setRunningState(!runningState)}>
					{runningState ? "Stop" : "Start"}
				</button>
			</div>
			<div>{cellGrid}</div>
		</>
	)
}

function renderCell(state: number, colNum: number) {
	const blankCell = (
		<span className="cellState" role="img" aria-label="life">
			⬛
		</span>
	)
	const lifeEmoji = (
		<span className="cellState" role="img" aria-label="life">
			🟩
		</span>
	)
	return <td key={colNum}>{state === 1 ? lifeEmoji : blankCell}</td>
}

export default App
