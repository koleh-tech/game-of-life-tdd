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

	function renderCell(state: number, colNum: number, rowNum: number) {
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
			<td
				onClick={() =>
					setGameBoard(
						new CellGridEditor(gameBoard).withInvertedCellStateAt({
							row: rowNum,
							col: colNum,
						}),
					)
				}
			>
				{state === CellState.ALIVE ? lifeEmoji : blankCell}
			</td>
		)
	}

	const cellGrid = (
		<table>
			<tbody>
				{gameBoard.map((row, rowNum) => (
					<tr>
						{row.map((cellState, colNum) =>
							renderCell(cellState, colNum, rowNum),
						)}
					</tr>
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

export default App
