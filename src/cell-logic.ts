export interface Cell {
	state: number
	neighbors: number[]
}

function isAlive(cell: Cell) {
	const aliveNeighbors = cell.neighbors.filter((neighbor) => neighbor === 1)
	return aliveNeighbors.length === 2 || aliveNeighbors.length === 3
}

export function newStateForCell(cell: Cell) {
	if (cell.state === 1) {
		cell.neighbors
		// __AUTO_GENERATED_PRINT_VAR_START__
		console.log("newStateForCell#if cell.neighbors: %s", cell.neighbors) // __AUTO_GENERATED_PRINT_VAR_END__
	}
	return {
		...cell,
		state: isAlive(cell) ? 1 : 0,
	}
}
