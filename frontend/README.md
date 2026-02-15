# Real Estate Frontend

React.js frontend for the Real Estate Website with admin panel.

## 🚀 Quick Start

```bash
npm install
npm start
```

The app will open at `http://localhost:3000`

## 📋 Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update to your deployed backend URL.

## 📁 Project Structure

```
src/
├── pages/
│   ├── HomePage.js          # Main landing page
│   ├── AdminLogin.js        # Admin login page
│   └── AdminDashboard.js    # Admin content editor
├── App.js                   # Main app with routing
├── App.css                  # All styles
├── index.js                 # Entry point
└── index.css                # Base styles
```

## 🎨 Components

### HomePage
Main landing page with all sections:
- Navbar with navigation
- Hero section with property cards
- About project section
- Amenities grid
- Township buildings
- Floor plans
- Video section
- Developer information
- Construction updates
- FAQ accordion
- Footer

### AdminLogin
- Simple login form
- Email and password fields
- Error handling
- Redirects to dashboard on success

### AdminDashboard
Content management interface for:
- Hero section (title, subtitle, prices)
- About section (description, button text)
- Amenities (list items)
- Township (title)
- Developer (description)
- Construction updates (title)
- FAQ (questions and answers)

## 🎨 Styling

### Color Scheme
- Primary: `#4ade80` (Green)
- Secondary: `#22c55e` (Dark Green)
- Background: `#f0fdf4` (Light Green)
- Text: `#333333`

### Layout
- Max width containers for content
- Responsive grid systems
- Flexbox for component layouts
- CSS Grid for section layouts

### Animations
- Hover effects on cards
- Smooth transitions
- Scale transforms on buttons

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Mobile adaptations:
- Stack grid layouts vertically
- Hide navigation menu (can add hamburger)
- Adjust font sizes
- Full-width cards

## 🌐 Routing

```
/ - Home page
/admin - Admin login
/admin/dashboard - Admin panel (protected)
```

## 🔒 Protected Routes

Admin dashboard checks authentication status on mount.
Redirects to login if not authenticated.

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "axios": "^1.6.2",
  "react-icons": "^4.12.0"
}
```

## 🚀 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`

### Build Optimization
- Code splitting enabled
- Lazy loading for routes
- Optimized images from Unsplash
- Minified CSS and JS

## 🎯 Features

✅ Modern React with Hooks
✅ Client-side routing
✅ REST API integration
✅ Session management
✅ Form validation
✅ Error handling
✅ Loading states
✅ Responsive design
✅ Accessibility features

## 🐛 Common Issues

### CORS Errors
Ensure backend CORS is configured for your frontend URL.

### API Connection
Verify `REACT_APP_API_URL` in `.env` matches your backend.

### Build Errors
Clear `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Admin Features

The admin can edit:
- All text content across sections
- Property pricing
- FAQ questions/answers
- Section titles and descriptions
- Button labels

Images remain static (as per requirements).

## 🎨 Icon Usage

Using `react-icons` library:
- `FaMapMarkerAlt` - Location
- `FaDumbbell` - Gymnasium
- `FaChild` - Kids area
- `FaYinYang` - Yoga
- `FaBasketballBall` - Sports
- `FaBolt` - Power
- `FaPlay` - Video
- `FaChevronDown` - FAQ

## 📄 License

Educational project for assignment purposes.
