export interface Cell {
	state: number
	neighbors: number[]
}

export function updateCell(cell: Cell) {
	return {
		...cell,
		state: willLive(cell) ? 1 : 0,
	}
}

function willLive(cell: Cell) {
	if (cell.state === 0) return livingNeighborsFor(cell).length === 3
	return (
		livingNeighborsFor(cell).length === 2 ||
		livingNeighborsFor(cell).length === 3
	)
}

function livingNeighborsFor(cell: Cell) {
	return cell.neighbors.filter((neighbor) => neighbor === 1)
}
