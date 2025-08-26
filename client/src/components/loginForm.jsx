
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/login.css";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });

      localStorage.setItem('username', res.data.user.name);
      // localStorage.setItem('token', res.data.token); // Optional
      setMsg('✅ Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setMsg('❌ Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        className="login-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <div className="login-forgot">
        <a href="#">Forgot Password?</a>
      </div>
      <button className="login-btn" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {msg && <p className={`login-msg ${msg.includes('✅') ? 'success' : 'error'}`}>{msg}</p>}
    </form>
  );
};

export default LoginForm;
