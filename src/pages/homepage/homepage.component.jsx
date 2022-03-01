import { Link, useNavigate } from 'react-router-dom';

import MobileLayout from '../../components/mobile-layout/mobile-layout.component';
import HomepageCarousel from '../../components/homepage-carousel/homepage-carousel.component';
import CustomButtom from '../../components/custom-button/custom-button.component';

import img1 from '../../assets/grid.jpeg';
import img2 from '../../assets/grid-1.jpeg';
import img3 from '../../assets/grid-2.jpeg';
import img4 from '../../assets/grid-3.jpeg';
import background from '../../assets/background.jpeg';
import searchIcon from '../../assets/search-icon.png';

import './homepage.styles.scss';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='homepage'>
      <img src={background} alt='' className='homepage-background' />
      <div className='left-component'>
        <h1 className='tag-line'>
          Monuments are the hooking irons that binds one generation to the next
        </h1>
        <div className='booking-button'>
          <CustomButtom big bookNow onClick={() => navigate('/ticket-house')}>
            BOOK NOW
          </CustomButtom>
        </div>
      </div>
      <div className='right-bottom-components'>
        <div className='side-view'>
          <div className='search-bar'>
            <img src={searchIcon} alt='search-icon' />
            <Link to={'/ticket-house'}>www.reservet.in</Link>
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
