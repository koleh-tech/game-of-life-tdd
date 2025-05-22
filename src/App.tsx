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

	function loopEverySecond() {
		const interval = setInterval(() => {
			const previousGeneration = new GameState(gameBoard)
			const nextGeneration = previousGeneration.flatten().map(updateCell)
			setGameBoard(
				createGameStateFrom(nextGeneration, previousGeneration).board,
			)
		}, 1000)
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
	return <>{cellGrid}</>
}

function renderCell(state: number) {
	const skullEmoji = (
		<span role="img" aria-label="skull">
			💀
		</span>
	)
	const lifeEmoji = (
		<span role="img" aria-label="life">
			❤️
		</span>
	)
	return <td>{state === 1 ? lifeEmoji : skullEmoji}</td>
}

export default App
