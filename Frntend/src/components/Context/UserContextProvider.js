// UserContextProvider.js
import { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import UserContext from './UserContext';

function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    userDetails: '',
    token: '',
    role: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('auth'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/user/login', {  // Updated API URL
        email,
        password,
      });

      if (response.data.status === 'success') {
        // Save tokens and user data
        const { token, refreshToken, user } = response.data;
        localStorage.setItem('auth', JSON.stringify({ token, refreshToken, user }));

        // Set user data in context
        setUser(user);
        return true;
      } else {
        console.error('Login failed:', response.data.message);
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser({ userDetails: '', token: '', role: '' });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
