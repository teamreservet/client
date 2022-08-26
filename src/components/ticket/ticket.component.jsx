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
  issuer,
  ...otherProps
}) => {
  return (
    <div className='ticket' {...otherProps}>
      <div className='ticket-qr-wrapper'>
        <img
          src={`http://api.qrserver.com/v1/create-qr-code/?data=https://reservet.netlify.app/verify-ticket/${ticketId}`}
          alt='qr-code'
          className='ticket-qr-code'
          width='370px'
          height='370px'
        />
      </div>

      <div className='ticket-details'>
        <img src={reservetLogo} alt='' className='reservet-logo-test' />
        <p className='booking-status'>Ticket Booked Successfully!!!</p>
        <h2 className='tid-wrapper'>
          TID - <span className='tid'>{ticketId}</span>
        </h2>
        <h3 className='monument_name'>
          {monumentName} ,{monumentPlace}
        </h3>
        <p>Ticket Issued To : {issuer}</p>
        <p>
          Date:{' '}
          {date
            .split('-')
            .reverse()
            .join('-')}
        </p>
        {indianCount ? <p>Indian count: {indianCount}</p> : null}
        {foreignerCount ? <p>Foreigner count: {foreignerCount}</p> : null}
        {childrenCount ? <p>Children count: {childrenCount}</p> : null}

        <h3 className='subtotal'>Subtotal: {amount}</h3>
      </div>
    </div>
  );
};

export default Ticket;
