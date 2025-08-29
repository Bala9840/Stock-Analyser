import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const OptionAnalysis = ({ symbol }) => {
  const [optionsData, setOptionsData] = useState([]);

  useEffect(() => {
    // Mock options data
    const mockData = [
      {
        contract: `${symbol} SEP 15 180 CALL`,
        premium: 4.50,
        strike: 180,
        iv: 0.35,
        oi: 1245,
        itm: true,
        recommendation: 'BUY'
      },
      {
        contract: `${symbol} SEP 15 175 CALL`,
        premium: 6.75,
        strike: 175,
        iv: 0.32,
        oi: 987,
        itm: true,
        recommendation: 'HOLD'
      },
      {
        contract: `${symbol} SEP 15 185 CALL`,
        premium: 2.25,
        strike: 185,
        iv: 0.38,
        oi: 1567,
        itm: false,
        recommendation: 'SELL'
      },
      {
        contract: `${symbol} SEP 15 170 PUT`,
        premium: 3.20,
        strike: 170,
        iv: 0.40,
        oi: 876,
        itm: false,
        recommendation: 'HOLD'
      }
    ];

    setOptionsData(mockData);
  }, [symbol]);

  const getRecommendationIcon = (rec) => {
    switch (rec) {
      case 'BUY': return <TrendingUp size={16} className="change-positive" />;
      case 'SELL': return <TrendingDown size={16} className="change-negative" />;
      default: return <Minus size={16} />;
    }
  };

  return (
    <div>
      <h3>Option Chain Analysis for {symbol}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '10px' }}>Contract</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Premium</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Strike</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>IV</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>OI</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>ITM</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {optionsData.map((option, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{option.contract}</td>
                <td style={{ padding: '10px' }}>${option.premium.toFixed(2)}</td>
                <td style={{ padding: '10px' }}>${option.strike.toFixed(2)}</td>
                <td style={{ padding: '10px' }}>{(option.iv * 100).toFixed(1)}%</td>
                <td style={{ padding: '10px' }}>{option.oi}</td>
                <td style={{ padding: '10px' }}>{option.itm ? 'Yes' : 'No'}</td>
                <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {getRecommendationIcon(option.recommendation)}
                  {option.recommendation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionAnalysis;