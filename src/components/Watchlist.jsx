import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
// import StockCard from './StockCard';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../utils/localStorage';
import StockCard from './StockCards';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [newSymbol, setNewSymbol] = useState('');

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleAddStock = () => {
    if (newSymbol.trim()) {
      addToWatchlist(newSymbol.trim().toUpperCase());
      setWatchlist(getWatchlist());
      setNewSymbol('');
    }
  };

  const handleRemoveStock = (symbol) => {
    removeFromWatchlist(symbol);
    setWatchlist(getWatchlist());
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">My Watchlist</h2>
        </div>
        
        <div className="search-bar">
          <input 
            type="text" 
            className="search-input"
            placeholder="Add stock symbol..."
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStock()}
          />
          <button className="search-btn" onClick={handleAddStock}>
            <Plus size={16} /> Add
          </button>
        </div>

        <div className="stock-grid">
          {watchlist.length > 0 ? (
            watchlist.map(symbol => (
              <div key={symbol} className="stock-card">
                <div className="stock-header">
                  <div className="stock-symbol">{symbol}</div>
                  <button 
                    onClick={() => handleRemoveStock(symbol)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <StockCard symbol={symbol} name="" />
              </div>
            ))
          ) : (
            <p>Your watchlist is empty. Add some stocks to track.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;