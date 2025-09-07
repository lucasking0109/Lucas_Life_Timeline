# Lucas King's Life Timeline

A dynamic personal timeline website showcasing important life moments and milestones.

## 🌟 Features

- **Dynamic Content Management**: Add, edit, or delete timeline events anytime
- **Image Upload**: Support for adding images to events
- **Category Filtering**: Filter events by category (work, education, personal, etc.)
- **Year Filtering**: View events from specific periods by year
- **Responsive Design**: Adapts to various device sizes
- **Real-time Sync**: Serverless architecture based on Netlify

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Netlify Functions (Node.js)
- **Deployment**: Netlify
- **Storage**: Netlify KV Store (planned)

## 📦 Deployment Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Netlify CLI

### Local Development

1. Clone the project:
```bash
git clone [your-repo-url]
cd lucas-life-timeline
```

2. Install dependencies:
```bash
npm install
```

3. Start local development server:
```bash
npm run dev
```

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy to Netlify:
```bash
npm run deploy:prod
```

## 🎯 How to Use

1. **Add Event**: Click "Add Event" button and fill in event details
2. **Edit Event**: Click the "Edit" button on an event
3. **Delete Event**: Click the "Delete" button on an event
4. **Filter Events**: Use the year and category filters at the top
5. **Export Data**: Click "Website Export" button to export data

## 📁 Project Structure

```
lucas-life-timeline/
├── index.html          # Main page
├── styles.css          # Stylesheet
├── script.js           # Frontend logic
├── netlify.toml        # Netlify configuration
├── package.json        # Project configuration
└── netlify/
    └── functions/      # Netlify Functions
        ├── get-timeline.js
        ├── save-timeline.js
        └── upload-image.js
```

## 🔧 API Endpoints

- `GET /.netlify/functions/get-timeline` - Get timeline data
- `POST /.netlify/functions/save-timeline` - Save timeline data
- `POST /.netlify/functions/upload-image` - Upload image

## 🎨 Customization

You can customize the website's look and feel by modifying `styles.css`.

## 📝 License

MIT License

## 👤 Author

Lucas King

---

*This project was developed with AI assistance, showcasing the endless possibilities of modern web development.* 