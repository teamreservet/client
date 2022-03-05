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
import { useState } from 'react';

const data=[
  {
    question: 'What is your first question sjk ad biwq bdjw qnki nakdx adkn',
    answer: 'Answer no.1 nhi pata',
  },
  {
    question: 'What is your second question sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx adkn',
    answer: 'Answer no.2 nhi pata sjk ad biwq bdjw qnki nakdx adkn',
  },
  {
    question: 'What is your third question sjk ad biwq bdjw qnki nakdx adkn',
    answer: 'Answer no.3 nhi pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx adkn',
  },
  {
    question: 'What is your third question sjk ad biwq bdjw qnki nakdx adkn',
    answer: 'Answer no.3 nhi pata sjk ad biwq bdjw qnki nakdx adkn lauran dg di sakl dahkhddhdalk dahdh',
  },
  {
    question: 'What is your third question sjk ad biwq bdjw qnki nakdx adkn',
    answer: 'Answer no.3 nhi pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw',
  }
]
function FAQs() {
  const [selected,setSelected]= useState(null)
  const toggle= i=>{
    if(selected===i)
    {
      return  setSelected(null)
    }
    return setSelected(i);
  }
  return (
    <div className="faq-pop-up">
      <div className="line-wise">
        {data.map((item,i)=>
        (
          <div className='item'>
          <div className='Heading' onClick={()=>toggle(i)}>
          <h3>{item.question}</h3>
         
          <span>{selected===i?'-':'+'}</span>
          </div>
          <div className={selected===i?'description_all':'description'}>
          <div className='checkup'>{item.answer}</div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TicketHousePopUp = ({ PopUp, setPopUp, hoverOn }) => {
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
      className={`header-pop-up ${PopUp ? 'show' : 'hide'}`}
      onMouseLeave={() => setPopUp(false)}
    >
      {hoverOn === 'Ticket House' ? (
        <div>
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
      ) : (
        <FAQs />
      )}
    </div>
  );
};

export default TicketHousePopUp;
