import './App.css'

type Direction = 'left' | 'right'
type Tile = {
	value: number | null
	isCombined: boolean
}

const arr: Tile[] = [
	{ value: 2, isCombined: false },
	{ value: null, isCombined: false },
	{ value: 2, isCombined: false },
	{ value: 2, isCombined: false },
]

function App() {
	const moveHorizontal = (direction: Direction = 'left') => {
		let freeIndex: number | undefined

		const config = {
			start: direction === 'right' ? arr.length - 1 : 0,
			end: direction === 'right' ? -1 : arr.length,
			step: direction === 'right' ? -1 : 1,
		}

		for (let i = config.start; i !== config.end; i += config.step) {
			const currentTile = arr[i]

			currentTile.isCombined = false

			if (!currentTile.value && freeIndex === undefined) {
				freeIndex = i

				continue
			}

			if (currentTile.value) {
				const prevIndex = (freeIndex ?? i) - config.step
				const prevTile = arr[prevIndex]

				if (canCombineCells(currentTile, prevTile)) {
					combineCells(prevTile, currentTile)

					freeIndex = freeIndex ?? i
				} else if (freeIndex !== undefined) {
					moveCell(arr[freeIndex], currentTile)

					freeIndex += config.step
				}
			}
		}
	}

	const canCombineCells = (current: Tile, prev: Tile | undefined): boolean => {
		return prev?.value === current.value && !prev?.isCombined
	}

	const combineCells = (prev: Tile, current: Tile): void => {
		if (prev.value !== null && current.value !== null) {
			prev.value += current.value
			prev.isCombined = true
			current.value = null
		}
	}

	const moveCell = (prev: Tile, current: Tile): void => {
		prev.value = current.value
		current.value = null
	}

	return <></>
}

export default App
