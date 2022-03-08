import { useState } from 'react';
import FaqsCards from '../faqs-cards-pop-up/faqs-cards-pop-up.component';
import './faqs-pop-up.styles.scss';

import faqsPopup1 from '../../assets/faqs-popup-1.svg';
import faqsPopup2 from '../../assets/faqs-popup-2.svg';
import faqsPopup3 from '../../assets/faqs-popup-3.svg';

const data = [
  {
    question: 'How can I pay on the website?',
    answer:
      'You can easily pay on our website via credit/debit cards of any bank. We also accept all kinds of e-payment such as UPI and digital wallet payments like PayPal, Paytm, google pay, etc.'
  },
  {
    question:
      'Which documents are needed at the time of booking and checking of tickets?',
    answer:
      'At the time of ticket booking, you just need any of your id proof such as an Aadhaar card, Passport, or Pan card and at the time of ticket checking at counters, you will only need the e-ticket'
  },
  {
    question: 'How many tickets can I buy at a time?',
    answer:
      'Maximum 5 Adults and at most 3 Children can visit their favorite destination place from one account.'
  },
  {
    question: 'My phone does not support NFC.Now what?',
    answer:
      'If your phone does not support NFC then there is alternative of QR based scanning'
  },

  {
    question:
      'My transaction got canceled during the booking of the ticket now what?',
    answer:
      'If the amount has been deducted from your account and the transaction got canceled it will be refunded back within 2-3 days'
  },
  {
    question: 'What is about the  refund policy?',
    answer:
      'If the user wants to cancel the ticket the 10% amount will be deducted and the rest of the amount will be returned back'
  },

  {
    question:
      'If user Come Across Any Problem During the Trip, How Would You we help them ?',
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
        <FaqsCards image_background={faqsPopup1} Heading_cards='Step 1' />
        <FaqsCards image_background={faqsPopup2} Heading_cards='Step 2' />
        <FaqsCards image_background={faqsPopup3} Heading_cards='Step 3' />
      </div>
      {data.map((item, i) => (
        <div className='item' key={i} onClick={() => toggle(i)}>
          <div className='Heading'>
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
