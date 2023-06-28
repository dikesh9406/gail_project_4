import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    motorName,
    motorBrand,
    motorLocation,
    motorType,
    jobTypeOptions,
    motorStatus,
    statusOptions,
    handleChange,
    clearValues,
  } = useAppContext();
  const [userType, setUserType] = useState('');

  useEffect(() => {
    fetch('/api/v1/auth/getCurrentUser')
      .then(response => response.json())
      .then(data => {
        setUserType(data.user.userType);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!motorName || !motorBrand || !motorLocation) {
      displayAlert();
      return;
    }

    const formData = {
      motorName,
      motorBrand,
      motorLocation,
      motorStatus,
      motorType,
    };

    try {
      if (isEditing) {
        await editJob(formData);
      } else {
        await createJob(formData);
      }

      console.log('Form data sent successfully');
      // Optionally, you can display a success message or redirect to another page
    } catch (error) {
      console.error('Error sending form data:', error);
      // displayAlert();
    }
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const createJob = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/motor', formData);
      console.log('Job created:', response.data);
      // Optionally, you can perform additional actions after a successful create request
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  };

  const editJob = async (formData) => {
    try {
      const response = await axios.put('/api/v1/motor', formData);
      console.log('Job edited:', response.data);
      // Optionally, you can perform additional actions after a successful edit request
    } catch (error) {
      console.error('Error editing job:', error);
      throw error;
    }
  };

  if (userType === 'Admin') {
    return (
      <Wrapper>
        <form className='form'>
          <h3>{isEditing ? 'Edit Motor' : 'Add Motor'}</h3>
          {showAlert && <Alert />}
          <div className='form-center'>
            {/* motorName */}
            <FormRow
              type='text'
              labelText='Motor Name'
              name='motorName'
              value={motorName}
              handleChange={handleJobInput}
            />
            {/* motorBrand */}
            <FormRow
              type='text'
              labelText='Motor Brand'
              name='motorBrand'
              value={motorBrand}
              handleChange={handleJobInput}
            />
            {/* location */}
            <FormRow
              type='text'
              labelText='Motor Location'
              name='motorLocation'
              value={motorLocation}
              handleChange={handleJobInput}
            />
            {/* Motor status */}
            <FormRowSelect
              name='motorStatus'
              labelText='Motor Status'
              value={motorStatus}
              handleChange={handleJobInput}
              list={statusOptions}
            />
            {/* job type */}
            <FormRowSelect
              name='motorType'
              labelText='Motor Type'
              value={motorType}
              handleChange={handleJobInput}
              list={jobTypeOptions}
            />
            {/* btn container */}
            <div className='btn-container'>
              <button
                type='submit'
                className='btn btn-block submit-btn'
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </button>
              <button
                className='btn btn-block clear-btn'
                onClick={(e) => {
                  e.preventDefault();
                  clearValues();
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </Wrapper>
    );
  } else {
    console.log('Only admin can access this page');
    return (<h1>Only admin can access this page</h1>)
  }
};

export default AddJob;