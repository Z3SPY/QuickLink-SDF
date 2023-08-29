import Header from '../../Components/Header/Header.tsx';
import { useState, useEffect } from 'react';
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import random from "lodash/random";
//import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"; Dont know if I should Uninstall this dependency
import Masonry from 'react-layout-masonry';
import './Freelance.css';


function PhotoComp(item : any) {

    return( <img className='rounded-3xl' src={item.url}/>);
}


function FreelanceSelector(){
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
        <div>
            <Header></Header>
            <div className='w-10/12 h-10 rounded-3xl mt-28 mx-40 bg-white'> Search Bar </div>
            <div className='w-10/12 h-96 rounded-3xl mt-12 mx-40 bg-blue-600'> a </div>
            <div id="User-Container" className='w-auto mx-40 mt-4'> 
            <Masonry columns={{ 640: 1, 768: 2, 1024: 3, 1280: 5 }} gap={16}>
                {images.map(PhotoComp)}
            </Masonry>

            </div>
        </div>
    )
}

export default FreelanceSelector;