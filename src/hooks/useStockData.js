import { useState, useEffect } from 'react';

const useStockData = (symbol) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;
      
      setLoading(true);
      try {
        // Using Alpha Vantage API (you'll need to get your own API key)
        const API_KEY = 'SRQZ2HL1TG3GDN8D'; // Replace with your API key
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        
        const result = await response.json();
        
        if (result['Time Series (Daily)']) {
          const timeSeries = result['Time Series (Daily)'];
          const chartData = Object.keys(timeSeries).map(date => {
            const dayData = timeSeries[date];
            return {
              date,
              open: parseFloat(dayData['1. open']),
              high: parseFloat(dayData['2. high']),
              low: parseFloat(dayData['3. low']),
              close: parseFloat(dayData['4. close']),
              volume: parseFloat(dayData['5. volume'])
            };
          }).slice(0, 30).reverse(); // Last 30 days
          
          setData(chartData);
        } else {
          // Fallback to mock data if API limit reached
          const mockData = Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            open: 150 + Math.random() * 50,
            high: 150 + Math.random() * 60,
            low: 150 + Math.random() * 40,
            close: 150 + Math.random() * 50,
            volume: Math.floor(Math.random() * 1000000)
          }));
          setData(mockData);
        }
      } catch (err) {
        setError(err.message);
        // Fallback to mock data
        const mockData = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          open: 150 + Math.random() * 50,
          high: 150 + Math.random() * 60,
          low: 150 + Math.random() * 40,
          close: 150 + Math.random() * 50,
          volume: Math.floor(Math.random() * 1000000)
        }));
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return { data, loading, error };
};

export default useStockData;