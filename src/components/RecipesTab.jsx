import { useState, useEffect } from 'react';
import { generateId, storage, calculateRecipeCost } from '../utils/storage';

export default function RecipesTab({ ingredients, onRecipeSaved, onIngredientsUpdate }) {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [servings, setServings] = useState(1);
  const [currency, setCurrency] = useState('THB');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [localIngredients, setLocalIngredients] = useState(ingredients);
  
  // Modal state for adding new ingredient
  const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);
  const [newIngName, setNewIngName] = useState('');
  const [newIngCurrency, setNewIngCurrency] = useState('THB');
  const [newIngAmount, setNewIngAmount] = useState('');
  const [newIngCost, setNewIngCost] = useState('');
  const [newIngUnit, setNewIngUnit] = useState('g');

  // Sync ingredients from props without losing form state
  useEffect(() => {
    setLocalIngredients(ingredients);
  }, [ingredients]);

  const addIngredientToRecipe = (ingredientId) => {
    if (!selectedIngredients.find((item) => item.ingredientId === ingredientId)) {
      setSelectedIngredients([
        ...selectedIngredients,
        { ingredientId, quantity: 1 },
      ]);
    }
  };

  const updateIngredientQuantity = (ingredientId, quantity) => {
    setSelectedIngredients(
      selectedIngredients.map((item) =>
        item.ingredientId === ingredientId ? { ...item, quantity: parseFloat(quantity) || 0 } : item
      )
    );
  };

  const removeIngredientFromRecipe = (ingredientId) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item.ingredientId !== ingredientId)
    );
  };

  const addNewIngredient = () => {
    if (!newIngName.trim() || !newIngAmount || !newIngCost) {
      alert('Please fill in all required fields');
      return;
    }

    const ingredient = {
      id: generateId(),
      name: newIngName,
      currency: newIngCurrency,
      amount: parseFloat(newIngAmount),
      cost: parseFloat(newIngCost),
      unit: newIngUnit,
    };

    // Save to global storage
    const allIngredients = storage.getIngredients();
    allIngredients.push(ingredient);
    storage.saveIngredients(allIngredients);

    // Update local state
    setLocalIngredients([...localIngredients, ingredient]);

    // Add to recipe immediately
    setSelectedIngredients([
      ...selectedIngredients,
      { ingredientId: ingredient.id, quantity: 1 },
    ]);

    // Reset modal
    setNewIngName('');
    setNewIngCurrency('THB');
    setNewIngAmount('');
    setNewIngCost('');
    setNewIngUnit('g');
    setShowAddIngredientModal(false);

    // Notify parent to reload ingredients from storage into App state
    // This ensures the parent has latest ingredients without remounting this component
    onIngredientsUpdate?.();
  };

  const saveRecipe = () => {
    if (!recipeName.trim() || selectedIngredients.length === 0) {
      alert('Please fill in recipe name and add at least one ingredient.');
      return;
    }

    const newRecipe = {
      id: generateId(),
      name: recipeName,
      description: recipeDescription,
      servings: parseInt(servings) || 1,
      currency,
      ingredients: selectedIngredients,
    };

    const recipes = storage.getRecipes();
    recipes.push(newRecipe);
    storage.saveRecipes(recipes);

    // Reset form
    setRecipeName('');
    setRecipeDescription('');
    setServings(1);
    setCurrency('THB');
    setSelectedIngredients([]);

    onRecipeSaved?.();
    alert('Recipe saved successfully!');
  };

  const totalCost = calculateRecipeCost(selectedIngredients, localIngredients.length > 0 ? localIngredients : ingredients);
  const costPerServing = servings > 0 ? totalCost / servings : 0;

  // Merge local and parent ingredients, showing newest first
  const allIngredients = [...localIngredients];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Recipe</h2>

      {ingredients.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No ingredients added yet.</p>
          <p className="text-gray-400">Add ingredients in the "Ingredients" tab first.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Recipe Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Recipe Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Name *
                </label>
                <input
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Chocolate Cake"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={recipeDescription}
                  onChange={(e) => setRecipeDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Rich chocolate cake with frosting"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servings *
                  </label>
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="THB"
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients Selection */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Ingredients</h3>
              <button
                onClick={() => setShowAddIngredientModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition"
              >
                + Create New Ingredient
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allIngredients.map((ingredient) => (
                <button
                  key={ingredient.id}
                  onClick={() => addIngredientToRecipe(ingredient.id)}
                  disabled={selectedIngredients.some((item) => item.ingredientId === ingredient.id)}
                  className="text-left p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="font-medium text-gray-800">{ingredient.name}</div>
                  <div className="text-sm text-gray-600">
                    {ingredient.currency} {ingredient.cost.toFixed(2)} for {ingredient.amount}{' '}
                    {ingredient.unit}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Ingredients with Quantities */}
          {selectedIngredients.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Recipe Ingredients</h3>
              <div className="space-y-3">
                {selectedIngredients.map((item) => {
                  const ingredient = allIngredients.find((ing) => ing.id === item.ingredientId);
                  const costPerUnit = ingredient ? ingredient.cost / ingredient.amount : 0;
                  const itemTotal = costPerUnit * item.quantity;

                  return (
                    <div key={item.ingredientId} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{ingredient?.name}</div>
                        <div className="text-sm text-gray-600">Cost per unit: {ingredient?.currency} {costPerUnit.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateIngredientQuantity(item.ingredientId, e.target.value)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="0"
                          step="0.01"
                        />
                        <span className="text-gray-700 w-16">{ingredient?.unit}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-800">{ingredient?.currency} {itemTotal.toFixed(2)}</div>
                        <button
                          onClick={() => removeIngredientFromRecipe(item.ingredientId)}
                          className="text-sm text-red-600 hover:text-red-800 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary */}
          {selectedIngredients.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <div className="space-y-2">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-800">Total Recipe Cost:</span>
                  <span className="font-bold text-blue-600">
                    {currency} {totalCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xl">
                  <span className="font-semibold text-gray-800">Cost per Serving:</span>
                  <span className="font-bold text-green-600">
                    {currency} {costPerServing.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={saveRecipe}
            disabled={!recipeName.trim() || selectedIngredients.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Save Recipe
          </button>
        </div>
      )}

      {/* Add New Ingredient Modal */}
      {showAddIngredientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">Create New Ingredient</h3>
              <button
                onClick={() => setShowAddIngredientModal(false)}
                className="text-2xl leading-none hover:bg-green-700 p-1 rounded"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredient Name *
                </label>
                <input
                  type="text"
                  value={newIngName}
                  onChange={(e) => setNewIngName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Whole Wheat Flour"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <input
                  type="text"
                  value={newIngCurrency}
                  onChange={(e) => setNewIngCurrency(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="THB"
                  maxLength="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount *
                  </label>
                  <input
                    type="number"
                    value={newIngAmount}
                    onChange={(e) => setNewIngAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="500"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    value={newIngUnit}
                    onChange={(e) => setNewIngUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="ml">Milliliters (ml)</option>
                    <option value="l">Liters (l)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="cup">Cups</option>
                    <option value="tbsp">Tablespoons (tbsp)</option>
                    <option value="tsp">Teaspoons (tsp)</option>
                    <option value="count">Count</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Cost *
                </label>
                <input
                  type="number"
                  value={newIngCost}
                  onChange={(e) => setNewIngCost(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="150"
                  step="0.01"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={addNewIngredient}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Create & Add
                </button>
                <button
                  onClick={() => setShowAddIngredientModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
