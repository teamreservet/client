import { Link, useNavigate } from 'react-router-dom';

import MobileLayout from '../../components/mobile-layout/mobile-layout.component';
import HomepageCarousel from '../../components/homepage-carousel/homepage-carousel.component';
import CustomButtom from '../../components/custom-button/custom-button.component';

import homepage_crosl_1 from '../../assets/homepage-crosl-1.jpg';
import homepage_crosl_2 from '../../assets/homepage-crosl-2.jpg';
import homepage_crosl_3 from '../../assets/homepage-crosl-3.jpg';
import homepage_crosl_4 from '../../assets/homepage-crosl-4.jpg';
import homepage_crosl_5 from '../../assets/homepage-crosl-5.jpg';
import homepage_crosl_6 from '../../assets/homepage-crosl-6.jpg';
import homepage_crosl_7 from '../../assets/homepage-crosl-7.jpg';
import homepage_crosl_8 from '../../assets/homepage-crosl-8.jpg';
import searchIcon from '../../assets/search-icon.png';

import './homepage.styles.scss';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='homepage'>
      <div className='homepage-background' />
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
            <HomepageCarousel
              images={[
                homepage_crosl_1,
                homepage_crosl_2,
                homepage_crosl_7,
                homepage_crosl_3,
                homepage_crosl_5,
                homepage_crosl_8,
                homepage_crosl_4,
                homepage_crosl_6
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
