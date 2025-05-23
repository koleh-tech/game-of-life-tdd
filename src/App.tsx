import { useEffect, useState } from "react"
import {
	MdFastForward,
	MdOutlineFastRewind,
	MdOutlineGridOn,
	MdOutlineGridView,
} from "react-icons/md"
import "./App.css"
import { flattenGridIntoCells, expand } from "./grid-logic"
import { CellState, INITIAL_GAME_STATE, updateCell } from "./cell-logic"
import { CellGridEditor } from "./cell-grid-editor"

function App() {
	const [timeBetweenGenerations, setTimeBetweenGenerations] =
		useState<number>(500)
	const [gameBoard, setGameBoard] = useState<CellState[][]>(INITIAL_GAME_STATE)
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

	const numCols = gameBoard[0]?.length || 0

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
			<button>
				<a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules">
					Read the rules
				</a>
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
			{
				<div
					className="grid"
					style={{ gridTemplateColumns: `repeat(${numCols}, 15px)` }}
				>
					{gameBoard.map((row, rowNum) =>
						row.map((cellState, colNum) => {
							const handleCellClick = () =>
								setGameBoard(
									new CellGridEditor(gameBoard).withInvertedCellStateAt({
										row: rowNum,
										col: colNum,
									}),
								)
							return renderCell(cellState, handleCellClick)
						}),
					)}
				</div>
			}
		</>
	)
}

function renderCell(state: number, handleClick: () => void) {
	return (
		<div
			className={state === CellState.ALIVE ? "cell alive" : "cell dead"}
			onClick={handleClick}
		/>
	)
}

export default App
