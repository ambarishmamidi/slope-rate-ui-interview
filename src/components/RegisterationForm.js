import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    course: '',
    mobile: '',
  });

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [pinVerified] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!userData.fullName || !userData.email || !userData.course || !userData.mobile) {
      alert('Please fill out all fields');
      return;
    }

    try {
      console.log('Submitting form data:', userData);

      // Make a POST request to the registration endpoint
      const response = await axios.post(
        'https://slopre-rate-exam-a315a351a951.herokuapp.com/api/registration/register/',
        userData
      );

      // Handle the response from the backend
      console.log('API Response:', response);

      // Update the list of registered users after successful registration
      if (response.status === 200) {
        const newUser = response.data;
        setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);
        setIsRegistered(true);
        setUserData({
          fullName: '',
          email: '',
          course: '',
          mobile: '',
        });
        alert('Data Registered Successfully');
      } else {
        // Handle registration failure
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
      console.error('Status:', error.response?.status);
      console.error('Message:', error.response?.data?.message);
    }
  };

  /* const handleDelete = async (mobile) => {
    // Ask for the PIN only if it's not verified yet
    if (!pinVerified) {
      const enteredPin = prompt('Enter PIN for deletion:');
      if (enteredPin === '12345') {
        setPinVerified(true);
      } else {
        alert('Incorrect PIN. Deletion failed.');
        return;
      }
    }

    try {
      // Make a DELETE request to the registration endpoint with the mobile number parameter
      const response = await axios.delete(
        `https://slopre-rate-exam-a315a351a951.herokuapp.com/api/registration/delete/${mobile}`
      );

      // Handle the response from the backend
      console.log('Delete Response:', response);

      // Update the list of registered users after successful deletion
      if (response.status === 200) {
        setRegisteredUsers((prevUsers) => prevUsers.filter((user) => user.mobile !== mobile));
        alert('Data Deleted Successfully');
      } else {
        // Handle deletion failure
        console.error('Deletion failed:', response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error('Error deleting user:', error);
      console.error('Status:', error.response?.status);
      console.error('Message:', error.response?.data?.message);
    }
  };  */



  const handleDelete = async (mobile) => {

    try{ 

    let enteredPin;

    // Ask for the PIN only if it's not verified yet
    if (!pinVerified) {
      enteredPin = prompt('Enter PIN for deletion:');
      if (enteredPin !== '12345') {
      //   // setPinVerified(true);
      // } else {
        alert('Incorrect PIN. Deletion failed.');
        return;
      }
    }
  
    // try {
      // Make a DELETE request to the registration endpoint with the mobile number parameter
      const response = await axios.delete(
        `https://slopre-rate-exam-a315a351a951.herokuapp.com/api/registration/delete/${mobile}`
      
       
       
    );
     
      
  
      // Handle the response from the backend
      console.log('Delete Response:', response);
  
      // Update the list of registered users after successful deletion
      if (response.status === 200) {
        // setRegisteredUsers((prevUsers) => prevUsers.filter((user) => user.mobile !== mobile));
       


      //   // Fetch the updated list of users immediately after deletion
      // const updatedUsersResponse = await axios.get(
      //   'https://slopre-rate-exam-a315a351a951.herokuapp.com/api/registration/all'
      // );
      // const updatedUsersData = updatedUsersResponse.data;

      // if (Array.isArray(updatedUsersData)) {
      //   setAllUsers(updatedUsersData);
      // } else {
      //   console.error('Unexpected response format:', updatedUsersData);
      // }

       // Instead of fetching the updated list, manually filter out the deleted user
       setAllUsers((prevUsers) => prevUsers.filter((user) => user.mobile !== mobile));

       
       
       
        alert('Data Deleted Successfully');

         // Wait for the data to be deleted before triggering a refetch
        // await axios.get('https://slopre-rate-exam-a315a351a951.herokuapp.com/api/registration/all');

        // Update the isRegistered state to trigger a refetch of data
        // setIsRegistered((prev) => !prev);

      } else {
        // Handle deletion failure
        console.error('Deletion failed:', response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error('Error deleting user:', error);
      console.error('Status:', error.response?.status);
      console.error('Message:', error.response?.data?.message);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://slopre-rate-exam-a315a351a951.herokuapp.com/api/registration/all'
        );
        const responseData = response.data;

        // Assuming responseData is an array of users
        if (Array.isArray(responseData)) {
          setAllUsers(responseData);
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
  }, [registeredUsers,pinVerified]); // Add isRegistered to the dependency array to fetch updated data after registration

  
  return (
    <div className='registration-page'>
      <div className='registration-container'>
        <h2 className='container-d'>User Registration</h2>
        <form onSubmit={handleSubmit} className='submit-btn'>
          {/* Your form input fields go here */}
          <div className='input-label1'>
            <label className='heading'>
              FullName 
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
              Email 
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
              Course
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
              Mobile
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
          <button type='submit' className='register-button-2' style={{ backgroundColor: 'red' }}>
            Register
          </button>
        </form>
      </div>

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className='table table-stripped'>
            {/* Your table structure goes here */}
            <thead><tr>
      <th className='bg-success text-light'>Full Name</th>
      <th className='bg-success text-light'>Email</th>
      <th className='bg-success text-light'>Course</th>
      <th className='bg-success text-light'>Mobile</th>
      <th className='bg-success text-light'>Delete</th></tr>
      </thead>
      <tbody>
      {Array.isArray(allUsers) ? (
        allUsers.map((user, index) => (
          <tr key={index}>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.course}</td>
            <td>{user.mobile}</td>
            <td>
            <button onClick={() => handleDelete(user.mobile)} className='btn btn-danger '>Delete</button>
          </td>
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

export default RegistrationForm;
