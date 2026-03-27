import { useState, useEffect } from 'react';
import { storage } from './utils/storage';
import IngredientsTab from './components/IngredientsTab';
import RecipesTab from './components/RecipesTab';
import SavedRecipesTab from './components/SavedRecipesTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [ingredients, setIngredients] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadIngredients();
  }, [refreshKey]);

  const loadIngredients = () => {
    setIngredients(storage.getIngredients());
  };

  const handleRecipeSaved = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">🧁 Baked Goods Cost Calculator</h1>
          <p className="text-orange-100 mt-2">Calculate ingredient costs and pricing for your baked goods</p>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`py-4 px-2 font-semibold transition border-b-4 ${
                activeTab === 'ingredients'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-orange-600'
              }`}
            >
              📦 Ingredients
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`py-4 px-2 font-semibold transition border-b-4 ${
                activeTab === 'recipes'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-orange-600'
              }`}
            >
              🍰 Create Recipe
            </button>
            <button
              onClick={() => {
                setActiveTab('saved');
                setRefreshKey((prev) => prev + 1);
              }}
              className={`py-4 px-2 font-semibold transition border-b-4 ${
                activeTab === 'saved'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-orange-600'
              }`}
            >
              ⭐ Saved Recipes
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'ingredients' && <IngredientsTab key={refreshKey} />}
        {activeTab === 'recipes' && (
          <RecipesTab 
            ingredients={ingredients} 
            onRecipeSaved={handleRecipeSaved}
            onIngredientsUpdate={loadIngredients}
          />
        )}
        {activeTab === 'saved' && <SavedRecipesTab key={refreshKey} ingredients={ingredients} />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 Baked Goods Cost Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
