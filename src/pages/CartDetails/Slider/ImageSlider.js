import React from 'react'
import "./ImageSlider.css"
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageSlider = ({images}) => {
  console.log(images)
    return (
        <Carousel fade>
          {images && images.map((image, i)=>
          <Carousel.Item key={i}>
            <img src={image.url} alt="" />
          </Carousel.Item>)}
        </Carousel>
      );
}

export default ImageSlider
