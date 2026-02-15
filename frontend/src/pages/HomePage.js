import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaDumbbell, FaChild, FaYinYang, FaBasketballBall, FaBolt, FaPlay, FaChevronDown } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const HomePage = () => {
  const [content, setContent] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${API_URL}/content`);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const getAmenityIcon = (iconName) => {
    const icons = {
      gym: <FaDumbbell />,
      playground: <FaChild />,
      yoga: <FaYinYang />,
      court: <FaBasketballBall />,
      power: <FaBolt />
    };
    return icons[iconName] || <FaDumbbell />;
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h2 style={{ color: '#22c55e' }}>MEGAPLEX INFINITY</h2>
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#amenities">Amenities</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="navbar-cta">Property Tour</button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <h1>{content.hero?.title || 'THINKING OF A FANTASTIC VICINITY?'}</h1>
          <h2>{content.hero?.subtitle || 'GET LUXURY LIVING COMFORT AT MEGAPLEX AT T.P. SCHEME'}</h2>
          
          <div className="property-types">
            <div className="property-card">
              <h3>{content.hero?.smart1bhk || 'SMART 1 BHK'}</h3>
              <p className="price">{content.hero?.price1bhk || '₹ 60.99 Lacs*'}</p>
            </div>
            <div className="property-card">
              <h3>{content.hero?.premium2bhk || 'PREMIUM 2 BHK'}</h3>
              <p className="price">{content.hero?.price2bhk || '₹ 96.99 Lacs*'}</p>
            </div>
          </div>

          <div className="location-badge">
            <FaMapMarkerAlt size={24} />
            <span>{content.hero?.location || 'Daman, A WALKABLE DISTANCE LANDMARK'}</span>
          </div>
        </div>

        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=500&fit=crop" alt="Building" />
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="overview">
        <div className="about-images">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop" alt="Building 1" />
          <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300&h=300&fit=crop" alt="Building 2" />
          <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=300&h=300&fit=crop" alt="Building 3" />
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=300&fit=crop" alt="Building 4" />
        </div>

        <div className="about-content">
          <h2>{content.about?.title || 'About Project'}</h2>
          <p>{content.about?.description || 'At Megaplex Infinity, we don\'t just build homes; we create living experiences...'}</p>
          <button className="download-btn">{content.about?.buttonText || 'Download Brochure'}</button>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section" id="amenities">
        <h2>{content.amenities?.title || 'Amenities'}</h2>
        <div className="amenities-grid">
          {(content.amenities?.items || [
            { name: 'Gymnasium', icon: 'gym' },
            { name: 'Kids Play Area', icon: 'playground' },
            { name: 'Kids Play Area', icon: 'playground' },
            { name: 'Yoga', icon: 'yoga' },
            { name: 'Multipurpose Court', icon: 'court' },
            { name: 'Power Backup', icon: 'power' }
          ]).map((amenity, index) => (
            <div key={index} className="amenity-card">
              <div className="amenity-icon">
                {getAmenityIcon(amenity.icon)}
              </div>
              <h3>{amenity.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Township Section */}
      <section className="township-section">
        <h2>{content.township?.title || 'Explore More Buildings in the Township'}</h2>
        <div className="township-grid">
          {(content.township?.buildings || [
            { name: 'Tower - Namaste', status: 'Sold Out' },
            { name: 'Tower - Namaste', status: 'Sold Out' },
            { name: 'Tower - Namaste', status: 'Sold Out' }
          ]).map((building, index) => (
            <div key={index} className="building-card">
              <img src={`https://images.unsplash.com/photo-${1545324418 + index}-cc1a3fa10c00?w=400&h=300&fit=crop`} alt={building.name} />
              <div className="building-overlay">
                <h3>{building.name}</h3>
                <span className="sold-badge">{building.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floor Plan Section */}
      <section className="floorplan-section">
        <div className="floorplan-content">
          <div className="floorplan-image">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop" alt="Floor Plan" />
          </div>
          <div className="floorplan-tabs">
            {(content.developer?.tabs || ['1 BHK', '2 BHK', '3 BHK']).map((tab, index) => (
              <button key={index} className={`tab-btn ${index === 0 ? 'active' : ''}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="floorplan-details">
            <div className="detail-item">
              <div className="label">Area</div>
              <div className="value">550 - 650 Sq.ft</div>
            </div>
            <div className="detail-item">
              <div className="label">Type</div>
              <div className="value">1 BHK</div>
            </div>
            <div className="detail-item">
              <div className="label">Price</div>
              <div className="value">₹ 60.99 Lacs*</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="video-container">
          <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1000&h=600&fit=crop" alt="Video Thumbnail" />
          <div className="video-play-btn">
            <FaPlay />
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="developer-section">
        <h2>{content.developer?.title || 'About Developer'}</h2>
        <div className="developer-content">
          <div className="developer-tabs">
            {(content.developer?.tabs || ['1 BHK', '2 BHK', '3 BHK', '4+ BHK']).map((tab, index) => (
              <button key={index} className={`tab-btn ${index === 0 ? 'active' : ''}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="developer-info">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop" alt="Developer" />
            <div>
              <p>{content.developer?.description || 'Information about the developer and their projects.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Construction Updates */}
      <section className="construction-section">
        <h2>{content.construction?.title || 'Construction Updates'}</h2>
        <div className="construction-grid">
          {(content.construction?.updates || [
            { image: 'update1.jpg', date: 'January 2024' },
            { image: 'update2.jpg', date: 'December 2023' },
            { image: 'update3.jpg', date: 'November 2023' }
          ]).map((update, index) => (
            <div key={index} className="construction-card">
              <img src={`https://images.unsplash.com/photo-${1541888946 + index}-c9b21a8ffdbe?w=400&h=300&fit=crop`} alt={`Update ${index + 1}`} />
              <div className="construction-info">
                <h3>Construction Progress</h3>
                <p>{update.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>{content.faq?.title || 'Frequently Asked Questions'}</h2>
        <div className="faq-list">
          {(content.faq?.questions || [
            {
              question: 'What is the location of Megaplex Infinity?',
              answer: 'Megaplex Infinity is located at T.P. Scheme, Daman.'
            },
            {
              question: 'What are the apartment configurations available?',
              answer: 'We offer Smart 1 BHK and Premium 2 BHK apartments.'
            }
          ]).map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                <FaChevronDown />
              </button>
              <div className={`faq-answer ${openFaq === index ? '' : 'hidden'}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <h3>MEGAPLEX INFINITY</h3>
          <p>T.P. Scheme, Daman</p>
          <p>Contact: +91 1234567890 | Email: info@megaplexinfinity.com</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
            <a href="#sitemap">Sitemap</a>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
            © 2024 Megaplex Infinity. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
