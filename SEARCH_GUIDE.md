# Ingredient Search Feature Guide

## How to Use the Search Function

### Step 1: Access the Search
1. Go to the **📦 Ingredients** tab
2. Look for the **🔍 Search Ingredient** field at the top of the form

### Step 2: Search for Ingredients
- Type in a product name, brand, or category
- Examples:
  - "Nuttarin Coconut Sugar"
  - "Butter"
  - "Flour"
  - "Kerrygold"

### Step 3: Review Search Results
The app will show you:
- **Average Price** across all results
- **Lowest Price** highlighted in green
- **Store Location** where it's available
- **Product Details** (brand, quantity, source)

### Step 4: Select a Result
Click on any result to:
- Auto-fill the ingredient name
- Auto-fill the suggested price
- Auto-fill the unit and quantity

### Step 5: Override if Needed
You can:
- Keep the suggested price
- Edit any field manually
- Continue adding the ingredient as normal

## Available Ingredients Database

The search currently includes common baking ingredients found in Bangkok supermarkets:

### Sugars & Sweeteners
- Nuttarin Coconut Sugar
- Granulated Sugar (Mitr Phol)

### Flours
- All Purpose Flour (Gold Medal, Wheat King)

### Butter & Dairy
- Unsalted Butter (Kerrygold, Danish)
- Whole Milk (Dutch Mill)
- Condensed Milk (Foremost)

### Chocolate
- Dark Chocolate Chips (Ghirardelli, Callebaut)

### Eggs & Leavening
- Large Eggs (Farm Fresh)
- Baking Powder (Calumet)
- Baking Soda (Arm & Hammer)

### Extracts & Flavoring
- Vanilla Extract (McCormick, Saigon)

## Integrating Real APIs (Future Enhancement)

To connect real pricing data from Bangkok stores, you can integrate:

### Option 1: Google Shopping API
```javascript
// Replace searchWithGoogleShopping() in searchService.js
// Requires: Google Custom Search API key
```

### Option 2: Shopee API
```javascript
// Research Shopee's official API documentation
// Popular for finding Thailand prices
```

### Option 3: Lazada API
```javascript
// Research Lazada's official API documentation
// Another major e-commerce platform in Thailand
```

### Option 4: Web Scraping
```javascript
// Query popular Bangkok retailers:
// - BigC (bigc.co.th)
// - Tesco Lotus (tesco.co.th)
// - Villa Market
// - Gourmet Market (online)
// Note: Respect Terms of Service
```

## Tips & Tricks

1. **Search is Case-Insensitive**: "Thai flour" and "THAI FLOUR" return the same results
2. **Partial Matches Work**: "Coco" will find "Coconut Sugar"
3. **No Results?** Try:
   - Different spelling or brand name
   - Enter details manually
   - Eventually add your custom ingredient to the database

4. **Prices Update**: The mock database represents typical Bangkok market prices. For real-time prices, configure an actual API integration.

## Editing vs. Searching

- **Adding New Ingredient**: Search function available ✓
- **Editing Existing Ingredient**: Search function hidden (use manual entry) ✓
- This prevents accidental overwrites when modifying entries

---

Need to add more ingredients to the database or integrate a real API? Check the `/src/utils/searchService.js` file for implementation details.
