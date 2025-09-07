# Lucas King's Life Timeline - Project Documentation

## Project Overview
This is a personal career timeline showcase website, designed to record and display Lucas King's career, educational background, achievements, and important life events.

## Project Structure
- **Frontend**: Pure static HTML/CSS/JavaScript
  - `index.html` - Main page
  - `styles.css` - Stylesheet
  - `script.js` - Main JavaScript logic
  - `images/` - Image resources directory

- **Backend**: Netlify Serverless Functions
  - `netlify/functions/get-timeline.js` - Get timeline data
  - `netlify/functions/save-timeline.js` - Save timeline data
  - `netlify/functions/save-timeline-persistent.js` - Persistent storage
  - `netlify/functions/upload-image.js` - Image upload
  - `netlify/functions/upload-image-cloudinary.js` - Cloudinary image upload

## Deployment Platform
- **Netlify** - Static website hosting + Serverless Functions
- Configuration file: `netlify.toml`

## Main Features
1. 📅 Timeline Display - Display important life events by year
2. ➕ Add Events - Dynamically add new timeline events
3. 📤 Export Backup - Export timeline data as JSON
4. 📥 Import Backup - Restore timeline from JSON file
5. 🔗 Share & Sync - Share timeline link
6. 🖼️ Website Export - Export timeline as image or PDF
7. ☁️ Cloud Sync - Automatically save data to cloud
8. 📊 Filter Function - Filter events by year or category

## Development Commands
```bash
# Install dependencies
npm install

# Local development (Start Netlify Dev Server)
npm run dev

# Deploy to Netlify (Preview)
npm run deploy

# Deploy to production
npm run deploy:prod
```

## Local Development
1. Run `npm run dev` to start local development server
2. Access http://localhost:8888 in browser
3. File changes will auto-reload

## Important Notes
- Node.js version requirement: >= 18.0.0
- Uses Cloudinary for image uploads (requires API key configuration)
- All API endpoints are accessed via `/api/*` path

## Environment Variables
To use image upload functionality, set the following environment variables in Netlify dashboard:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Tech Stack
- Frontend: Native HTML/CSS/JavaScript
- Backend: Node.js + Netlify Functions
- Deployment: Netlify
- Image Storage: Cloudinary (optional)