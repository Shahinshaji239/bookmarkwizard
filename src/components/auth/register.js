import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const registerUser = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConf
    };

    axios.post('https://demo-blog.mashupstack.com/api/register', user)
      .then(response => {
        setErrorMessage('');
        navigate('/');
      })
      .catch(error => {
        if (error.response?.data?.errors) {
          setErrorMessage(Object.values(error.response.data.errors).join(' '));
        } else {
          setErrorMessage('Failed to connect to API');
        }
      });
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1612832020933-3c84a43c2f48?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Navbar />
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 15px'
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(5px)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '500px'
          }}
        >
          <h2 className="text-center mb-4 fw-semibold">Create Your Account</h2>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={passwordConf}
              onChange={(e) => setPasswordConf(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-dark btn-lg" onClick={registerUser}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
