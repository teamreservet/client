import './custom-button.styles.scss';

const CustomButtom = ({ children, bookNow, big, ...otherProps }) => {
  return (
    <button
      {...otherProps}
      className={`custom-button ${bookNow ? 'book-now' : ''} ${
        big ? 'big' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default CustomButtom;
