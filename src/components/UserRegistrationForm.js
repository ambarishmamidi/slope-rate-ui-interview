import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserRegistrationForm.css';

const UserRegistrationForm = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    course: '',
    mobile: '',
  });

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isRegistered, setRegistered] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!userData.fullName || !userData.email || !userData.course || !userData.mobile) {
      alert('Please fill out all fields');
      return;
    }

    try {
      // Make a POST request to the registration endpoint
      const response = await axios.post("https://slopre-rate-exam-a315a351a951.herokuapp.com/api/registration/register", userData);

      // Handle the response from the backend
      const responseData = response.data;

      // Update the array with the new user data
      setRegisteredUsers((prevUsers) => [
        ...prevUsers,
        {
          fullName: responseData.fullName,
          email: responseData.email,
          course: responseData.course,
          mobile: responseData.mobile,
        },
      ]);

      // Optionally, reset the form fields after successful submission
      setUserData({
        fullName: '',
        email: '',
        course: '',
        mobile: '',
      });

      // Set the registration status to true
      setRegistered(true);
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields before submission
    if (!userData.fullName || !userData.email || !userData.course || !userData.mobile) {
      alert('Please fill out all fields');
      return;
    }
  
    try {
      // Make a POST request to the registration endpoint
      const response = await axios.post("https://slopre-rate-exam-a315a351a951.herokuapp.com/api/registration/register", userData);
  
      // Handle the response from the backend
      const responseData = response.data;
  
      // Check if the registration was successful
      if (response.status === 200) {
        // Update the array with the new user data
        setRegisteredUsers((prevUsers) => [
          ...prevUsers,
          {
            fullName: responseData.fullName,
            email: responseData.email,
            course: responseData.course,
            mobile: responseData.mobile,
          },
        ]);
  
        // Optionally, reset the form fields after successful submission
        setUserData({
          fullName: '',
          email: '',
          course: '',
          mobile: '',
        });
  
        // Set the registration status to true
        setRegistered(true);
      } else {
        // Handle registration failure
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
      // Log the status and message if available
      console.error('Status:', error.response?.status);
      console.error('Message:', error.response?.data?.message);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://slopre-rate-exam-a315a351a951.herokuapp.com/api/registration/all");
        const responseData = response.data;

        // Assuming responseData is an array of users
        if (Array.isArray(responseData)) {
          //setAllUsers(responseData)
          setAllUsers((prevUsers) => [...prevUsers, ...responseData]);
          //console.log("successfull getting response")
        } else {
          // Handle other response types accordingly
          console.error('Unexpected response format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Status:', error.response?.status);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(allUsers)
 
return (
    <div className='registration-page'>
      <div className='registration-container' >
        <h2 className='container-d'>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-label1'>
            <label className='heading'>
              fullName 
              <input
                type='text'
                name='fullName'
                onChange={handleChange}
                value={userData.fullName || ''}
                className='input-field'
                required
              />
            </label>
          </div>
          <div className='input-label'>
            <label className='heading'>
              email 
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
              course
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
              mobile
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
          <div>
          <button type='submit' className='submit-button'>
            Register
          </button>
          </div>
         
        </form>
      
      </div>

      Display the registered users 
      {isRegistered && (
        <div className='div-container'>
          <h2>Registered Users</h2>
          <ul style={{backgroundColor:"white",padding:"10px"}}>
            {registeredUsers.map((user, index) => (
              <li key={index}>
                Name: {user.fullName}, Email: {user.email}, Course: {user.course}, Mobile: {user.mobile}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (

      <table>
      <thead><tr><th>fullname</th>
      <th>email</th>
      <th>course</th>
      <th>mobile</th></tr>
      </thead>
      <tbody>
      {Array.isArray(allUsers) ? (
        allUsers.map((user, index) => (
          <tr key={index}>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.course}</td>
            <td>{user.mobile}</td>
          </tr>
        ))
      ) : (
        <p>No registered users available.</p>
      )}
      
      </tbody>
      </table>
      )}

      </div>
    </div>
  );
};

export default UserRegistrationForm;
