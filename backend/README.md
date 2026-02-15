# Real Estate Backend API

Backend server for the Real Estate Website built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

```bash
npm install
npm start
```

For development:
```bash
npm run dev
```

## 📋 Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realestate
SESSION_SECRET=your-secret-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 📚 API Documentation

### Authentication

#### Login
```
POST /api/admin/login
Body: { "email": "admin@gmail.com", "password": "1234" }
Response: { "success": true, "message": "Login successful" }
```

#### Logout
```
POST /api/admin/logout
Response: { "success": true, "message": "Logged out successfully" }
```

#### Check Auth Status
```
GET /api/admin/status
Response: { "isAuthenticated": true/false }
```

### Content Management

#### Get All Content (Public)
```
GET /api/content
Response: { 
  "hero": {...}, 
  "about": {...}, 
  "amenities": {...},
  ...
}
```

#### Get Section Content (Public)
```
GET /api/content/:section
Example: GET /api/content/hero
Response: { "title": "...", "subtitle": "...", ... }
```

#### Update Section (Protected)
```
PUT /api/admin/content/:section
Body: { "data": { "title": "New Title", ... } }
Response: { "success": true, "content": {...} }
```

### Health Check
```
GET /api/health
Response: { "status": "OK", "timestamp": "..." }
```

## 🗄️ Database Schema

### Content Model
```javascript
{
  section: String (unique),
  data: Mixed (JSON object),
  timestamps: true
}
```

### Default Sections
- `hero` - Hero section content
- `about` - About project section
- `amenities` - Amenities list
- `township` - Township buildings
- `connectivity` - Nearby locations
- `developer` - Developer information
- `construction` - Construction updates
- `faq` - FAQ items

## 🔒 Security

- Session-based authentication
- CORS enabled for frontend origin
- HTTP-only cookies
- Protected admin routes

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "mongoose": "^8.0.3",
  "express-session": "^1.17.3"
}
```

## 🚀 Deployment

### Render.com
1. Create new Web Service
2. Connect GitHub repo
3. Set environment variables
4. Deploy

### Railway.app
1. New project from GitHub
2. Add environment variables
3. Deploy

## 🧪 Testing

Test the API using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Get content
curl http://localhost:5000/api/content

# Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"1234"}'
```

## 📝 Notes

- Default admin credentials are hardcoded for simplicity
- MongoDB auto-initializes with default content
- Sessions stored in memory (use Redis for production)
- All timestamps are in UTC
