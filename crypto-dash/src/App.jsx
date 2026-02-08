import { useEffect, useState } from 'react'
import './App.css'
import searchIcon from './assets/search.png'
import notificationIcon from './assets/notification.svg'
import overviewIcon from './assets/four-grid.png'
import watchlistIcon from './assets/watchlist-icon.svg'
import allCoinsIcon from './assets/all-coins-icon.svg'

function Sidebar({currentPage, onPageChange}) {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: overviewIcon},
    { id: 'watchlist', label: 'Watchlist', icon: watchlistIcon },
    { id: 'all-coins', label: 'All Coins', icon: allCoinsIcon },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>CryptoDash</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            <span className="nav-icon">
              <img src={item.icon} alt={item.label} className="nav-icon-img" />
            </span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

function SearchBar({onSearchCoin}){
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchCoin(searchText);
    setSearchText('');
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchText}
        onChange={handleChange}
      />
      <button type="submit">
        <img src={searchIcon} alt="Search" className="search-icon" />
      </button>
    </form>
  );
}

function NotificationPanel({ notifications, onDeleteNotification, showPanel, setShowPanel }) {
  if (!showPanel) return null;

  return (
    <div className="notification-panel">
      {notifications.length === 0 ? (
        <div className="no-notifications">No new notifications</div>
      ) : (
        <ul className="notification-list">
          {notifications.map((notif) => (
            <li key={notif.id} className="notification-item">
              <div className="notification-content">
                <span className="notification-message">{notif.message}</span>
                <span className="notification-timestamp">{notif.timestamp}</span>
              </div>
              <button className="delete-notification" onClick={() => onDeleteNotification(notif.id)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NotificationBell({ showPanel, setShowPanel, notifications, onDeleteNotification }){
  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div className="notification-container">
      <button className="notification-btn" onClick={togglePanel}>
        <img src={notificationIcon} alt="Notification" className="notification-icon"/>
      </button>
      <NotificationPanel 
        notifications={notifications} 
        onDeleteNotification={onDeleteNotification} 
        showPanel={showPanel} 
        setShowPanel={setShowPanel} 
      />
    </div>
  );
}

function Header({searchCoin, showNotifications, setShowNotifications, notifications, onDeleteNotification}) {
  return (
    <header className="header">
      <h1>Dashboard</h1>

      <SearchBar onSearchCoin={searchCoin} />

      <NotificationBell 
        showPanel={showNotifications} 
        setShowPanel={setShowNotifications} 
        notifications={notifications} 
        onDeleteNotification={onDeleteNotification} 
      />
    </header>
  );
}

function CoinCard({coin}){
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="coin-card">
      <div className="coin-header">
        <div className="coin-icon-wrapper">
          <img src={coin.image} alt={coin.name} className="coin-icon"/>
        </div>

        <div className="coin-info">
          <h3>{coin.name}</h3>
          <p className="coin-short">{coin.symbol.toUpperCase()}</p>
        </div>

        <span className={`trend-arrow ${isPositive ? 'up' : 'down'}`}>
          {isPositive ? '▲' : '▼'}
        </span>
      </div>

      <div className="coin-price">
        <div className="coin-price-info">
          <h2>${coin.current_price.toLocaleString()}</h2>
          <span className={`change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function WatchList ({coins, isFullPage = false}) {
  const [currentPage, setCurrentPage] = useState(0);
  const coinsPerPage = isFullPage ? coins.length : 4;
  const totalPages = isFullPage ? 1 : Math.ceil(coins.length / coinsPerPage);

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    }
  }, [coins.length, currentPage, totalPages]);

  const startIndex = currentPage * coinsPerPage;
  const endIndex = startIndex + coinsPerPage;
  const currentCoins = isFullPage ? coins : coins.slice(startIndex, endIndex);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  if (coins.length === 0) {
    return (
      <div className={`watchlist-container ${isFullPage ? 'full-page' : ''}`}>
        <div className="watchlist empty">
          <div className="empty-message">Watchlist is Empty...</div>
        </div>
      </div>
    );
  }

  if (isFullPage) {
    return (
      <div className="watchlist-full-page">
        <div className="watchlist-grid">
          {currentCoins.map((coin) => ( 
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <div className="watchlist">
        {currentCoins.map((coin) => ( 
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
      <div className="pagination-buttons">
        {currentPage > 0 && (
          <button className="pagination-btn" onClick={prevPage}>
            ←
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <button className="pagination-btn" onClick={nextPage}>
            →
          </button>
        )}
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Coin</th>
        <th>Price</th>
        <th>24h Change</th>
        <th>Market Cap</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

function WatchButton({coin, inWatchlist, onAddToWatchlist, onRemoveFromWatchlist}) {
  return (
    <button
      className={`watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
      onClick={() => {inWatchlist ? onRemoveFromWatchlist(coin) : onAddToWatchlist(coin)}}
    >
      <img src={watchlistIcon} alt="Watchlist" className="watchlist-btn-icon" />
    </button>
  );
}

function CoinRow({coin, inWatchlist, onAddToWatchlist, onRemoveFromWatchlist}) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <tr key={coin.id}>
      <td className="coin-cell">
        <img src={coin.image} alt={coin.name} className="table-icon"/>
        <div>
          <span className="coin-name">{coin.name}</span>
          <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
        </div>
      </td>
      <td className="price-cell">${coin.current_price.toLocaleString()}</td>
      <td className={`change-cell ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="market-cap-cell">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td>
        <WatchButton
          coin={coin}
          inWatchlist={inWatchlist}
          onAddToWatchlist={onAddToWatchlist}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
        />
      </td>
    </tr>
  );
}

function CoinGrid ({coins, onAddToWatchlist, onRemoveFromWatchlist, watchedCoins, isFullPage = false}) {
  const isInWatchlist = (coinId) => {
    return watchedCoins.some(coin => coin.id === coinId);
  };

  return (
    <div className={`coin-grid ${isFullPage ? 'full-page' : ''}`}>
      <table className="coin-table">
        <TableHeader />
        <tbody>
          {coins.map((coin) => {
            const inWatchlist = isInWatchlist(coin.id);
            
            return (
              <CoinRow
                key={coin.id}
                coin={coin}
                inWatchlist={inWatchlist}
                onAddToWatchlist={onAddToWatchlist}
                onRemoveFromWatchlist={onRemoveFromWatchlist}
              />
            );    
          })}
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Load coins from JSON and map icons
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [showNotifications, setShowNotifications] = useState(false);

  const addNotification = (message) => {
    const newNotif = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleString()
    };
    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      if (updated.length > 6) {
        updated.pop(); // remove oldest (last in array)
      }
      return updated;
    });
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect (() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        
        if(!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setCoins(data);
        addNotification('Coin Data Updated');

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();

    const intervalId = setInterval(() => {
      console.log("Updating prices...");
      fetchCoins();
    }, 60000)

    return () => clearInterval(intervalId);

  }, []);
  
  const [watchedCoins, setWatchedCoins] = useState(() => {
    const saved = localStorage.getItem('watchedCoins');
    if(saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });

  useEffect (() => {
    localStorage.setItem('watchedCoins', JSON.stringify(watchedCoins));
  }, [watchedCoins]);
  
  const [searchedCoin, setSearchedCoin] = useState('');
  const filteredCoins = searchedCoin === '' ? coins : coins.filter(coin => 
    coin.name.toLowerCase().includes(searchedCoin.toLowerCase())
  );

  const filteredWatchlist = searchedCoin === '' ? watchedCoins : watchedCoins.filter(wc => 
    wc.name.toLowerCase().includes(searchedCoin.toLowerCase())
  );
  
  const addToWatchlist = (coin) => {
    if(!watchedCoins.some(c => c.id === coin.id)) {
      setWatchedCoins([...watchedCoins, coin]);
    }
  };
  
  const removeFromWatchlist = (coin) => {
    setWatchedCoins(watchedCoins.filter(c => c.id !== coin.id));
  };

  const renderPage = () => {
    if(error) {
      return (
        <div className="error-message" style={{ color: 'red', padding: '20px', textAlign: 'center', fontFamily: 'inherit'}}>
          <h3>⚠️ API Error</h3>
          <p>{error}</p>
          <p>You might have hit the rate limit. Wait 1 minute and refresh.</p>
        </div>
      );
    }

    if(loading && coins.length === 0){
      return <div style={{ padding: '20px', textAlign: 'center' }}>Loading market data...</div>;
    }

    switch(currentPage) {
      case 'dashboard':
        return (
          <>
            <WatchList coins={filteredWatchlist} />
            <div className="dashboard-content">
              <CoinGrid 
                coins={filteredCoins} 
                onAddToWatchlist={addToWatchlist} 
                onRemoveFromWatchlist={removeFromWatchlist}
                watchedCoins={watchedCoins}
              />
            </div>
          </>
        );
      case 'watchlist':
        return <WatchList coins={filteredWatchlist} isFullPage={true} />;
      case 'all-coins':
        return (
          <div className="all-coins-content">
            <CoinGrid 
              coins={filteredCoins} 
              onAddToWatchlist={addToWatchlist} 
              onRemoveFromWatchlist={removeFromWatchlist}
              watchedCoins={watchedCoins}
              isFullPage={true}
            />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="main-content">
        <Header 
          searchCoin={setSearchedCoin} 
          showNotifications={showNotifications} 
          setShowNotifications={setShowNotifications} 
          notifications={notifications} 
          onDeleteNotification={deleteNotification} 
        />
        {renderPage()}
      </div>

    </div>
  );
}

export default App