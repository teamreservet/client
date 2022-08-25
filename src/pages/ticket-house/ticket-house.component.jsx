import { useState, useContext } from 'react';
import { connect } from 'react-redux';

import Loader from '../../components/loader/loader.component';
import MounmentCard from '../../components/monument-card/monument-card.component';
import FilterCard from '../../components/filter-card/filter-card.component';
import CheckoutBox from '../../components/checkout/checkout.component';
import Chatbot from '../../components/chat-bot/chat-bot.component';

import { searchQueryContext } from '../../contexts';

import monument from '../../assets/monument.svg';
import museum from '../../assets/museum.svg';
import heritage from '../../assets/heritage.svg';

import './ticket-house.styles.scss';

const TicketHouse = ({ monuments, statesData }) => {
  const [searchQuery, setSearchQuery] = useContext(searchQueryContext);
  const [tagFilter, setTagFilter] = useState('');
  const [state, setState] = useState('');
  const [checkoutMonumentDetails, setCheckoutMonumentDetails] = useState(null);

  const handleChangeInput = e => {
    setTagFilter('');
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
      <Chatbot />
      {checkoutMonumentDetails && (
        <div
          className='checkout-box-wrapper'
          onClick={() => setCheckoutMonumentDetails(null)}
        >
          <CheckoutBox
            checkoutMonumentDetails={checkoutMonumentDetails}
            setCheckoutMonumentDetails={setCheckoutMonumentDetails}
          />
        </div>
      )}
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
        <span className='down-arrow'>&#9660;</span>
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
        <span className='down-arrow'>&#9660;</span>
        <input
          className='search-field options'
          placeholder='Type place or name...'
          value={searchQuery}
          onChange={handleChangeInput}
        />
      </div>
      {searchQuery.length === 0 && (
        <div className='filter-card-wrapper'>
          <FilterCard
            name='monuments'
            image={monument}
            onClick={() =>
              tagFilter === 'monumemt'
                ? setTagFilter('')
                : setTagFilter('monument')
            }
          />
          <FilterCard
            name='heritages'
            image={heritage}
            onClick={() =>
              tagFilter === 'heritage'
                ? setTagFilter('')
                : setTagFilter('heritage')
            }
          />
          <FilterCard
            name='museums'
            image={museum}
            onClick={() =>
              tagFilter === 'museum' ? setTagFilter('') : setTagFilter('museum')
            }
          />
        </div>
      )}
      <div className='monuments'>
        {monuments ? (
          monuments
            .filter(
              monument => {
                if (tagFilter.length === 0) {
                  return (
                    monument.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    monument.location
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  );
                } else {
                  return monument.tags.includes(tagFilter);
                }
              }
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
              <MounmentCard
                key={monument._id}
                ind={ind}
                monument={monument}
                setCheckoutMonumentDetails={setCheckoutMonumentDetails}
              />
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
  statesData: state.statesData.statesData,
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(TicketHouse);
