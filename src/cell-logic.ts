export interface Cell {
	state: number
	neighbors: number[]
}

export function newStateForCell(cell: Cell): any {
	return cell.state === 1 ? 0 : 1
}
