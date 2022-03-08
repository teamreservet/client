import React from 'react'
import './faqs-cards-pop-up.styles.scss';
function FaqsCards(props) {
   
  return (
    <div className='FAQ_container'>
    <div className='Title_Faq'>
      <h3>{props.Heading_cards}</h3>
    </div>
    
    <div className='FAQ_image'>
    
    <img  src={props.image_background} alt='' />
    </div>

    </div>
  )
}

export default FaqsCards;