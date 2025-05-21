export interface Cell {
	state: number
	neighbors: number[]
}

export function newStateForCell(cell: Cell) {
	return { ...cell, state: cell.state === 1 ? 0 : 1 }
}
