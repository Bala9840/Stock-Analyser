import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock news data since Alpha Vantage news requires premium API
    const mockNews = [
      {
        title: 'Federal Reserve Holds Interest Rates Steady',
        summary: 'The Federal Reserve decided to maintain current interest rates, citing stable economic growth and controlled inflation.',
        source: 'Financial Times',
        date: '2023-08-20',
        sentiment: 'neutral',
        url: '#'
      },
      {
        title: 'Tech Stocks Rally Amid Positive Earnings Reports',
        summary: 'Major technology companies reported better-than-expected earnings, leading to a sector-wide rally.',
        source: 'Bloomberg',
        date: '2023-08-19',
        sentiment: 'positive',
        url: '#'
      },
      {
        title: 'Oil Prices Drop Amid Concerns Over Global Demand',
        summary: 'Crude oil prices fell by 3% as concerns about slowing global economic growth weighed on markets.',
        source: 'Reuters',
        date: '2023-08-18',
        sentiment: 'negative',
        url: '#'
      },
      {
        title: 'New Regulations Proposed for Cryptocurrency Markets',
        summary: 'Regulators announced new proposed rules for cryptocurrency exchanges and trading platforms.',
        source: 'Wall Street Journal',
        date: '2023-08-17',
        sentiment: 'neutral',
        url: '#'
      },
      {
        title: 'Automobile Industry Sees Record Electric Vehicle Sales',
        summary: 'Electric vehicle sales reached new records last quarter as consumer adoption accelerates.',
        source: 'CNBC',
        date: '2023-08-16',
        sentiment: 'positive',
        url: '#'
      }
    ];

    setNews(mockNews);
    setLoading(false);
  }, []);

  if (loading) return <div className="loading">Loading news...</div>;

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Market News & Alerts</h2>
        </div>
        
        <div className="news-grid">
          {news.map((item, index) => (
            <div key={index} className="news-card">
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <p className="news-summary">{item.summary}</p>
                <div className="news-footer">
                  <span>{item.source}</span>
                  <span className={`sentiment-${item.sentiment}`}>
                    {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                  </span>
                  <span>
                    <Calendar size={14} style={{ display: 'inline', marginRight: '5px' }} />
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;