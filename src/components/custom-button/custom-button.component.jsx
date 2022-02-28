import './custom-button.styles.scss';

const CustomButtom = ({ children, bookNow, big }) => {
  return (
    <button
      className={`custom-button ${bookNow ? 'book-now' : ''} ${
        big ? 'big' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default CustomButtom;
