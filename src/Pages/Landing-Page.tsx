import { useState } from 'react'
import Header from '../Components/Header/Header.tsx'
import Canvas from '../Components/Canvas/Canvas.tsx'
import './Landing-Page.css'

function LandingPage() {
  const [count, setCount] = useState(0)

  return (
    <div className='App file:w-full h-screen'>
      <Header></Header>
      <div> 
        <h1> <span style={{color: '#FFBA86'}}>CRAFTING</span> <span style={{color: '#C23373'}}>DREAMS</span> ONE FREELANCE GIG AT A TIME</h1>
        <Canvas />

      </div>
    </div>
  )
}

export default LandingPage
