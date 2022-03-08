import './ticket.styles.scss';

const Ticket = ({
  ticketId,
  monumentName,
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
        <p>id: {ticketId}</p>
        <img
          src={`http://api.qrserver.com/v1/create-qr-code/?data=https://reservet.netlify.app/verify-ticket/${ticketId}`}
          alt='qr-code'
          className='ticket-qr-code'
        />
        <h3>{monumentName}</h3>
      </div>
      <div className='ticket-details'>
        <p>Name: {issuer}</p>
        {indianCount ? <p>Indian: {indianCount}</p> : null}
        {foreignerCount ? <p>Foreigner: {foreignerCount}</p> : null}
        {childrenCount ? <p>Children: {childrenCount}</p> : null}
        <p>Date: {date}</p>
        <p className='subtotal'>Subtotal: {amount}</p>
      </div>
    </div>
  );
};

export default Ticket;
