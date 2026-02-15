# Real Estate Website with Admin Panel - Megaplex Infinity

A full-stack real estate website built with React.js (frontend) and Node.js/Express (backend) featuring a dynamic admin panel for content management.

## 🌟 Features

- **Responsive Real Estate Website** - Modern, mobile-friendly design
- **Admin Panel** - Secure login and content management system
- **Dynamic Content** - Edit text content for all sections via admin panel
- **MongoDB Database** - Persistent data storage
- **RESTful API** - Clean backend architecture

## 🚀 Live Demo

- **Frontend URL**: [Your Vercel/Netlify URL]
- **Backend URL**: [Your Render/Railway URL]
- **Admin Panel**: [Frontend URL]/admin

### Admin Credentials
- **Email**: admin@gmail.com
- **Password**: 1234

## 📋 Project Structure

```
real-estate-project/
├── frontend/                 # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── AdminLogin.js
│   │   │   └── AdminDashboard.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── backend/                  # Node.js/Express backend
    ├── models/
    │   └── Content.js       # MongoDB schema
    ├── server.js            # Main server file
    ├── package.json
    └── .env
```

## 🛠️ Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Axios for API calls
- React Icons
- CSS3 (Responsive Design)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Session (Authentication)
- CORS middleware

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realestate
SESSION_SECRET=your-secret-key-here
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Backend Deployment (Render/Railway)

1. **Render.com**:
   - Create a new Web Service
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     ```
     MONGODB_URI=your_mongodb_atlas_uri
     SESSION_SECRET=your_secret_key
     NODE_ENV=production
     FRONTEND_URL=your_frontend_url
     ```

2. **Railway.app**:
   - Connect GitHub repository
   - Railway auto-detects Node.js
   - Add environment variables in Railway dashboard

### Frontend Deployment (Vercel/Netlify)

1. **Vercel**:
   - Install Vercel CLI: `npm i -g vercel`
   - Navigate to frontend directory
   - Run: `vercel`
   - Set environment variable:
     ```
     REACT_APP_API_URL=your_backend_url/api
     ```

2. **Netlify**:
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`
   - Add environment variable in Netlify dashboard

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Whitelist all IPs (0.0.0.0/0) for production or specific IPs
5. Use connection string in backend environment variables

## 📝 Editable Content Sections

The admin panel allows editing of:

1. **Hero Section**
   - Main title
   - Subtitle
   - Property type labels (1 BHK, 2 BHK)
   - Prices
   - Location badge text

2. **About Project**
   - Section title
   - Description/content
   - Button text

3. **Amenities**
   - Section title
   - Individual amenity names

4. **Township/Buildings**
   - Section title
   - Building information

5. **Developer Section**
   - Title
   - Description

6. **Construction Updates**
   - Section title
   - Update labels

7. **FAQ Section**
   - Section title
   - Questions and answers

## 🔒 Security Features

- Session-based authentication
- HTTP-only cookies
- CORS protection
- Input validation
- Secure password handling

## 🎨 Design Features

- Modern gradient backgrounds
- Responsive grid layouts
- Smooth hover animations
- Mobile-first approach
- Clean, professional UI

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🧪 API Endpoints

### Public Endpoints
- `GET /api/content` - Get all content
- `GET /api/content/:section` - Get specific section
- `GET /api/health` - Health check

### Protected Endpoints (Admin)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/status` - Check auth status
- `PUT /api/admin/content/:section` - Update content

## 🐛 Troubleshooting

### Backend Issues
- Ensure MongoDB is running
- Check environment variables
- Verify port 5000 is available

### Frontend Issues
- Clear browser cache
- Check API URL in .env
- Verify backend is running

### CORS Errors
- Update FRONTEND_URL in backend .env
- Check CORS configuration in server.js

## 📄 License

This project is created for educational purposes.

## 👥 Support

For issues and questions, please create an issue in the GitHub repository.

## 🎯 Assignment Requirements Checklist

✅ Exact replica of reference design
✅ React.js frontend
✅ Node.js + Express backend
✅ MongoDB database
✅ Admin login (admin@gmail.com / 1234)
✅ Editable text content for all sections
✅ Static images (no image CMS)
✅ Hosted and publicly accessible
✅ Complete README documentation

---

**Built with ❤️ for the Real Estate Assignment**
