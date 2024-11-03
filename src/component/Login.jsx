// src/components/Login.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../apis/api'
import AuthContext from '../context/authcontent';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {postloginData} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    postloginData(email,password)

  };
  useEffect(() => {
    const isLogin = localStorage?.getItem('access_token');
    if (isLogin) {
        navigate('/dashboard');
    }
}, []);

  return (
    <div style={{margin:"300px"}}>

    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
          />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
          />
        <button type="submit" style={styles.button}>Login</button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
          </div>
  );
}

const styles = {
  container: {
    maxWidth: '300px',
    marginTop: '300px', 
    margin: 'auto',
    padding: '1em',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  
  },
  input: {
    marginBottom: '1em',
    padding: '0.5em',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5em',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '0.9em',
  },
};

export default Login;
