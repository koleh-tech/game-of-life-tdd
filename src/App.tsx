import { useEffect, useState } from "react"
import "./App.css"
import { createGameStateFrom, flattenGridIntoCells } from "./grid-logic"
import { CellState, updateCell } from "./cell-logic"

function App() {
	const [gameBoard, setGameBoard] = useState<CellState[][]>([
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
		const nextGeneration = flattenGridIntoCells(gameBoard).map(updateCell)
		setGameBoard(createGameStateFrom(nextGeneration, gameBoard))
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
	return (
		<td key={colNum}>{state === CellState.ALIVE ? lifeEmoji : blankCell}</td>
	)
}

export default App
