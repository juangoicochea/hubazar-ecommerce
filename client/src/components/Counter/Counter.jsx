import React, { useState } from 'react'

const Counter = ({ limitValue }) => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={(e) => { if (count > 0) { setCount(count - 1) } }}>-</button>
            <span>{count}</span>
            <button onClick={(e) => { if (count < limitValue) { setCount(count + 1) } }}>+</button>
        </div>
    )
}

export default Counter