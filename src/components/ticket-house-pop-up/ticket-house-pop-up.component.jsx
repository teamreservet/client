import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import FAQs from '../faqs-pop-up/faqs-pop-up.component';

import { searchQueryContext } from '../../contexts';

import ahd from '../../assets/ahd.png';
import bang from '../../assets/bang.png';
import hyd from '../../assets/hyd.png';
import kolk from '../../assets/kolk.png';
import mumbai from '../../assets/mumbai.png';
import ncr from '../../assets/ncr.png';
import pune from '../../assets/pune.png';

import './ticket-house-pop-up.styles.scss';

const TicketHousePopUp = ({ PopUp, setPopUp, hoverOn }) => {
  const searchQueryState = useContext(searchQueryContext);
  const navigate = useNavigate();
  const images = [ahd, bang, hyd, kolk, mumbai, ncr, pune];
  const names = [
    'Ahmedabad',
    'Bengaluru',
    'Hyderabad',
    'Kolkata',
    'Mumbai',
    'NCR',
    'Agra'
  ];
  return (
    <div
      className={`header-pop-up ${PopUp ? 'show' : 'hide'}`}
      onMouseLeave={() => setPopUp(false)}
    >
      {hoverOn === 'Ticket Counter' ? (
        <div>
          <p className='title'>Popular Cities</p>
          <div className='pop-up-images'>
            {images.map((image, idx) => (
              <div
                key={idx}
                className='pop-up-image-wrapper'
                onClick={() => {
                  searchQueryState[1](names[idx]);
                  navigate('/ticket-house');
                }}
              >
                <img src={image} alt={`${image}`} className='pop-up-image' />
                <p>{names[idx]}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <FAQs />
      )}
    </div>
  );
};

export default TicketHousePopUp;
