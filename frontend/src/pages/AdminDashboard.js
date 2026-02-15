import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const navigate = useNavigate();



 const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/status`, {
      withCredentials: true
    });

    if (!response.data.isAuthenticated) {
      navigate("/admin");
    }
  } catch (error) {
    navigate("/admin");
  }
};



  const fetchContent = async () => {
    try {
      const response = await axios.get(`${API_URL}/content`);
      setContent(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
  checkAuth();
  fetchContent();
},[navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/admin/logout`, {}, { withCredentials: true });
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSave = async (section, data) => {
    try {
      await axios.put(`${API_URL}/admin/content/${section}`, 
        { data },
        { withCredentials: true }
      );
      setSaveMessage(`${section} updated successfully!`);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    }
  };

  const updateField = (section, field, value) => {
    setContent({
      ...content,
      [section]: {
        ...content[section],
        [field]: value
      }
    });
  };

  const updateArrayField = (section, arrayName, index, field, value) => {
    const updatedArray = [...(content[section]?.[arrayName] || [])];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value
    };
    setContent({
      ...content,
      [section]: {
        ...content[section],
        [arrayName]: updatedArray
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-content">
        {saveMessage && <div className="success-message">{saveMessage}</div>}

        {/* Hero Section Editor */}
        <div className="section-editor">
          <h2>Hero Section</h2>
          <div className="editor-field">
            <label>Title</label>
            <input
              type="text"
              value={content.hero?.title || ''}
              onChange={(e) => updateField('hero', 'title', e.target.value)}
            />
          </div>
          <div className="editor-field">
            <label>Subtitle</label>
            <input
              type="text"
              value={content.hero?.subtitle || ''}
              onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
            />
          </div>
          <div className="editor-field">
            <label>Smart 1 BHK Label</label>
            <input
              type="text"
              value={content.hero?.smart1bhk || ''}
              onChange={(e) => updateField('hero', 'smart1bhk', e.target.value)}
            />
          </div>
          <div className="editor-field">
            <label>Premium 2 BHK Label</label>
            <input
              type="text"
              value={content.hero?.premium2bhk || ''}
              onChange={(e) => updateField('hero', 'premium2bhk', e.target.value)}
            />
          </div>
          <div className="editor-field">
            <label>1 BHK Price</label>
            <input
              type="text"
              value={content.hero?.price1bhk || ''}
              onChange={(e) => updateField('hero', 'price1bhk', e.target.value)}
            />
          </div>
          <div className="editor-field">
            <label>2 BHK Price</label>
            <input
              type="text"
              value={content.hero?.price2bhk || ''}
              onChange={(e) => updateField('hero', 'price2bhk', e.target.value)}
            />
          </div>
          <div className="editor-field">
            <label>Location</label>
            <input
              type="text"
              value={content.hero?.location || ''}
              onChange={(e) => updateField('hero', 'location', e.target.value)}
            />
          </div>
          <button className="save-btn" onClick={() => handleSave('hero', content.hero)}>
            Save Hero Section
          </button>
        </div>

        {/* About Section Editor */}
        <div className="section-editor">
          <h2>About Project Section</h2>
          <div className="editor-field">
            <label>Title</label>
            <input
              type="text"
              value={content.about?.title || ''}
              onChange={(e) => updateField('about', 'title', e.target.value)}
            />
          </div>
          <div className="editor-field">
            <label>Description</label>
            <textarea
              value={content.about?.description || ''}
              onChange={(e) => updateField('about', 'description', e.target.value)}
              rows={6}
            />
          </div>
          <div className="editor-field">
            <label>Button Text</label>
            <input
              type="text"
              value={content.about?.buttonText || ''}
              onChange={(e) => updateField('about', 'buttonText', e.target.value)}
            />
          </div>
          <button className="save-btn" onClick={() => handleSave('about', content.about)}>
            Save About Section
          </button>
        </div>

        {/* Amenities Section Editor */}
        <div className="section-editor">
          <h2>Amenities Section</h2>
          <div className="editor-field">
            <label>Title</label>
            <input
              type="text"
              value={content.amenities?.title || ''}
              onChange={(e) => updateField('amenities', 'title', e.target.value)}
            />
          </div>
          <h3>Amenity Items</h3>
          {(content.amenities?.items || []).map((item, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
              <div className="editor-field">
                <label>Amenity {index + 1} Name</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => updateArrayField('amenities', 'items', index, 'name', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button className="save-btn" onClick={() => handleSave('amenities', content.amenities)}>
            Save Amenities Section
          </button>
        </div>

        {/* Township Section Editor */}
        <div className="section-editor">
          <h2>Township Section</h2>
          <div className="editor-field">
            <label>Title</label>
            <input
              type="text"
              value={content.township?.title || ''}
              onChange={(e) => updateField('township', 'title', e.target.value)}
            />
          </div>
          <button className="save-btn" onClick={() => handleSave('township', content.township)}>
            Save Township Section
          </button>
        </div>

        {/* Developer Section Editor */}
        <div className="section-editor">
          <h2>Developer Section</h2>
          <div className="editor-field">
            <label>Title</label>
            <input
              type="text"
              value={content.developer?.title || ''}
              onChange={(e) => updateField('developer', 'title', e.target.value)}
            />
          </div>
          <div className="editor-field">
            <label>Description</label>
            <textarea
              value={content.developer?.description || ''}
              onChange={(e) => updateField('developer', 'description', e.target.value)}
              rows={4}
            />
          </div>
          <button className="save-btn" onClick={() => handleSave('developer', content.developer)}>
            Save Developer Section
          </button>
        </div>

        {/* Construction Section Editor */}
        <div className="section-editor">
          <h2>Construction Updates Section</h2>
          <div className="editor-field">
            <label>Title</label>
            <input
              type="text"
              value={content.construction?.title || ''}
              onChange={(e) => updateField('construction', 'title', e.target.value)}
            />
          </div>
          <button className="save-btn" onClick={() => handleSave('construction', content.construction)}>
            Save Construction Section
          </button>
        </div>

        {/* FAQ Section Editor */}
        <div className="section-editor">
          <h2>FAQ Section</h2>
          <div className="editor-field">
            <label>Title</label>
            <input
              type="text"
              value={content.faq?.title || ''}
              onChange={(e) => updateField('faq', 'title', e.target.value)}
            />
          </div>
          <h3>FAQ Items</h3>
          {(content.faq?.questions || []).map((faq, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
              <div className="editor-field">
                <label>Question {index + 1}</label>
                <input
                  type="text"
                  value={faq.question || ''}
                  onChange={(e) => updateArrayField('faq', 'questions', index, 'question', e.target.value)}
                />
              </div>
              <div className="editor-field">
                <label>Answer {index + 1}</label>
                <textarea
                  value={faq.answer || ''}
                  onChange={(e) => updateArrayField('faq', 'questions', index, 'answer', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
          <button className="save-btn" onClick={() => handleSave('faq', content.faq)}>
            Save FAQ Section
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
