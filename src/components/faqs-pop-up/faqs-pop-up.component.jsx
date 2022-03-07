import { useState } from 'react';
import FaqsCards from '../faqs-cards-pop-up/faqs-cards-pop-up.component';
import './faqs-pop-up.styles.scss';

const data = [
  {
    question: 'What is your first question sjk ad biwq bdjw qnki nakdx adkn',
    answer: 'Answer no.1 nhi pata'
  },
  {
    question:
      'What is your second question sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx adkn',
    answer: 'Answer no.2 nhi pata sjk ad biwq bdjw qnki nakdx adkn'
  },
  {
    question: 'What is your third question sjk ad biwq bdjw qnki nakdx adkn',
    answer:
      'Answer no.3 nhi pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx adkn'
  },
  {
    question: 'What is your third question sjk ad biwq bdjw qnki nakdx adkn',
    answer:
      'Answer no.3 nhi pata sjk ad biwq bdjw qnki nakdx adkn lauran dg di sakl dahkhddhdalk dahdh'
  },
  {
    question: 'What is your third question sjk ad biwq bdjw qnki nakdx adkn',
    answer:
      'Answer no.3 nhi pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw qnki nakdx pata sjk ad biwq bdjw qnki nakdx adkn sjk ad biwq bdjw'
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
      
       image_background='https://www.w3schools.com/html/pic_trulli.jpg'
       Heading_cards='Step 1'
       detailing='HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO'
     />
      <FaqsCards
      
       image_background='https://www.w3schools.com/html/pic_trulli.jpg'
       Heading_cards='Step 2'
       detailing='HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO UNCLE NAMASTE CHALO KAAM KI BAAT PR AATE HAI HELLO'
     />
      <FaqsCards
    
       image_background='https://www.w3schools.com/html/pic_trulli.jpg'
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
