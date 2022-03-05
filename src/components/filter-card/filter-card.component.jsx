import './filter-card.styles.scss';

const FilterCard = ({ name, image }) => {
  return (
    <div className='filter-card'>
      <img className='filter-img' src={image} alt='' />
      <div className='text-wrapper'>
        <h1 className='filter-img-text'>{name.toUpperCase()}</h1>
      </div>
    </div>
  );
};

export default FilterCard;
