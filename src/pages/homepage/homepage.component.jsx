import { Cloudinary } from '@cloudinary/url-gen';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';

import ImageCarousel from '../../components/image-carousel/image-carousel.component';

import './homepage.styles.scss';

const HomePage = () => {
  const images = [
    'monuments/file_ngeq8d',
    'monuments/file_wijp5r',
    'monuments/file_snz79i',
    'monuments/file_wz3uhe'
  ];

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'reservet'
    }
  });
  const cldImages = images.map(image => {
    return cld.image(image).resize(scale().width(800).height(410)).quality(100);
  });

  return (
    <div className='homepage'>
      <div className='homepage-carousel'>
        <ImageCarousel images={cldImages} />
      </div>
    </div>
  );
};
export default HomePage;
