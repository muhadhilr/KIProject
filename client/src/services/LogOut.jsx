import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
