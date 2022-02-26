import './loader.styles.scss';

const Loader = () => (
  <div>
    <div className='loader-container'></div>
    <div className='loader'>
      <span className='small-bar c-1'></span>
      <span className='small-bar c-2'></span>
      <span className='small-bar c-3'></span>
      <span className='small-bar c-4'></span>
      <span className='small-bar c-5'></span>
      <span className='small-bar c-6'></span>
      <span className='small-bar c-7'></span>
      <span className='small-bar c-8'></span>
    </div>
  </div>
);

export default Loader;
