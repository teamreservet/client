import { useState } from 'react';
import FaqsCards from '../faqs-cards-pop-up/faqs-cards-pop-up.component';
import './faqs-pop-up.styles.scss';

import faqsPopup1 from '../../assets/faqs-popup-1.svg';
import faqsPopup2 from '../../assets/faqs-popup-2.svg';
import faqsPopup3 from '../../assets/faqs-popup-3.svg';

const data = [
  
  {
    question:
      'Can I visit the Taj Mahal or other Historical monuments during my travel to India during Covid 19?',
    answer: 'Taj Mahal, along with all the centrally protected monuments, sites and Museums (under ASI), is open. Still, safety guidelines such as proper social distancing, regular hand sanitising will have to be strictly followed. The number of visitors have been restricted to 5000 tourists each day at the Taj Mahal to avoid overcrowding. Entry tickets must be purchased online. Ticket counters will not be open.'
  },
  {
    question: 'Do the customer Need Medical/travel Insurance ?',
    answer: 'Yes. It is advisable that you buy a comprehensive medical / travel insurance in advance from your country before travelling to India.'
  },
  {
    question: 'What documents are required for authentication purpose while signup onto the website ?',
    answer:
      'The documents required for authentication purpose is either Adhaar Card, Driving License, Passport,Visa as per provide by the government body'
  },
  {
    question: 'Do You Have Experienced Guides in Different Cities of India ?',
    answer:
      'We have English speaking guides all over INDIA. At the place of your destination you will also find french , German , Spanish ,Italian and Japenese and other language speaking guides'
  },
  {
    question: 'If user Come Across Any Problem During the Trip, How Would You we help them ?',
    answer:
      'We provide truly 24 X 7 assistance. Our office is open 24 hours a day which means that you will always have someone to assist you even at any point of time. We shall also give you mobile nos. of executives who you may call in case of any need .'
  }
];
const FAQs = () => {
  const [selected, setSelected] = useState(null);
  const toggle = i => {
    if (selected === i) {
      return setSelected(null);
    }
    return setSelected(i);
  };
  return (
    <div className='faq-pop-up'>
      <div className='faqcards'>
        <FaqsCards
          image_background={faqsPopup1}
          Heading_cards='Step 1'
          detailing='HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO'
        />
        <FaqsCards
          image_background={faqsPopup2}
          Heading_cards='Step 2'
          detailing='HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO'
        />
        <FaqsCards
          image_background={faqsPopup3}
          Heading_cards='Step 3'
          detailing='HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO'
        />
      </div>
      {data.map((item, i) => (
        <div className='item' key={i}>
          <div className='Heading' onClick={() => toggle(i)}>
            <h3>{item.question}</h3>

            <span>{selected === i ? '-' : '+'}</span>
          </div>
          <div className={selected === i ? 'description_all' : 'description'}>
            <div className='checkup' onClick={() => toggle(i)}>
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
