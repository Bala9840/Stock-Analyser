// Basic candlestick pattern detection
export const detectPatterns = (data) => {
  if (!data || data.length < 3) return [];
  
  const patterns = [];
  
  for (let i = 2; i < data.length; i++) {
    const current = data[i];
    const previous = data[i - 1];
    const twoPrevious = data[i - 2];
    
    // Hammer pattern (bullish reversal)
    if (isHammer(current)) {
      patterns.push({
        index: i,
        pattern: 'Hammer',
        type: 'bullish',
        confidence: 0.7
      });
    }
    
    // Engulfing pattern
    if (isBullishEngulfing(previous, current)) {
      patterns.push({
        index: i,
        pattern: 'Bullish Engulfing',
        type: 'bullish',
        confidence: 0.8
      });
    }
    
    if (isBearishEngulfing(previous, current)) {
      patterns.push({
        index: i,
        pattern: 'Bearish Engulfing',
        type: 'bearish',
        confidence: 0.8
      });
    }
    
    // Doji pattern
    if (isDoji(current)) {
      patterns.push({
        index: i,
        pattern: 'Doji',
        type: 'neutral',
        confidence: 0.6
      });
    }
  }
  
  return patterns;
};

const isHammer = (candle) => {
  const bodySize = Math.abs(candle.close - candle.open);
  const lowerShadow = Math.min(candle.open, candle.close) - candle.low;
  const upperShadow = candle.high - Math.max(candle.open, candle.close);
  
  return lowerShadow >= 2 * bodySize && upperShadow <= bodySize * 0.1;
};

const isBullishEngulfing = (prevCandle, currentCandle) => {
  const prevBody = Math.abs(prevCandle.close - prevCandle.open);
  const currentBody = Math.abs(currentCandle.close - currentCandle.open);
  
  return prevCandle.close < prevCandle.open && // Previous was bearish
         currentCandle.close > currentCandle.open && // Current is bullish
         currentCandle.open < prevCandle.close &&
         currentCandle.close > prevCandle.open;
};

const isBearishEngulfing = (prevCandle, currentCandle) => {
  const prevBody = Math.abs(prevCandle.close - prevCandle.open);
  const currentBody = Math.abs(currentCandle.close - currentCandle.open);
  
  return prevCandle.close > prevCandle.open && // Previous was bullish
         currentCandle.close < currentCandle.open && // Current is bearish
         currentCandle.open > prevCandle.close &&
         currentCandle.close < prevCandle.open;
};

const isDoji = (candle) => {
  const bodySize = Math.abs(candle.close - candle.open);
  const totalRange = candle.high - candle.low;
  
  return bodySize <= totalRange * 0.1; // Body is less than 10% of total range
};