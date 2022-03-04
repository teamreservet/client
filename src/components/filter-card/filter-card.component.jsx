import './filter-card.styles.scss';

import image from '../../assets/grid-1.jpeg';

const FilterCard = ({ name}) => {
    return (
        <div className='filter-card'>
            <img className='filter-img' src={image} alt='' />
            <div className='text-wrapper'>
            <h1 className='filter-img-text'>{name}</h1>
            </div>
        </div>
    )
}

export default FilterCard;