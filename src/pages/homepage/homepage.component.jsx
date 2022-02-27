import MobileLayout from '../../components/mobile-layout/mobile-layout.component';
import HomepageCarousel from '../../components/homepage-carousel/homepage-carousel.component';

import img1 from '../../assets/grid.jpeg';
import img2 from '../../assets/grid-1.jpeg';
import img3 from '../../assets/grid-2.jpeg';
import img4 from '../../assets/grid-3.jpeg';
import background from '../../assets/background.jpg';

import './homepage.styles.scss';

const HomePage = () => {
  return (
    <div className='homepage'>
      <img src={background} alt='' className='homepage-background' />
      <div className='right-bottom-components'>
        <div className='side-view'>
          <div className='search-bar'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png' />
            <span>www.reservet.in</span>
          </div>
          <div className='components'>
            <MobileLayout />
            <HomepageCarousel images={[img1, img2, img3, img4]} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
