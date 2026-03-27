# 🧁 Baked Goods Cost Calculator

A React-based application to help bakers calculate ingredient costs and determine pricing for their baked goods.

## Features

### 📦 Ingredients Directory
- Add, edit, and delete ingredients
- Specify ingredient quantity, unit, and purchase cost
- Supports multiple currencies (default: THB)
- Automatic cost-per-unit calculation

### 🍰 Create Recipe
- Combine ingredients from your directory to create recipes
- Specify number of servings
- Automatically calculates:
  - Total recipe cost
  - Cost per serving
- Save recipes for future reference

### ⭐ Saved Recipes
- View all your saved recipes
- See recipe details including cost breakdowns
- Delete recipes when no longer needed
- All data persists in browser's local storage

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd "Baked Goods Costs"
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create an optimized production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## How to Use

1. **Add Ingredients**: Go to the "Ingredients" tab and add all your ingredients with their costs
2. **Create Recipes**: Use the "Create Recipe" tab to build recipes from your ingredients
3. **View Saved Recipes**: Check the "Saved Recipes" tab to see all your recipe costs and servings

## Data Storage

- All data is saved to your browser's local storage
- Data persists between sessions
- Clear browser storage to reset the app

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- PostCSS & Autoprefixer

## License

MIT
