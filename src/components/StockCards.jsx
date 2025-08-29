import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StockCard = ({ symbol, name }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Using Alpha Vantage API (you'll need to get your own API key)
        const API_KEY = 'SRQZ2HL1TG3GDN8D'; // Replace with your API key
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        
        const data = await response.json();
        
        if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
          const quote = data['Global Quote'];
          setStockData({
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['09. change']),
            changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
          });
        } else {
          // Fallback to mock data if API limit reached
          setStockData({
            price: 100 + Math.random() * 100,
            change: (Math.random() * 10 - 5),
            changePercent: (Math.random() * 10 - 5)
          });
        }
      } catch (err) {
        setError(err.message);
        // Fallback to mock data
        setStockData({
          price: 100 + Math.random() * 100,
          change: (Math.random() * 10 - 5),
          changePercent: (Math.random() * 10 - 5)
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (loading) return <div className="stock-card">Loading...</div>;
  if (error) console.error(error);

  return (
    <div className="stock-card">
      <div className="stock-header">
        <div>
          <div className="stock-symbol">{symbol}</div>
          <div>{name}</div>
        </div>
        {stockData && (
          <div className={`stock-change ${stockData.change >= 0 ? 'change-positive' : 'change-negative'}`}>
            {stockData.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {stockData.changePercent.toFixed(2)}%
          </div>
        )}
      </div>
      {stockData && (
        <div className="stock-price">${stockData.price.toFixed(2)}</div>
      )}
    </div>
  );
};

export default StockCard;