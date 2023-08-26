import { useState } from 'react'
import LandingPage from './Pages/Landing-Page'
import './css/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <LandingPage/>
  )
}

export default App


/** npx tailwindcss -i ./src/input.css -o ./output.css --watch */