import React, { useState } from 'react';
import './styles.css';
import frontArrowIcon from "../../assets/icons/frontarrow.png"

function ImageCarousel({ imageUrls }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % imageUrls.length);
  };
  
  const handlePrev = () => {
    setActiveIndex((activeIndex + imageUrls.length - 1) % imageUrls.length);
  };
  
  return (
    <div className="image-carousel" style={{
      display: 'flex', 
      justifyContent: 'center', 
      // backgroundColor: 'green',
      width: '80vw',
      height: '80vh',
      margin: '0px auto 0'}}>
      <div style={{cursor: 'pointer'}} onClick={handlePrev}>
        <img src={frontArrowIcon} style={{
                flex: 1,
                height: '30px',
                width: '30px',
                marginLeft: '20px',
                marginRight: '20px',
                transform: 'rotate(180deg)',
          }} alt=">"/> 
      </div>
      <img src={imageUrls[activeIndex]} alt="carousel-image" style={{height: '100%'}}/>
      <div style={{cursor: 'pointer'}} onClick={handleNext}>
        <img src={frontArrowIcon} style={{
              flex: 1,
              height: '30px',
              width: '30px',
              marginLeft: '20px',
              marginRight: '20px',
        }} alt=">"/> 
      </div>
    </div>
  );
}

export default ImageCarousel;
