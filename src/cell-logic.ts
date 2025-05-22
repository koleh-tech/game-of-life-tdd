export interface Cell {
	state: number
	neighbors: number[]
}

function isAlive(cell: Cell) {
	return cell.neighbors.length === 2 || cell.neighbors.length === 3
}

export function newStateForCell(cell: Cell) {
	return {
		...cell,
		state: isAlive(cell) ? 1 : 0,
	}
}
