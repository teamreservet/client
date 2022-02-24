import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='input-group'>
      <input {...otherProps} className='form-input' />
      {label ? (
        <label
          className={`form-input-label ${
            otherProps.value.length ? 'shrink' : ''
          }`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
