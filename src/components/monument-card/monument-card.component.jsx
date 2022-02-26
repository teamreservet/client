import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { useState } from 'react';

import ImageCarousel from '../image-carousel/image-carousel.component';

import './monument-card.styles.scss';

const MounmentCard = ({ name, images, location, about }) => {
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
        <h1 className='title'>{name.toUpperCase()}</h1>
        <span className='loc'>{location.toUpperCase()}</span>
        <p className='about'>{about.slice(0, 105) + '...'}</p>
      </div>
    </div>
  );
};

export default MounmentCard;
