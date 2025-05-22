import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function Home() {
  const user = useSelector(store => store.auth.user);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/blog/posts');
    } else {
      navigate('/auth/register');
    }
  };

  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <header
        className="hero-section d-flex flex-column justify-content-center align-items-center text-white text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          position: 'relative',
        }}
      >
        <div className="overlay p-4 rounded shadow-lg">
          <h1 className="display-4 fw-bold mb-3">Welcome to Personal Bookmarking</h1>
          <p className="lead mb-4">A beautiful space to save, organize, and share your favorite links.</p>
          <button
            className="btn btn-lg btn-light px-4 shadow-sm"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
        <div className="hero-gradient"></div>
      </header>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-semibold">Why Choose Our Bookmarking Service?</h2>
          <div className="row g-4">
            <div className="col-sm-12 col-md-4 text-center">
              <div className="feature-card p-4 shadow-sm rounded">
                <i className="fas fa-bookmark fa-3x mb-3 text-primary"></i>
                <h5>Organize</h5>
                <p>Keep all your favorite links neatly categorized and accessible anytime.</p>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 text-center">
              <div className="feature-card p-4 shadow-sm rounded">
                <i className="fas fa-search fa-3x mb-3 text-success"></i>
                <h5>Discover</h5>
                <p>Explore trending topics and new bookmarks curated just for you.</p>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 text-center">
              <div className="feature-card p-4 shadow-sm rounded">
                <i className="fas fa-share-alt fa-3x mb-3 text-warning"></i>
                <h5>Share</h5>
                <p>Share your bookmark collections with friends or the public seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} Personal Bookmarking. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
