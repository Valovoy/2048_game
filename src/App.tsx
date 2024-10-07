import './App.css'

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
	const left = (): void => {
		let freeIndex: number | undefined

		arr.forEach((item, index) => {
			item.isCombined = false

			if (!item.value && freeIndex === undefined) {
				freeIndex = index
			}

			if (item.value) {
				const prevIndex = (freeIndex !== undefined ? freeIndex : index) - 1

				if (
					item.value === arr[prevIndex]?.value &&
					!arr[prevIndex]?.isCombined
				) {
					arr[prevIndex].value += item.value
					arr[prevIndex].isCombined = true
					item.value = null
				} else if (freeIndex !== undefined) {
					arr[freeIndex].value = item.value
					item.value = null
					freeIndex++
				}
			}
		})
	}

	return <></>
}

export default App
