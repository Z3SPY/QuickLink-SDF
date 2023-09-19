import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";

import { useState } from 'react'
import LandingPage from './Pages/Landing-Page/Landing-Page'
import FreelanceSelector from './Pages/Freelance/Freelance'
import FreelancePage from './Pages/Freelance/Freelance-page'
import Login from './Components/User-Authentication/Login'
import ProfilePage from './Pages/Profile/ProfilePage'
import './css/App.css'

function App() {
  const [count, setCount] = useState(0)

  //<LandingPage/>
  //<FreelanceSelector />
  //<Login />
  return (
    <Router>
     <Routes>
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/Posts" element={<FreelanceSelector />} /> 
      <Route path="/UserPost" element={<FreelancePage />} /> 
      <Route path="/Profile" element={<ProfilePage />} /> 
     </Routes>
   </Router>
  )
}

export default App


/** npx tailwindcss -i ./src/input.css -o ./output.css --watch */