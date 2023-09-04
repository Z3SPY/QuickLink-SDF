import LoggedInHeader from '../../Components/Header/LoggedInHeader.tsx';
import { useState, useEffect } from 'react';
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import random from "lodash/random";
import Masonry from 'react-layout-masonry';
import './Freelance-page.css';


function PhotoComp(item : any) {

    return( <img className='rounded-3xl' src={item.url}/>);
}


function FreelancePage(){
    const [images, setImages] = useState<{ url: string }[]>([]);
    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=2&limit=20")
          .then((res) => res.json())
          .then((data) => {
            const images = data.map((d: any) => ({
              url: d.download_url
            }));
            setImages(images);
          });
      }, []);

    return(
        <>
            <LoggedInHeader></LoggedInHeader>

            <div id="Post-Page" className='flex flex-wrap w-screen h-auto mt-20 bg-red-600'> 
              <div id="Post-Container" className='flex-intial w-9/12 rounded-3xl m-3 bg-blue-600'> 
                    <div id="Post-Img" className='flex-intial w-full rounded-3xl bg-black'>
                    </div>          
                    <div id="Post-Comments" className='flex-intial w-full rounded-3xl bg-red-200'>
                    </div>  
              </div>
              <div id="Post-Recommended" className='grow bg-blue-300'>

              
              </div>
              

            </div>
            
           
            
        </>
    )
}

export default FreelancePage;

/**
 * 
 * <div id="Recommended" className='w-auto mt-4'> 
              <Masonry columns={{ 640: 2, 768: 3, 1024: 3, 1280: 5 }} gap={16}  >
                  {images.map(PhotoComp)}
              </Masonry>

            </div>
 */