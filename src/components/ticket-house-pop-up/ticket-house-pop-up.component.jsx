import './ticket-house-pop-up.styles.scss';

import ahd from '../../assets/ahd.png';
import bang from '../../assets/bang.png';
import chd from '../../assets/chd.png';
import hyd from '../../assets/hyd.png';
import koch from '../../assets/koch.png';
import kolk from '../../assets/kolk.png';
import mumbai from '../../assets/mumbai.png';
import ncr from '../../assets/ncr.png';
import pune from '../../assets/pune.png';

const TicketHousePopUp = ({
  showTicketHousePopUp,
  setShowTicketHousePopUp
}) => {
  const images = [ahd, bang, chd, hyd, koch, kolk, mumbai, ncr, pune];
  const names = [
    'Ahmedabad',
    'Bengaluru',
    'Chandigarh',
    'Hyderabad',
    'Kochi',
    'Kolkata',
    'Mumbai',
    'NCR',
    'Pune'
  ];
  return (
    <div
      className={`ticket-house-pop-up ${
        showTicketHousePopUp ? 'show' : 'hide'
      }`}
      onMouseLeave={() => setShowTicketHousePopUp(false)}
    >
      <p className='title'>Popular Cities</p>
      <div className='pop-up-images'>
        {images.map((image, idx) => (
          <div key={idx} className='pop-up-image-wrapper'>
            <img src={image} alt={`${image}`} className='pop-up-image' />
            <p>{names[idx]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketHousePopUp;
