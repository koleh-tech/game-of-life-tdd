import { useEffect, useState } from "react"
import {
	MdFastForward,
	MdOutlineFastRewind,
	MdOutlineGridOn,
	MdOutlineGridView,
	MdSquare,
} from "react-icons/md"
import "./App.css"
import { oldFunc, flattenGridIntoCells, expand } from "./grid-logic"
import { CellState, updateCell } from "./cell-logic"
import { CellGridEditor } from "./cell-grid-editor"

function App() {
	const [timeBetweenGenerations, setTimeBetweenGenerations] =
		useState<number>(1000)
	const [gameBoard, setGameBoard] = useState<CellState[][]>([
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
		setGameBoard(
			expand(nextGeneration, {
				numRows: gameBoard.length,
				numCols: gameBoard[0].length,
			}),
		)
	}

	function loopEverySecond() {
		const interval = setInterval(runOneIteration, timeBetweenGenerations)
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

	const gridControls = (
		<div className="card">
			<button onClick={() => setRunningState(!runningState)}>
				{runningState ? "Stop" : "Start"}
			</button>
			<button onClick={() => doubleCellGrid()} title="Double the grid size">
				<MdOutlineGridOn />
			</button>
			<button onClick={() => halveCellGrid()} title="Halve the grid size">
				<MdOutlineGridView />
			</button>
			<button
				onClick={() => setTimeBetweenGenerations(timeBetweenGenerations * 2)}
				title="Double the time between generations"
			>
				<MdOutlineFastRewind />
			</button>
			<button
				onClick={() => setTimeBetweenGenerations(timeBetweenGenerations / 2)}
				title="Halve the time between generations"
			>
				<MdFastForward />
			</button>
		</div>
	)
	return (
		<>
			{gridControls}
			<div className="time-between-generations">
				Time between generations:{" "}
				{Math.round(timeBetweenGenerations / 10) / 100} seconds
			</div>
			<div className="cellGrid">
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
			<MdSquare style={{ color: "#1a1a1a" }} />
		</span>
	)
	const aliveCell = (
		<span className="cellState" role="img" aria-label="life">
			<MdSquare style={{ color: "green" }} />
		</span>
	)
	return (
		<td onClick={() => handleClick()}>
			{state === CellState.ALIVE ? aliveCell : blankCell}
		</td>
	)
}

export default App
