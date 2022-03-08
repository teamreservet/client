import './ticket.styles.scss';
import reservetLogo from '../../assets/reservet-logo.png';

const Ticket = ({
  ticketId,
  monumentName,
  monumentPlace,
  childrenCount,
  indianCount,
  foreignerCount,
  amount,
  date,
  issuer
}) => {
  return (
    <div className='ticket'>
      <div className='ticket-qr-wrapper'>
        <p>TID - {ticketId}</p>
        <img
          src={`http://api.qrserver.com/v1/create-qr-code/?data=https://reservet.netlify.app/verify-ticket/${ticketId}`}
          alt='qr-code'
          className='ticket-qr-code'
        />
        <h3>
          {monumentName},{monumentPlace}
        </h3>
      </div>
      <div className='ticket-details'>
        <img src={reservetLogo} alt='' className='reservet-logo-test' />
        <p>Ticket Issued To : {issuer}</p>
        <br />
        <p>Date: {date}</p>
        <br />
        {indianCount && <p>Indian count: {indianCount}</p>}
        {foreignerCount && <p>Foreigner count: {foreignerCount}</p>}
        {childrenCount && <p>Children count: {childrenCount}</p>}

        <h3 className='subtotal'>Subtotal: {amount}</h3>
      </div>
    </div>
  );
};

export default Ticket;
