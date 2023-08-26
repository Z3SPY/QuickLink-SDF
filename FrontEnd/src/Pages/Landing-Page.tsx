import { useState } from 'react'
import Header from '../Components/Header/Header.tsx'
import Canvas from '../Components/Canvas/Canvas.tsx'
import './Landing-Page.css'



//Read Scroll Pos and pass the values
const scrollDemo : Element = document.querySelector("#scrollDemo")!;
const output = document.querySelector(".output")!;

  scrollDemo.addEventListener("scroll", event => {
        output.innerHTML = `scrollTop: ${scrollDemo.scrollTop} <br>
                                scrollLeft: ${scrollDemo.scrollLeft} `;
        }, { passive: true });

function LandingPage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header></Header>
      <div className='App file:w-full h-screen'>
          <div id="Graphic">
            <div className='text mx-60 mt-60'>
                <h1 className="text-6xl "> <span style={{color: '#FFBA86'}}>CRAFTING</span> <span style={{color: '#C23373'}}>DREAMS</span> ONE FREELANCE GIG AT A TIME</h1>
            </div>
            <Canvas/>
          </div>
        </div>      

        <div id="Showcase" className=' h-40 w-screen bg-black'>
          
        </div>  
    
    
    </div>
    
    
  )
}

export default LandingPage
