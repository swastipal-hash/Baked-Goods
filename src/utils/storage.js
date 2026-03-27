// Storage helper functions
const STORAGE_KEYS = {
  INGREDIENTS: 'bgc_ingredients',
  RECIPES: 'bgc_recipes',
};

export const storage = {
  getIngredients: () => {
    const data = localStorage.getItem(STORAGE_KEYS.INGREDIENTS);
    return data ? JSON.parse(data) : [];
  },

  saveIngredients: (ingredients) => {
    localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify(ingredients));
  },

  getRecipes: () => {
    const data = localStorage.getItem(STORAGE_KEYS.RECIPES);
    return data ? JSON.parse(data) : [];
  },

  saveRecipes: (recipes) => {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  },
};

// Utility functions
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const calculateRecipeCost = (recipeIngredients, allIngredients) => {
  let totalCost = 0;

  recipeIngredients.forEach((recipeItem) => {
    const ingredient = allIngredients.find((ing) => ing.id === recipeItem.ingredientId);
    if (ingredient) {
      const costPerUnit = ingredient.cost / ingredient.amount;
      totalCost += costPerUnit * recipeItem.quantity;
    }
  });

  return totalCost;
};
