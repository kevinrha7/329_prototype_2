# Northwestern University Student Resources Hub
# https://329-prototype-2.vercel.app
# https://329-prototype-2-pmed3i4lw-kevin-rhas-projects.vercel.app

A Wikipedia-style, single-page web application that makes it easy for Northwestern students to discover and access institutional resources.

## Features

- 🔍 **Live Search**: Filter 58+ resources by keyword, tag, or category
- 📑 **Table of Contents**: Jump directly to any section or specific resource
- 🎯 **8 Categories**: Academic support, career, health, safety, tech, money/food, community, and facilities
- 📱 **Responsive Design**: Works on desktop and mobile
- ⚡ **Fast & Simple**: No backend needed - pure React/TypeScript

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
```

## Technologies

- React 18 with TypeScript
- Vite for fast development and building
- CSS for Wikipedia-inspired styling
- No external UI libraries needed

## Project Structure

```
src/
├── App.tsx                    # Main app component with search logic
├── data.ts                    # All 58 resources hard-coded
├── types.ts                   # TypeScript type definitions
└── components/
    ├── SearchBar.tsx          # Search input with live filtering
    ├── TableOfContents.tsx    # Sticky sidebar navigation
    ├── CategorySection.tsx    # Category heading + resources
    └── ResourceCard.tsx       # Individual resource display
```

## Deployment

Deploy to Vercel with one command:

```bash
npx vercel
```

## License

MIT
