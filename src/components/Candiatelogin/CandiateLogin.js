import React, { useState } from 'react';
import BookingPage from '../BookingPage';

function CandidateLogin() {
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Replace 'yourSecretPassword' with the actual password you want to use
    if (password === 'slope') {
      setIsPasswordCorrect(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className='justify-center flex-col flex items-center'>
      {!isPasswordCorrect ? (
        <div className='justify-center flex-col flex items-center border-4 p-2 mt-4 rounded-md'>
          <label className='mb-2'> Enter Password: </label><br/>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className='mb-2'/><br/>
          <button onClick={handleLogin} className='bg-blue-500 text-white rounded-md p-2 px-4'>Login</button>
        </div>
      ) : (
        <BookingPage />
      )}
    </div>
  );
}

export default CandidateLogin;
