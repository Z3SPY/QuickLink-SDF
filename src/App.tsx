import { useState } from 'react'
import './css/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='max-w-max p-11 bg-amber-100'>
      <p className='text-sm'>
        Test
      </p>
    </div>
  )
}

export default App
