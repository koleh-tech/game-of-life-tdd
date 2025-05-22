export interface Cell {
	state: number
	neighbors: number[]
}

export function newStateForCell(cell: Cell) {
	return { ...cell, state: cell.neighbors.length === 2 ? 1 : 0 }
}
