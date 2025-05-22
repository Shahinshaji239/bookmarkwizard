import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import checkGuest from "./checkguest";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const attemptLogin = async () => {
    try {
      const response = await axios.post(
        "https://demo-blog.mashupstack.com/api/login",
        { email, password }
      );
      setErrorMessage("");
      const user = {
        email: email,
        token: response.data.token,
      };
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/blog/posts");
    } catch (error) {
      if (error.response?.data) {
        const data = error.response.data;
        setErrorMessage(
          data.errors ? Object.values(data.errors).join(" ") :
            data.message || "Failed to login user. Please contact admin."
        );
      } else {
        setErrorMessage("Failed to login user. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1581091870633-3148046a9833?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 0,
          }}
        ></div>

        <div style={{ zIndex: 1, width: '100%', maxWidth: '500px', padding: '20px' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back</h2>
            {errorMessage && (
              <div
                style={{
                  backgroundColor: '#f8d7da',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '15px',
                  color: '#842029',
                }}
              >
                {errorMessage}
              </div>
            )}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginTop: '25px' }}>
              <button
                onClick={attemptLogin}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#212529',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkGuest(Login);
