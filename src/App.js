import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Watchlist from './components/Watchlist';
import NewsFeed from "./components/NewsFeed";

import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'watchlist':
        return <Watchlist />;
      case 'news':
        return <NewsFeed />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;