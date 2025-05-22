export interface Cell {
	state: number
	neighbors: number[]
}

function willLive(cell: Cell) {
	const aliveNeighbors = cell.neighbors.filter((neighbor) => neighbor === 1)
	if (cell.state === 0) return aliveNeighbors.length === 3
	return aliveNeighbors.length === 2 || aliveNeighbors.length === 3
}

export function updateCell(cell: Cell) {
	return {
		...cell,
		state: willLive(cell) ? 1 : 0,
	}
}
