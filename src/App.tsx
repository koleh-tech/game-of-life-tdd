import { useEffect, useState } from "react"
import "./App.css"
import { createGameStateFrom, flattenGridIntoCells } from "./grid-logic"
import { CellState, updateCell } from "./cell-logic"
import { CellGridEditor } from "./cell-grid-editor"

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

	function doubleCellGrid() {
		setGameBoard([
			...gameBoard.map((row) => [...row, ...row]),
			...gameBoard.map((row) => [...row, ...row]),
		])
	}

	function halveCellGrid() {
		setGameBoard(
			gameBoard
				.map((row) => row.slice(0, row.length / 2))
				.slice(0, gameBoard.length / 2),
		)
	}

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

	const cellGrid = gameBoard.map((row, rowNum) => (
		<tr>
			{row.map((cellState, colNum) => {
				const handleCellClick = () =>
					setGameBoard(
						new CellGridEditor(gameBoard).withInvertedCellStateAt({
							row: rowNum,
							col: colNum,
						}),
					)
				return renderCell(cellState, handleCellClick)
			})}
		</tr>
	))

	return (
		<>
			<div className="card">
				<button onClick={() => setRunningState(!runningState)}>
					{runningState ? "Stop" : "Start"}
				</button>
				<button onClick={() => doubleCellGrid()}>✖️2</button>
				<button onClick={() => halveCellGrid()}>➗2 </button>
			</div>
			<div>
				<table>
					<tbody>{cellGrid}</tbody>
				</table>
			</div>
		</>
	)
}

function renderCell(state: number, handleClick: () => void) {
	const blankCell = (
		<span className="cellState" role="img" aria-label="life">
			⬛
		</span>
	)
	const aliveCell = (
		<span className="cellState" role="img" aria-label="life">
			🟩
		</span>
	)
	return (
		<td onClick={() => handleClick()}>
			{state === CellState.ALIVE ? aliveCell : blankCell}
		</td>
	)
}

export default App
