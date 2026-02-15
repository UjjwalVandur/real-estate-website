const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const Content = require('./models/Content');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  name: "realestate.sid",
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
     secure: process.env.NODE_ENV === 'production',
    //secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Initialize default content
const initializeDefaultContent = async () => {
  try {
    const count = await Content.countDocuments();
    if (count === 0) {
      const defaultContent = [
        {
          section: 'hero',
          data: {
            title: 'THINKING OF A FANTASTIC VICINITY?',
            subtitle: 'GET LUXURY LIVING COMFORT AT MEGAPLEX AT T.P. SCHEME',
            smart1bhk: 'SMART 1 BHK',
            premium2bhk: 'PREMIUM 2 BHK',
            price1bhk: '₹ 60.99 Lacs*',
            price2bhk: '₹ 96.99 Lacs*',
            location: 'Daman, A WALKABLE DISTANCE LANDMARK'
          }
        },
        {
          section: 'about',
          data: {
            title: 'About Project',
            description: 'At Megaplex Infinity, we don\'t just build homes; we create living experiences. This is where architecture meets aspiration, and every corner is designed with you in mind. Strategically located in the heart of Daman, at T.P. Scheme, Megaplex Infinity is a tribute to contemporary living in the perfect location. Our 1 BHK and 2 BHK apartments are carefully crafted to offer you comfort, style, and convenience — all wrapped in a thoughtful, modern design. Whether you\'re a first-time homebuyer or looking for a smart investment, Megaplex Infinity offers an unbeatable combination of luxury, location, and lifestyle. We believe your home should be more than just four walls — it should be your sanctuary, your pride, and a smart financial decision.',
            buttonText: 'Download Brochure'
          }
        },
        {
          section: 'amenities',
          data: {
            title: 'Amenities',
            items: [
              { name: 'Gymnasium', icon: 'gym' },
              { name: 'Kids Play Area', icon: 'playground' },
              { name: 'Kids Play Area', icon: 'playground' },
              { name: 'Yoga', icon: 'yoga' },
              { name: 'Multipurpose Court', icon: 'court' },
              { name: 'Power Backup', icon: 'power' }
            ]
          }
        },
        {
          section: 'township',
          data: {
            title: 'Explore More Buildings in the Township',
            buildings: [
              { name: 'Tower - Namaste', status: 'Sold Out' },
              { name: 'Tower - Namaste', status: 'Sold Out' },
              { name: 'Tower - Namaste', status: 'Sold Out' }
            ]
          }
        },
        {
          section: 'connectivity',
          data: {
            title: 'Nearby Connectivity',
            locations: [
              { name: 'Vapi', distance: '30 KM' },
              { name: 'Mumbai', distance: '170 KM' },
              { name: 'Silvassa', distance: '12 KM' }
            ]
          }
        },
        {
          section: 'developer',
          data: {
            title: 'About Developer',
            tabs: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'],
            description: 'Information about the developer and their projects.'
          }
        },
        {
          section: 'construction',
          data: {
            title: 'Construction Updates',
            updates: [
              { image: 'update1.jpg', date: 'January 2024' },
              { image: 'update2.jpg', date: 'December 2023' },
              { image: 'update3.jpg', date: 'November 2023' }
            ]
          }
        },
        {
          section: 'faq',
          data: {
            title: 'Frequently Asked Questions',
            questions: [
              {
                question: 'What is the location of Megaplex Infinity?',
                answer: 'Megaplex Infinity is located at T.P. Scheme, Daman, offering excellent connectivity to major landmarks.'
              },
              {
                question: 'What are the apartment configurations available?',
                answer: 'We offer Smart 1 BHK and Premium 2 BHK apartments designed for modern living.'
              },
              {
                question: 'What amenities are provided?',
                answer: 'We provide world-class amenities including gymnasium, kids play area, yoga space, multipurpose court, and power backup.'
              },
              {
                question: 'Is the project RERA registered?',
                answer: 'Yes, the project is RERA registered and all approvals are in place.'
              },
              {
                question: 'What is the possession timeline?',
                answer: 'The possession timeline will be communicated to buyers at the time of booking.'
              }
            ]
          }
        }
      ];

      await Content.insertMany(defaultContent);
      console.log('Default content initialized');
    }
  } catch (error) {
    console.error('Error initializing default content:', error);
  }
};

initializeDefaultContent();

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// Routes

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@gmail.com' && password === '1234') {
    req.session.isAdmin = true;
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Admin Logout
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Check Auth Status
app.get('/api/admin/status', (req, res) => {
  if (req.session && req.session.isAdmin) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Get all content (public)
app.get('/api/content', async (req, res) => {
  try {
    const content = await Content.find();
    const contentMap = {};
    content.forEach(item => {
      contentMap[item.section] = item.data;
    });
    res.json(contentMap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get content by section (public)
app.get('/api/content/:section', async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    if (!content) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(content.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update content (protected)
app.put('/api/admin/content/:section', isAuthenticated, async (req, res) => {
  try {
    const { section } = req.params;
    const { data } = req.body;

    const content = await Content.findOneAndUpdate(
      { section },
      { data },
      { new: true, upsert: true }
    );

    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
