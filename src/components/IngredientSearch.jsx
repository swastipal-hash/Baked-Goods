import { useState } from 'react';
import { searchIngredients, getLowestPrice, getAveragePrice } from '../utils/searchService';

export default function IngredientSearch({ onSelectPrice, onSelectName }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (value) => {
    setSearchQuery(value);

    if (value.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = searchIngredients(value);
      setSearchResults(results);
      setShowResults(results.length > 0);
      setIsSearching(false);
    }, 300);
  };

  const handleSelectResult = (result) => {
    setSelectedResult(result);
    onSelectName?.(result.name);
    onSelectPrice?.(result.price, result.unit);
    setShowResults(false);
  };

  const averagePrice = getAveragePrice(searchResults);
  const lowestPrice = getLowestPrice(searchResults);

  return (
    <div className="relative">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🔍 Search Ingredient (Optional)
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="e.g., Nuttarin Coconut Sugar, Butter, Flour..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          Search for ingredient brands to find Bangkok market prices
        </p>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="text-center py-3 text-gray-500">
          Searching Bangkok markets...
        </div>
      )}

      {/* Search Results */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {/* Price Summary */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-blue-100 p-3 border-b border-gray-200">
            <div className="text-sm font-semibold text-gray-800 mb-2">
              Found {searchResults.length} results in Bangkok
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded">
                <div className="text-gray-600">Avg Price</div>
                <div className="font-bold text-blue-600">THB {averagePrice?.toFixed(0)}</div>
              </div>
              <div className="bg-white p-2 rounded">
                <div className="text-gray-600">Lowest</div>
                <div className="font-bold text-green-600">THB {lowestPrice?.price.toFixed(0)}</div>
              </div>
            </div>
          </div>

          {/* Result Items */}
          <div className="divide-y">
            {searchResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelectResult(result)}
                className={`w-full text-left p-3 hover:bg-blue-50 transition ${
                  selectedResult?.id === result.id ? 'bg-blue-100' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{result.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {result.brand} • {result.unit}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{result.source}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">THB {result.price}</div>
                    {lowestPrice?.id === result.id && (
                      <div className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded mt-1">
                        Lowest Price ✓
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 p-3 border-t border-gray-200 text-xs text-gray-600">
            💡 Tip: Click on a result to auto-fill the price. You can still edit it if needed.
          </div>
        </div>
      )}

      {/* No Results Message */}
      {showResults === false && searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && (
        <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <p className="text-gray-600 text-sm">
            No results found for "{searchQuery}". 
            <br />
            <span className="text-gray-500">Try searching with different keywords or enter your own ingredient details below.</span>
          </p>
        </div>
      )}

      {/* Selected Result Indicator */}
      {selectedResult && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm">
            <span className="text-green-700 font-medium">✓ Selected: </span>
            <span className="text-gray-700">{selectedResult.name}</span>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            THB {selectedResult.price} • {selectedResult.source}
          </div>
        </div>
      )}
    </div>
  );
}
