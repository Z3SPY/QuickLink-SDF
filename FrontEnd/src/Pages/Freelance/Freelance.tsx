import LoogedInHeader from '../../Components/Header/LoggedInHeader.tsx';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import random from "lodash/random";
//import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"; Dont know if I should Uninstall this dependency
import Masonry from 'react-layout-masonry';
import './Freelance.css';


function PhotoComp(item : any) {

    //Add A hover element here
    return( 
      <div >
          <div>
            <img className='rounded-3xl' style={{ minHeight: '200px' , minWidth: '236px'}} src={item.url} alt="Picture"/>
            <div></div>
          </div>
          
          <div className='mt-2 ml-2'>
            <h1 className='font-semibold mb-2'>TITLE</h1>
            <div className="absolute rounded-full bg-red-500 h-6 w-6" />
            <h2 className='ml-8'>Person</h2>

          </div>
          
      </div>
    
    
    
    );
}


function FreelanceSelector(){


    const [images, setImages] = useState<{ url: string }[]>([]);
    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=2&limit=50")
          .then((res) => res.json())
          .then((data) => {
            const images = data.map((d: any) => ({
              url: d.download_url
            }));
            setImages(images);
          });
      }, []);

    return(
        <div>
            <LoogedInHeader />
            <div id="User-Container" className='w-auto mx-40 mt-28'> 
            <Masonry columns={{ 640: 2, 768: 3, 1024: 3, 1280: 6 }} gap={16}    >
                
                {images.map((card : any, index : number) => {
                  return (
                    <div key={index}>
                        {PhotoComp(card)}
                    </div>
                  )
                })}

              </Masonry>

            </div>
        </div>
    )
}
//<div className='w-10/12 h-10 rounded-3xl mt-28 mx-40 bg-white'> Search Bar </div>

export default FreelanceSelector;