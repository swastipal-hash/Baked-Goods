// Mock data for Bangkok ingredient prices
// In production, replace this with API calls to real shopping sites
const mockIngredientDatabase = [
  // Nuttarin products
  { id: 1, name: 'Nuttarin Coconut Sugar', brand: 'Nuttarin', category: 'Sugar', currency: 'THB', price: 185, unit: '500g', source: 'BigC Bangkok' },
  { id: 2, name: 'Nuttarin Coconut Sugar', brand: 'Nuttarin', category: 'Sugar', currency: 'THB', price: 179, unit: '500g', source: 'Tesco Lotus' },
  { id: 3, name: 'Nuttarin Coconut Sugar', brand: 'Nuttarin', category: 'Sugar', currency: 'THB', price: 190, unit: '500g', source: 'Shopee' },

  // Flour
  { id: 4, name: 'All Purpose Flour', brand: 'Gold Medal', category: 'Flour', currency: 'THB', price: 95, unit: '1kg', source: 'BigC Bangkok' },
  { id: 5, name: 'All Purpose Flour', brand: 'Gold Medal', category: 'Flour', currency: 'THB', price: 89, unit: '1kg', source: 'Tesco Lotus' },
  { id: 6, name: 'All Purpose Flour', brand: 'Wheat King', category: 'Flour', currency: 'THB', price: 65, unit: '1kg', source: 'Makro' },

  // Butter
  { id: 7, name: 'Unsalted Butter', brand: 'Kerrygold', category: 'Butter', currency: 'THB', price: 250, unit: '250g', source: 'BigC Bangkok' },
  { id: 8, name: 'Unsalted Butter', brand: 'Kerrygold', category: 'Butter', currency: 'THB', price: 240, unit: '250g', source: 'Tesco Lotus' },
  { id: 9, name: 'Unsalted Butter', brand: 'Danish', category: 'Butter', currency: 'THB', price: 200, unit: '250g', source: 'Villa Market' },

  // Chocolate
  { id: 10, name: 'Dark Chocolate Chips', brand: 'Ghirardelli', category: 'Chocolate', currency: 'THB', price: 320, unit: '340g', source: 'BigC Bangkok' },
  { id: 11, name: 'Dark Chocolate Chips', brand: 'Callebaut', category: 'Chocolate', currency: 'THB', price: 450, unit: '400g', source: 'Tops Market' },

  // Eggs
  { id: 12, name: 'Large Eggs', brand: 'Farm Fresh', category: 'Eggs', currency: 'THB', price: 65, unit: '10 eggs', source: 'BigC Bangkok' },
  { id: 13, name: 'Large Eggs', brand: 'Farm Fresh', category: 'Eggs', currency: 'THB', price: 70, unit: '10 eggs', source: 'Tesco Lotus' },

  // Vanilla
  { id: 14, name: 'Vanilla Extract', brand: 'McCormick', category: 'Vanilla', currency: 'THB', price: 180, unit: '30ml', source: 'Gourmet Market' },
  { id: 15, name: 'Vanilla Extract', brand: 'Saigon', category: 'Vanilla', currency: 'THB', price: 120, unit: '30ml', source: 'BigC Bangkok' },

  // Baking Powder
  { id: 16, name: 'Baking Powder', brand: 'Calumet', category: 'Leavening', currency: 'THB', price: 45, unit: '200g', source: 'Tesco Lotus' },
  { id: 17, name: 'Baking Soda', brand: 'Arm & Hammer', category: 'Leavening', currency: 'THB', price: 35, unit: '227g', source: 'BigC Bangkok' },

  // Milk
  { id: 18, name: 'Whole Milk', brand: 'Dutch Mill', category: 'Dairy', currency: 'THB', price: 55, unit: '1L', source: 'Tesco Lotus' },
  { id: 19, name: 'Condensed Milk', brand: 'Foremost', category: 'Dairy', currency: 'THB', price: 48, unit: '397g', source: 'BigC Bangkok' },

  // Sugar
  { id: 20, name: 'Granulated Sugar', brand: 'Mitr Phol', category: 'Sugar', currency: 'THB', price: 28, unit: '1kg', source: 'Makro' },
  { id: 21, name: 'Granulated Sugar', brand: 'Mitr Phol', category: 'Sugar', currency: 'THB', price: 45, unit: '1kg', source: 'Tesco Lotus' },
];

export const searchIngredients = (query) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  return mockIngredientDatabase.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.brand.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
  );
};

export const getAveragePrice = (results) => {
  if (results.length === 0) return null;
  const sum = results.reduce((acc, item) => acc + item.price, 0);
  return sum / results.length;
};

export const getLowestPrice = (results) => {
  if (results.length === 0) return null;
  return results.reduce((min, item) => (item.price < min.price ? item : min));
};

// Real API integration placeholders
// Replace these with actual API calls when you have credentials

export const searchWithGoogleShopping = async (query, apiKey) => {
  // Placeholder for Google Custom Search integration
  // Requires Google Custom Search API key
  console.warn('Google Shopping API not configured. Using mock data.');
  return searchIngredients(query);
};

export const searchWithShopee = async (query) => {
  // Placeholder for Shopee API integration
  // Requires Shopee API credentials
  console.warn('Shopee API not configured. Using mock data.');
  return searchIngredients(query);
};

export const searchWithLazada = async (query) => {
  // Placeholder for Lazada API integration
  // Requires Lazada API credentials
  console.warn('Lazada API not configured. Using mock data.');
  return searchIngredients(query);
};
