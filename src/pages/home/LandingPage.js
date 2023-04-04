import React from 'react'
import LandingHeader from '../../components/Navbar/LandingHeader'
import LandingFooter from '../../components/LandingComponents/LandingFooter'
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel'

const LandingPage = () => {
  const images = require.context('../../assets/slides', false, /\.(png|jpe?g|svg)$/);
  const imageUrls = images.keys().sort((a, b) => {
    const slideNumberA = parseInt(a.replace(/^\.\//, '').replace(/\.png$/, '').replace(/^slide/, ''));
    const slideNumberB = parseInt(b.replace(/^\.\//, '').replace(/\.png$/, '').replace(/^slide/, ''));
    return slideNumberA - slideNumberB;
  }).map(key => images(key));

  return (
    <div>
        <LandingHeader/>
          <ImageCarousel imageUrls={imageUrls}/>
        <LandingFooter/>
    </div>
  )
}

export default LandingPage