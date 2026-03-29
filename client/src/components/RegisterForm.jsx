
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState(''); // "success" or "error"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    console.log("Registering:", username, email, password);
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password
      });
      setMsg("Registered successfully! Redirecting to login...");
      setMsgType("success");
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      setMsg(err.response?.data?.message || "Registration failed");
      setMsgType("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>

      {msg && (
        <p className={`msg ${msgType === 'success' ? 'msg-success' : 'msg-error'}`}>
          {msg}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;




