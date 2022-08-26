import { useState, useContext } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import FormInput from '../../../components/form-input/form-input.component';
import Loader from '../../../components/loader/loader.component';
import InputCSV from '../../../components/input-csv/input-csv.component';

import { serverBaseUrlContext } from '../../../contexts';

import './new-monument.styles.scss';
import { useEffect } from 'react';

const NewMonument = ({ currentUser }) => {
  const serverBaseUrl = useContext(serverBaseUrlContext);
  const [jsonDataSet, setJsonDataSet] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    opening_time: '06:00 A.M.',
    closing_time: '06:00 P.M.',
    foreign_tourist_pricing: '',
    indian_tourinst_pricing: '',
    children_below_15_years_pricing: '0',
    location: '',
    tags: [],
    images: null
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCheckboxChange = e => {
    const { name } = e.target;
    let arr = formData.tags;
    if (arr.find(e => e === name)) {
      arr = arr.filter(e => e !== name);
    } else {
      arr.push(name);
    }
    setFormData({ ...formData, tags: arr });
  };
  const handleImageChange = e => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    setShowLoader(true);
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
      setShowLoader(false);
      alert(resp.data);
      setDisabled(false);
    } catch (err) {
      alert(err.message);
    }
    setFormData({
      name: '',
      about: '',
      opening_time: '06:00 A.M.',
      closing_time: '06:00 P.M.',
      foreign_tourist_pricing: '',
      indian_tourinst_pricing: '',
      children_below_15_years_pricing: '0',
      location: '',
      tags: [],
      images: null
    });
  };

  useEffect(async () => {
    if (jsonDataSet != null) {
      console.log(jsonDataSet);
      setShowLoader(true);
      const res = await axios.post(
        `${serverBaseUrl}/api/monuments/upload_many`,
        jsonDataSet,
        {
          headers: {
            'x-api-authentication': currentUser.token
          }
        }
      );
      console.log(res);
      setShowLoader(false);
      setJsonDataSet(null);
    }
  }, [jsonDataSet]);

  return (
    <div className='new-monument-container'>
      {showLoader ? <Loader /> : null}
      <InputCSV setJsonDataSet={setJsonDataSet} />
      <h1 className='heading'>ADD NEW MONUMENTS</h1>
      <div className='background' />
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='new-monument-form'
      >
        <div className='form-input-container'>
          <div>
            <FormInput
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              required
            />

            <FormInput
              name='opening_time'
              placeholder='Opening time'
              value={formData.opening_time}
              onChange={handleChange}
              required
            />
            <FormInput
              name='closing_time'
              placeholder='Closing time'
              value={formData.closing_time}
              onChange={handleChange}
              required
            />
            <FormInput
              name='location'
              placeholder='Location'
              value={formData.location}
              onChange={handleChange}
              required
            />
            <div>
              <input
                type='checkbox'
                name='monument'
                value='monument'
                onChange={handleCheckboxChange}
              />
              <label>Monument</label>
            </div>
            <div>
              <input
                type='checkbox'
                name='heritage'
                value='heritage'
                onChange={handleCheckboxChange}
              />
              <label>Heritage</label>
            </div>
            <div>
              <input
                type='checkbox'
                name='museum'
                value='museum'
                onChange={handleCheckboxChange}
              />
              <label>Museum</label>
            </div>
          </div>
          <div>
            <div className='ticket-pricing'>
              <span>
                <b>Ticket Pricing in Rs.</b>
              </span>
              <FormInput
                name='foreign_tourist_pricing'
                placeholder='Foreign tourist'
                value={formData.foreign_tourist_pricing}
                onChange={handleChange}
                required
              />
              <FormInput
                name='indian_tourinst_pricing'
                placeholder='Indian tourist'
                value={formData.indian_tourinst_pricing}
                onChange={handleChange}
                required
              />
              <FormInput
                name='children_below_15_years_pricing'
                placeholder='Children below 15 years'
                value={formData.children_below_15_years_pricing}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type='file'
              name='images'
              placeholder='Images'
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
            placeholder={formData.about}
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
