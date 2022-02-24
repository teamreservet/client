import { useState } from 'react';
import { connect } from 'react-redux';

import MounmentCard from '../../components/monument-card/monument-card.component';

import './ticket-house.styles.scss';

const TicketHouse = ({ monuments }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  return (
    <div className='ticket-house'>
      <h1 className='heading'>Ticket House</h1>
      <div className='filter-monuments'>
        <input
          className='search-field'
          placeholder='Type place or name...'
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
      <div className='monuments'>
        {monuments
          .filter(
            monument =>
              monument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              monument.location
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .map(monument => (
            <MounmentCard key={monument._id} {...monument} />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  monuments: state.monument.monuments
});

export default connect(mapStateToProps)(TicketHouse);
