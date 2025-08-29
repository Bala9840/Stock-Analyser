export const getWatchlist = () => {
  try {
    const watchlist = localStorage.getItem('stockWatchlist');
    return watchlist ? JSON.parse(watchlist) : [];
  } catch {
    return [];
  }
};

export const addToWatchlist = (symbol) => {
  try {
    const watchlist = getWatchlist();
    if (!watchlist.includes(symbol)) {
      const updatedWatchlist = [...watchlist, symbol];
      localStorage.setItem('stockWatchlist', JSON.stringify(updatedWatchlist));
    }
  } catch (error) {
    console.error('Error adding to watchlist:', error);
  }
};

export const removeFromWatchlist = (symbol) => {
  try {
    const watchlist = getWatchlist();
    const updatedWatchlist = watchlist.filter(item => item !== symbol);
    localStorage.setItem('stockWatchlist', JSON.stringify(updatedWatchlist));
  } catch (error) {
    console.error('Error removing from watchlist:', error);
  }
};