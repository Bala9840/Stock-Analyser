import React, { useState, useEffect } from 'react';
import CandlestickChart from './CandlestickChart';
import OptionAnalysis from './OptionAnalysis';
import useStockData from '../hooks/useStockData';
import StockCard from './StockCards';

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState('IBM');
  const { data, loading, error } = useStockData(selectedStock);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [expiryAlerts, setExpiryAlerts] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    // AI Suggestions based on RSI
    const suggestions = [
      { symbol: 'AAPL', name: 'Apple Inc.', action: 'BUY', reason: 'Oversold (RSI: 28)' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', action: 'HOLD', reason: 'Neutral (RSI: 45)' },
      { symbol: 'TSLA', name: 'Tesla Inc.', action: 'SELL', reason: 'Overbought (RSI: 72)' }
    ];
    setAiSuggestions(suggestions);

    // Expiry alerts
    const alerts = [
      { contract: 'NIFTY AUG 28 18000 CALL', expiry: '2023-08-28', daysLeft: 5 },
      { contract: 'BANKNIFTY AUG 28 42000 PUT', expiry: '2023-08-28', daysLeft: 5 }
    ];
    setExpiryAlerts(alerts);
  }, []);

  if (loading) return <div className="loading">Loading market data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div className="search-bar">
        <input 
          type="text" 
          className="search-input"
          placeholder="Enter stock symbol (e.g., IBM, AAPL)..."
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value.toUpperCase())}
        />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Market Overview</h2>
          </div>
          <div className="stock-grid">
            <StockCard symbol="IBM" name="International Business Machines" />
            <StockCard symbol="AAPL" name="Apple Inc." />
            <StockCard symbol="MSFT" name="Microsoft Corporation" />
            <StockCard symbol="^GSPC" name="S&P 500 Index" />
            <StockCard symbol="^NSEI" name="Nifty 50" />
            <StockCard symbol="^BSESN" name="Sensex" />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">AI Stock Suggestions</h2>
          </div>
          <div>
            {aiSuggestions.map((stock, index) => (
              <div key={index} className="stock-card">
                <div className="stock-header">
                  <div>
                    <div className="stock-symbol">{stock.symbol}</div>
                    <div>{stock.name}</div>
                  </div>
                  <div className={`stock-change ${stock.action === 'BUY' ? 'change-positive' : stock.action === 'SELL' ? 'change-negative' : ''}`}>
                    {stock.action}
                  </div>
                </div>
                <div>{stock.reason}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Expiry Date Alerts</h2>
            <AlertCircle size={20} />
          </div>
          <div>
            {expiryAlerts.map((alert, index) => (
              <div key={index} className="stock-card">
                <div className="stock-header">
                  <div className="stock-symbol">{alert.contract}</div>
                  <div className="stock-change change-negative">
                    {alert.daysLeft} days left
                  </div>
                </div>
                <div>Expires: {alert.expiry}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Price Chart - {selectedStock}</h2>
          </div>
          <CandlestickChart data={data} symbol={selectedStock} />
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Option Analysis</h2>
          </div>
          <OptionAnalysis symbol={selectedStock} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;