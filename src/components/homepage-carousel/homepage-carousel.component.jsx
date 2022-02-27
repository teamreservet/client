import { useEffect, useState, useRef } from 'react';

import './homepage-carousel.styles.scss';

const HomePageCarousel = ({ images }) => {
  const length = images.length;
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(length - 1);
  const [secPrev, setSecPrev] = useState(length - 2);
  const [next, setNext] = useState(1);

  const handleNext = () => {
    setSecPrev(prev);
    setPrev(current);
    setCurrent(current === length - 1 ? 0 : current + 1);
    setNext(next === length - 1 ? 0 : next + 1);
  };

  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(handleNext, 2000);

    return () => {
      resetTimeout();
    };
  }, [current, prev, secPrev, next]);

  return (
    <div className='carousel-container'>
      <div className='carousel'>
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`slide ${secPrev === idx ? 'secPrev' : ''}`}
          >
            {secPrev === idx && <img src={image} />}
          </div>
        ))}
        {images.map((image, idx) => (
          <div key={idx} className={`slide ${prev === idx ? 'prev' : ''}`}>
            {prev === idx && <img src={image} />}
          </div>
        ))}
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`slide ${
              current === idx ? 'current' : next === idx ? 'next' : ''
            }`}
          >
            {current === idx && <img src={image} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageCarousel;
