import './custom-button.styles.scss';

const CustomButtom = ({ children }) => {
  return (
    <div>
      <button className='custom-button'>{children}</button>
    </div>
  );
};

export default CustomButtom;
