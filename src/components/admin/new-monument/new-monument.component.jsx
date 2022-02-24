import { useState, useContext } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import FormInput from '../../form-input/form-input.component';

import { serverBaseUrlContext } from '../../../contexts';

import './new-monument.styles.scss';

const NewMonument = ({ currentUser }) => {
  const serverBaseUrl = useContext(serverBaseUrlContext);
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    opening_time: '',
    closing_time: '',
    foreign_tourist_pricing: '',
    indian_tourinst_pricing: '',
    children_below_15_years_pricing: '',
    location: '',
    images: null
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = e => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    console.log(formData);
    const fd = new FormData();
    Object.values(formData.images).map(file => fd.append('image', file));
    for (let name in formData) {
      if (name === 'images') continue;
      fd.append(name, formData[name]);
    }
    try {
      const resp = await axios.post(
        `${serverBaseUrl}/api/monuments/upload`,
        fd,
        {
          headers: {
            'x-api-authentication': currentUser.token
          }
        }
      );
      alert(resp.data);
      setDisabled(false);
    } catch (err) {
      alert(err.message);
    }
    setFormData({
      name: '',
      about: '',
      opening_time: '',
      closing_time: '',
      foreign_tourist_pricing: '',
      indian_tourinst_pricing: '',
      children_below_15_years_pricing: '',
      location: '',
      images: null
    });
  };

  return (
    <div className='new-monument-container'>
      <h1 className='heading'>ADD NEW MONUMENTS</h1>
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='new-monument-form'
      >
        <div className='form-input-container'>
          <div>
            <FormInput
              name='name'
              label='Name'
              value={formData.name}
              onChange={handleChange}
              required
            />

            <FormInput
              name='opening_time'
              label='Opening time'
              value={formData.opening_time}
              onChange={handleChange}
              required
            />
            <FormInput
              name='closing_time'
              label='Closing time'
              value={formData.closing_time}
              onChange={handleChange}
              required
            />
            <FormInput
              name='location'
              label='Location'
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className='ticket-pricing'>
              <span>
                <b>Ticket Pricing in Rs.</b>
              </span>
              <FormInput
                name='foreign_tourist_pricing'
                label='Foreign tourist'
                value={formData.foreign_tourist_pricing}
                onChange={handleChange}
                required
              />
              <FormInput
                name='indian_tourinst_pricing'
                label='Indian tourinst'
                value={formData.indian_tourinst_pricing}
                onChange={handleChange}
                required
              />
              <FormInput
                name='children_below_15_years_pricing'
                label='Children below 15 years'
                value={formData.children_below_15_years_pricing}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type='file'
              name='images'
              label='Images'
              onChange={handleImageChange}
              multiple
              required
            />
          </div>
        </div>
        <div className='text-area-container'>
          <label className='label'>About</label>
          <textarea
            name='about'
            label='About'
            value={formData.about}
            onChange={handleChange}
            rows='10'
            className='textarea'
            required
          />
        </div>
        <button className='submit-button' disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(NewMonument);
