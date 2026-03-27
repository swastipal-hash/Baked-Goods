import { useState, useEffect } from 'react';
import { storage, generateId } from '../utils/storage';
import IngredientSearch from './IngredientSearch';

export default function IngredientsTab() {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('THB');
  const [amount, setAmount] = useState('');
  const [cost, setCost] = useState('');
  const [unit, setUnit] = useState('g');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setIngredients(storage.getIngredients());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !amount || !cost) {
      alert('Please fill in all required fields');
      return;
    }

    let updated;
    if (editingId) {
      updated = ingredients.map((ing) =>
        ing.id === editingId
          ? { id: editingId, name, currency, amount: parseFloat(amount), cost: parseFloat(cost), unit }
          : ing
      );
      setEditingId(null);
    } else {
      const newIngredient = {
        id: generateId(),
        name,
        currency,
        amount: parseFloat(amount),
        cost: parseFloat(cost),
        unit,
      };
      updated = [...ingredients, newIngredient];
    }

    setIngredients(updated);
    storage.saveIngredients(updated);

    // Reset form
    setName('');
    setCurrency('THB');
    setAmount('');
    setCost('');
    setUnit('g');
  };

  const startEdit = (ingredient) => {
    setEditingId(ingredient.id);
    setName(ingredient.name);
    setCurrency(ingredient.currency);
    setAmount(ingredient.amount.toString());
    setCost(ingredient.cost.toString());
    setUnit(ingredient.unit);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setCurrency('THB');
    setAmount('');
    setCost('');
    setUnit('g');
  };

  const handleSearchSelect = (selectedName, selectedPrice, selectedUnit) => {
    setName(selectedName);
    setCost(selectedPrice.toString());
    if (selectedUnit) {
      // Parse unit from the "quantity unit" format (e.g., "500g" → "g")
      const unitMatch = selectedUnit.match(/([a-zA-Z%]+)$/);
      if (unitMatch) {
        setUnit(unitMatch[1]);
      }
      // Extract amount from unit string if needed
      const amountMatch = selectedUnit.match(/^(\d+)/);
      if (amountMatch) {
        setAmount(amountMatch[1]);
      } else {
        setAmount('1');
      }
    }
  };

  const deleteIngredient = (id) => {
    const updated = ingredients.filter((ing) => ing.id !== id);
    setIngredients(updated);
    storage.saveIngredients(updated);
  };

  const getCostPerUnit = (ingredient) => {
    return (ingredient.cost / ingredient.amount).toFixed(4);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ingredients Directory</h2>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          {editingId ? 'Edit Ingredient' : 'Add New Ingredient'}
        </h3>

        {/* Search Component */}
        {!editingId && (
          <IngredientSearch 
            onSelectName={(name) => setName(name)}
            onSelectPrice={(price, unit) => {
              setCost(price.toString());
              // Extract unit from "amount unit" format (e.g., "500g" -> amount=500, unit="g")
              const match = unit?.match(/(\d+)(.+)/);
              if (match) {
                setAmount(match[1]);
                setUnit(match[2]);
              }
            }}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredient Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Flour"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Purchased *
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 500"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Cost *
              </label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 150"
                step="0.01"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {editingId ? 'Update Ingredient' : 'Add Ingredient'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Ingredients List */}
      {ingredients.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No ingredients added yet.</p>
          <p className="text-gray-400">Add your first ingredient above to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{ingredient.name}</h3>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Amount:</span>
                  <span className="font-medium">{ingredient.amount} {ingredient.unit}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Total Cost:</span>
                  <span className="font-medium">
                    {ingredient.currency} {ingredient.cost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 bg-blue-50 p-2 rounded">
                  <span>Cost per Unit:</span>
                  <span className="font-semibold text-blue-600">
                    {ingredient.currency} {getCostPerUnit(ingredient)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(ingredient)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteIngredient(ingredient.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
