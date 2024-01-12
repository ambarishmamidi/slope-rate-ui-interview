import React, { useState } from 'react';
import './UserRegistrationForm.css';

const UserRegistrationForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    course: '',
    mobile:'',
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isRegistered, setRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!userData.name || !userData.email || !userData.course || !userData.mobile) {
      alert('Please fill out all fields');
      return;
    }

    // Update the array with the new user data
    setRegisteredUsers((prevUsers) => [
      ...prevUsers,
      {
        name: userData.name,
        email: userData.email,
        course: userData.course,
        course: userData.mobile,
      },
    ]);

    // Optionally, you can reset the form fields after submission
    setUserData({
      name: '',
      email: '',
      course: '',
      mobile: '',
    });

    // Set the registration status to true
    setRegistered(true);
  };
  console.log(registeredUsers)

  return (
    <div className='registration-page'>
      <div className='registration-container'>
        <h2 className='container-d'>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-label'>
            <label className='heading'>
              Full Name:
              <input
                type='text'
                name='name'
                onChange={handleChange}
                value={userData.name || ''}
                className='container'
                required
              />
            </label>
          </div>
          <div className='input-label'>
            <label className='heading'>
              Email:
              <input
                type='email'
                name='email'
                onChange={handleChange}
                value={userData.email || ''}
                className='input-field'
                required
              />
            </label>
          </div>
          <div className='input-label'>
            <label className='heading'>
              Course:
              <input
                type='text'
                name='course'
                onChange={handleChange}
                value={userData.course || ''}
                className='input-field'
                required
              />
            </label>
          </div>
          <div className='input-label'>
            <label className='heading'>
              Mobile:
              <input
                type='text'
                name='mobile'
                onChange={handleChange}
                value={userData.mobile || ''}
                className='input-field'
                required
              />
            </label>
          </div>
          <button type='submit' className='submit-button'>
            Register
          </button>
        </form>
      </div>

      {/* Display the registered users */}
      {isRegistered && (
        <div>
          <h2>Registered Users</h2>
          <ul>
            {registeredUsers.map((user, index) => (
              <li key={index}>
                Name: {user.name}, Email: {user.email}, Course: {user.course}, Mobile: {user.mobile}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserRegistrationForm;
