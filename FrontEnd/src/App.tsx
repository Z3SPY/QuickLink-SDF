import { useState } from 'react'
import LandingPage from './Pages/Landing-Page/Landing-Page'
import FreelanceSelector from './Pages/Freelance/Freelance'
import FreelancePage from './Pages/Freelance/Freelance-page'
import Login from './Components/User-Authentication/Login'
import './css/App.css'

function App() {
  const [count, setCount] = useState(0)

  //<LandingPage/>
  //<FreelanceSelector />
  //<Login />
  return (
    <LandingPage/>
  )
}

export default App


/** npx tailwindcss -i ./src/input.css -o ./output.css --watch */