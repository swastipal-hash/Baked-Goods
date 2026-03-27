import { useState, useEffect } from 'react';
import { storage, calculateRecipeCost } from '../utils/storage';

export default function SavedRecipesTab({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editServings, setEditServings] = useState('');
  const [editCurrency, setEditCurrency] = useState('');
  const [editIngredients, setEditIngredients] = useState([]);

  useEffect(() => {
    setRecipes(storage.getRecipes());
  }, []);

  const deleteRecipe = (recipeId) => {
    const updated = recipes.filter((r) => r.id !== recipeId);
    setRecipes(updated);
    storage.saveRecipes(updated);
  };

  const startEdit = (recipe) => {
    setEditingRecipe(recipe);
    setEditName(recipe.name);
    setEditDescription(recipe.description);
    setEditServings(recipe.servings.toString());
    setEditCurrency(recipe.currency || 'THB');
    setEditIngredients([...recipe.ingredients]);
  };

  const cancelEdit = () => {
    setEditingRecipe(null);
    setEditName('');
    setEditDescription('');
    setEditServings('');
    setEditCurrency('');
    setEditIngredients([]);
  };

  const updateIngredientQuantity = (ingredientId, quantity) => {
    setEditIngredients(
      editIngredients.map((item) =>
        item.ingredientId === ingredientId
          ? { ...item, quantity: parseFloat(quantity) || 0 }
          : item
      )
    );
  };

  const removeIngredientFromEdit = (ingredientId) => {
    setEditIngredients(editIngredients.filter((item) => item.ingredientId !== ingredientId));
  };

  const addIngredientToEdit = (ingredientId) => {
    if (!editIngredients.find((item) => item.ingredientId === ingredientId)) {
      setEditIngredients([...editIngredients, { ingredientId, quantity: 1 }]);
    }
  };

  const saveEdit = () => {
    if (!editName.trim() || editIngredients.length === 0) {
      alert('Please fill in recipe name and add at least one ingredient.');
      return;
    }

    const updated = recipes.map((r) =>
      r.id === editingRecipe.id
        ? {
            ...r,
            name: editName,
            description: editDescription,
            servings: parseInt(editServings) || 1,
            currency: editCurrency,
            ingredients: editIngredients,
          }
        : r
    );

    setRecipes(updated);
    storage.saveRecipes(updated);
    cancelEdit();
  };

  const formatCurrency = (amount, currency) => {
    return `${currency} ${amount.toFixed(2)}`;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Saved Recipes</h2>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No saved recipes yet.</p>
          <p className="text-gray-400">Create recipes in the "Create Recipe" tab to save them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => {
            const totalCost = calculateRecipeCost(recipe.ingredients, ingredients);
            const costPerServing = totalCost / recipe.servings;

            return (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-gray-600 mb-4">{recipe.description}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Servings:</span> {recipe.servings}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Total Cost:</span>{' '}
                    {formatCurrency(totalCost, recipe.currency || 'THB')}
                  </p>
                  <p className="text-lg font-semibold text-blue-600">
                    Cost per serving: {formatCurrency(costPerServing, recipe.currency || 'THB')}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Ingredients:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {recipe.ingredients.map((item) => {
                      const ing = ingredients.find((i) => i.id === item.ingredientId);
                      return (
                        <li key={item.ingredientId}>
                          {ing?.name}: {item.quantity} {ing?.unit}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(recipe)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Recipe Modal */}
      {editingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">Edit Recipe</h3>
              <button
                onClick={cancelEdit}
                className="text-2xl leading-none hover:bg-blue-700 p-1 rounded"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Name *
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Chocolate Cake"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Recipe description"
                  rows="2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servings *
                  </label>
                  <input
                    type="number"
                    value={editServings}
                    onChange={(e) => setEditServings(e.target.value)}
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
                    value={editCurrency}
                    onChange={(e) => setEditCurrency(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength="3"
                  />
                </div>
              </div>

              {/* Add Ingredients Section */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">Add Ingredient</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ingredients.map((ingredient) => (
                    <button
                      key={ingredient.id}
                      onClick={() => addIngredientToEdit(ingredient.id)}
                      disabled={editIngredients.some((item) => item.ingredientId === ingredient.id)}
                      className="text-left p-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <div className="font-medium text-gray-800">{ingredient.name}</div>
                      <div className="text-xs text-gray-600">
                        {ingredient.currency} {ingredient.cost.toFixed(2)} for {ingredient.amount} {ingredient.unit}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Edit Ingredients */}
              {editIngredients.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Recipe Ingredients</h4>
                  <div className="space-y-2">
                    {editIngredients.map((item) => {
                      const ingredient = ingredients.find((ing) => ing.id === item.ingredientId);
                      const costPerUnit = ingredient ? ingredient.cost / ingredient.amount : 0;
                      const itemTotal = costPerUnit * item.quantity;

                      return (
                        <div key={item.ingredientId} className="flex gap-2 items-center bg-gray-50 p-3 rounded">
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-800">{ingredient?.name}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateIngredientQuantity(item.ingredientId, e.target.value)}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                              min="0"
                              step="0.01"
                            />
                            <span className="text-gray-700 text-sm w-12">{ingredient?.unit}</span>
                          </div>
                          <button
                            onClick={() => removeIngredientFromEdit(item.ingredientId)}
                            className="text-red-600 hover:text-red-800 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={saveEdit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={cancelEdit}
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
