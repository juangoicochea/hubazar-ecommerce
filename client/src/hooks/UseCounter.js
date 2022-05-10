import { useState } from 'react'

const useCounter = (initialCount = 0, value = 1, max = 100) => {
    const [counter, setCounter] = useState(initialCount)
    const increment = () => {
        setCounter((prevCounter) => prevCounter + value > max ? max : prevCounter + value)
    }
    const decrement = () => {
        setCounter((prevCounter) => prevCounter - value < 0 ? 0 : prevCounter - value)
    }
    const reset = () => {
        setCounter(0)
    }
    return [counter, increment, decrement, reset]
}
export default useCounter
