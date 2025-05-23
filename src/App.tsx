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
    const [gridSize, setGridSize] = useState<number>(
        INITIAL_GAME_STATE[0]?.length || 0,
    )
    const [timeBetweenGenerations, setTimeBetweenGenerations] =
        useState<number>(500)
    const [cellGrid, setCellGrid] = useState<CellState[][]>(INITIAL_GAME_STATE)
    const [runningState, setRunningState] = useState(false)

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

    useEffect(() => {
        if (!runningState) return
        const interval = setInterval(() => {
            setCellGrid((prevGrid) => {
                const nextGeneration =
                    flattenGridIntoCells(prevGrid).map(updateCell)
                return expand(nextGeneration, {
                    numRows: cellGrid.length,
                    numCols: cellGrid[0].length,
                })
            })
        }, timeBetweenGenerations)
        return () => clearInterval(interval)
    }, [runningState, timeBetweenGenerations, gridSize])

    const gridControlData = [
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
            display: <MdOutlineFastRewind />,
            clickHandler: () => {
                setTimeBetweenGenerations(timeBetweenGenerations * 2)
            },
            title: "Double the time between generations",
        },
    ]
    const gridControls = (
        <div className="card">
            {gridControlData.map(({ display, clickHandler, title }) => (
                <button
                    key={title}
                    onClick={() => clickHandler()}
                    title={title}
                >
                    {display}
                </button>
            ))}

            <button
                onClick={() =>
                    setTimeBetweenGenerations(timeBetweenGenerations / 2)
                }
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
                    style={{
                        gridTemplateColumns: `repeat(${gridSize}, 15px)`,
                    }}
                >
                    {cellGrid.map((row, rowNum) =>
                        row.map((cellState, colNum) => {
                            const handleCellClick = () =>
                                setCellGrid(
                                    new CellGridEditor(
                                        cellGrid,
                                    ).withInvertedCellStateAt({
                                        row: rowNum,
                                        col: colNum,
                                    }),
                                )
                            return (
                                <div
                                    key={`${rowNum}-${colNum}`}
                                    className={
                                        cellState === CellState.ALIVE
                                            ? "cell alive"
                                            : "cell dead"
                                    }
                                    onClick={handleCellClick}
                                />
                            )
                        }),
                    )}
                </div>
            }
        </>
    )
}

export default App
