import { useCallback, useEffect, useState } from "react"
import {
    MdFastForward,
    MdOutlineFastRewind,
    MdOutlineGridOn,
    MdOutlineGridView,
} from "react-icons/md"
import "./App.css"
import { CellGrid } from "./grid-logic"
import { CellState, INITIAL_GAME_STATE } from "./cell-logic"
import { CellGridEditor } from "./cell-grid-editor"

function App() {
    const [gridSize, setGridSize] = useState<number>(
        INITIAL_GAME_STATE[0]?.length || 0,
    )
    const [timeBetweenGenerations, setTimeBetweenGenerations] =
        useState<number>(500)
    const [cellGrid, setCellGrid] = useState<CellState[][]>(INITIAL_GAME_STATE)
    const [runningState, setRunningState] = useState(false)
    const gridEditor = new CellGridEditor(cellGrid)

    function doubleCellGrid() {
        setGridSize(cellGrid.length * 2)
        setCellGrid([
            ...cellGrid.map((row) => [...row, ...row]),
            ...cellGrid.map((row) => [...row, ...row]),
        ])
    }

    function halveCellGrid() {
        setGridSize(cellGrid.length / 2)
        setCellGrid(
            cellGrid
                .map((row) => row.slice(0, row.length / 2))
                .slice(0, cellGrid.length / 2),
        )
    }
    const iterateOneGeneration = useCallback(() => {
        setCellGrid((prevGrid) => {
            return new CellGrid(prevGrid)
                .updateCells()
                .map((row) => row.map((cell) => cell.state))
        })
    }, [])

    useEffect(() => {
        if (!runningState) return
        const interval = setInterval(
            iterateOneGeneration,
            timeBetweenGenerations,
        )
        return () => clearInterval(interval)
    }, [runningState, timeBetweenGenerations, gridSize, iterateOneGeneration])

    return (
        <>
            <div className="card">
                {getGridControls().map(({ display, clickHandler, title }) => (
                    <button key={title} onClick={clickHandler} title={title}>
                        {display}
                    </button>
                ))}

                <button>
                    <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules">
                        Read the rules
                    </a>
                </button>
            </div>

            <div className="time-between-generations">
                Time between generations:{" "}
                {Math.round(timeBetweenGenerations / 10) / 100} seconds
            </div>
            {
                <div
                    className="cell-grid"
                    style={{
                        gridTemplateColumns: `repeat(${gridSize}, 15px)`,
                    }}
                >
                    {getCellGrid()}
                </div>
            }
        </>
    )

    function getCellGrid() {
        return cellGrid.map((row, rowNum) =>
            row.map((cellState, colNum) => {
                return (
                    <div
                        key={`${rowNum}-${colNum}`}
                        className={
                            cellState === CellState.ALIVE
                                ? "cell alive"
                                : "cell dead"
                        }
                        onClick={() =>
                            setCellGrid(
                                gridEditor.withInvertedCellStateAt({
                                    row: rowNum,
                                    col: colNum,
                                }),
                            )
                        }
                    />
                )
            }),
        )
    }

    function getGridControls() {
        return [
            {
                display: runningState ? "Stop" : "Start",
                clickHandler: () => [setRunningState(!runningState)],
                title: `${runningState ? "Stop" : "Start"} the simulation`,
            },
            {
                display: <MdOutlineGridOn />,
                clickHandler: () => {
                    doubleCellGrid()
                },
                title: "Double the grid size",
            },
            {
                display: <MdOutlineGridView />,
                clickHandler: () => {
                    halveCellGrid()
                },
                title: "Halve the grid size",
            },
            {
                display: <MdOutlineFastRewind />,
                clickHandler: () => {
                    setTimeBetweenGenerations(timeBetweenGenerations * 2)
                },
                title: "Double the time between generations",
            },
            {
                display: <MdFastForward />,
                clickHandler: () => {
                    setTimeBetweenGenerations(timeBetweenGenerations / 2)
                },
                title: "Halve the time between generations",
            },
        ]
    }
}

export default App
