import { useState } from 'react'
import Header from './Components/Header/Header.tsx'
import './css/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App file:w-full h-screen'>
      <Header></Header>
    </div>
  )
}

export default App
