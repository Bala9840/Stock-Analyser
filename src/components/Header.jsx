import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="header">
      <h1>Stock Market Analysis Dashboard</h1>
      <nav className="nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'watchlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('watchlist')}
        >
          Watchlist
        </button>
        <button 
          className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          News & Alerts
        </button>
      </nav>
    </header>
  );
};

export default Header;