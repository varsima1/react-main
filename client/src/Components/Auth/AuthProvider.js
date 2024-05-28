import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode directly

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const userObject = useMemo(() => {
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }, [token]);

  const login = (userData) => {
    const { token } = userData;
    setToken(token); // Set token from userData
    localStorage.setItem('token', token);
    localStorage.setItem('loginTime', new Date().toISOString());
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    navigate('/');
  };

  const createMessage = async (messageData) => {
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch('http://localhost:3001/messages/create', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(messageData) // Add your message data here
      });

      if (!response.ok) {
        throw new Error('Error creating message');
      }

      // Handle successful response
    } catch (error) {
      console.error('Error creating message:', error.message);
      // Handle error
    }
  };

  return (
    <AuthContext.Provider value={{ token, userObject, login, logout, createMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
