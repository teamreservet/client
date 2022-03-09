import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { serverBaseUrlContext } from '../../../contexts';

import FormInput from '../../../components/form-input/form-input.component';
import CustomButtom from '../../../components/custom-button/custom-button.component';
import Ticket from '../../../components/ticket/ticket.component';

import './verify-ticket.styles.scss';

const VerifyTicket = ({ currentUser }) => {
  const params = useParams();
  const [ticketId, setTicketId] = useState(params.id ? params.id : '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [ticketInfo, setTicketInfo] = useState(null);

  const serverBaseUrl = useContext(serverBaseUrlContext);

  const handleChange = e => {
    setTicketId(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setTicketInfo(null);
    setError('');
    setSuccess('');
    try {
      const resp = await axios.post(
        `${serverBaseUrl}/api/ticket/verify-ticket`,
        { ticketId },
        {
          headers: {
            'x-api-authentication': currentUser.token
          }
        }
      );
      setSuccess('Ticket Verified!');
      setTicketInfo(resp.data);
    } catch (err) {
      setError("Ticket doesn't exist or you are not the admin");
    }
  };

  return (
    <div className='verify-ticket'>
      <h1 className='heading'>Ticket Verification Page</h1>
      <div className='background' />
      <form onSubmit={handleSubmit} className='ticket-verification-form'>
        <FormInput
          name='ticketId'
          placeholder='Ticket Id'
          value={ticketId}
          onChange={handleChange}
          required
        />
        <CustomButtom>Verify</CustomButtom>
      </form>
      {ticketInfo && (
        <Ticket
          {...ticketInfo}
          amount={ticketInfo.totalPrice}
          ticketId={ticketInfo.id}
        />
      )}
      {error.length !== 0 && <div className='error'>{error}</div>}
      {success.length !== 0 && <div className='success'>{success}</div>}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(VerifyTicket);
