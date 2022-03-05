import { useState } from 'react';
import { connect } from 'react-redux';

import Loader from '../../components/loader/loader.component';
import MounmentCard from '../../components/monument-card/monument-card.component';
import FilterCard from '../../components/filter-card/filter-card.component';

import arrow from '../../assets/arrow.png';
import monument from '../../assets/monument.png';
import museum from '../../assets/museum.jpg';
import heritage from '../../assets/heritage.jpg';

import './ticket-house.styles.scss';

const TicketHouse = ({ monuments, statesData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [state, setState] = useState('');

  const handleChangeInput = e => {
    setSearchQuery(e.target.value);
  };
  const handleChangeState = e => {
    const { value } = e.target;
    setState(value);
    setSearchQuery(value);
  };
  const handleChangeCity = e => {
    const { value } = e.target;
    if (value) setSearchQuery(`${value}, ${state}`);
    else setSearchQuery(state);
  };

  return (
    <div className='ticket-house'>
      <h1 className='heading'>Ticket Counter</h1>
      <div className='background' />
      <div className='filter-monuments'>
        <select
          name='states'
          onChange={handleChangeState}
          className='options dropdown'
        >
          <option value=''>Select State</option>
          {statesData
            ? Object.keys(statesData).map((state, idx) => (
                <option value={state} key={idx}>
                  {state}
                </option>
              ))
            : null}
        </select>
        <img src={arrow} alt='down-arrow' className='down-arrow' />
        <select
          name='cities'
          onChange={handleChangeCity}
          className='options dropdown'
        >
          <option value=''>Select City</option>
          {state
            ? statesData[state].map((city, idx) => (
                <option value={city} key={idx}>
                  {city}
                </option>
              ))
            : null}
        </select>
        <img src={arrow} alt='down-arrow' className='down-arrow' />
        <input
          className='search-field options'
          placeholder='Type place or name...'
          value={searchQuery}
          onChange={handleChangeInput}
        />
      </div>
      <div className='filter-card-wrapper'>
        <FilterCard name='monuments' image={monument} />
        <FilterCard name='heritages' image={heritage} />
        <FilterCard name='museums' image={museum} />
      </div>
      <div className='monuments'>
        {monuments ? (
          monuments
            .filter(
              monument =>
                monument.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                monument.location
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              // {
              //   let opt = false;
              //   const name = monument.name.toLowerCase().split(' ');
              //   name.forEach(word => {
              //     opt = opt | (word.indexOf(searchQuery.toLowerCase()) === 0);
              //     if (opt) return true;
              //   });
              //   const location = monument.location.toLowerCase().split(' ');
              //   location.forEach(loc => {
              //     opt = opt | (loc.indexOf(searchQuery.toLowerCase()) === 0);
              //     if (opt) return true;
              //   });
              //   return opt;
              // }
            )
            .map((monument, ind) => (
              <MounmentCard key={monument._id} ind={ind} monument={monument} />
            ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  monuments: state.monument.monuments,
  statesData: state.statesData.statesData
});

export default connect(mapStateToProps)(TicketHouse);
