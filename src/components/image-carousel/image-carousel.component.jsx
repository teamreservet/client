import { AdvancedImage } from '@cloudinary/react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import './image-carousel.styles.scss';

const ImageCarousel = ({ images, autoPlay = true }) => {
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      autoPlay={autoPlay}
      interval={1500}
      stopOnHover={false}
      className='image-carousel'
    >
      {images.map((image, idx) => (
        <div key={idx}>
          <AdvancedImage cldImg={image} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
