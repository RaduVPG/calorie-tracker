# Calorie Tracker

A simple, offline-first calorie tracking web app that works on iPhone Safari (and any modern browser). Built with HTML, CSS, and vanilla JavaScript, storing data in `localStorage`.

## Features

- Add foods with name, calories, and meal type
- View daily total calories
- Edit or delete entries
- Navigate between dates
- Mobile-friendly, dark theme
- Persistent storage via `localStorage` (no server required)

## Deploy on Vercel

1. **Fork or clone this repository**
2. **Push to GitHub**
3. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a static site and deploy it
4. **Optional**: Add a custom domain

## Local Development

Simply open `index.html` in any browser. No build step required.

## Customization

- Edit the `DEFAULT_FOODS` array in `script.js` to change the starter foods
- Modify the CSS variables in `style.css` to change colors
- Add more features like food search, barcode scanning, or charts as needed

## License

MIT