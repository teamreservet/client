import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { useState } from 'react';

import ImageCarousel from '../image-carousel/image-carousel.component';

import './monument-card.styles.scss';

const MounmentCard = ({ name, images, location, about, opening_time, closing_time }) => {
  const [autoPlay, setAutoPlay] = useState(false);
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'reservet'
    }
  });

  const cldimages = images.map(image => {
    const img = cld.image(image);
    img.resize(fill().width(300).height(200));
    return img;
  });

  const handleOnMouseLeave = () => {
    setAutoPlay(false);
  };
  const handleOnMouseEnter = () => {
    setAutoPlay(true);
  };

  return (
    <div
      className='monument-card'
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className='monument-container'>
        <div className='image-container'>
          <ImageCarousel images={cldimages} autoPlay={autoPlay} />
        </div>
        <div className='description'>
          <h1 className='title'>{name.toUpperCase()}</h1>
          <span className='loc'>{location.toUpperCase()}</span>
          <p className='about'>{about.slice(0, 200) + '...'}</p>
          <div className='wrapper'>
            <div>
              <p className='timings'>Opening time: <span className='timing'>{opening_time}</span></p>
              <p className='timings'>Closing time: <span className='timing'>{closing_time}</span></p>
            </div> 
            <button className='booknow-button'>Book Now</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MounmentCard;
