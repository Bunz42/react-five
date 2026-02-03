import { useState } from 'react'
import './App.css'
import pfpImage from './assets/pfp.png'
import btcIcon from './assets/BTC.png'
import ltcIcon from './assets/LTC.png'
import ethIcon from './assets/ETH.png'
import solIcon from './assets/SOL.png'
import adaIcon from './assets/ADA.png'
import xrpIcon from './assets/XRP.png'
import dotIcon from './assets/DOT.png'
import dogeIcon from './assets/DOGE.png'
import avaxIcon from './assets/AVAX.png'
import maticIcon from './assets/MATIC.png'
import searchIcon from './assets/search.png'
import notificationIcon from './assets/notification.svg'

function SearchBar(coins){
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={handleChange}
      />
      <button type="submit">
        <img src={searchIcon} alt="Search" className="search-icon" />
      </button>
    </form>
  );
}

function NotificationBell(){
  return (
    <button className="notification-btn">
      <img src={notificationIcon} alt="Notification" className="notification-icon"/>
    </button>
  );
}

function AccountOptions({username, avatarURL}){
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleSignOut = () => {
    console.log('Signing out...');
    //signout logic
  }

  const handleSettings = () => {
    console.log('Opening settings...')
    //navigation to settings page
  }

  return (
    <div className="account-dropdown">
      <button className="account-button" onClick={toggleDropdown}>
        <img 
          src={avatarURL}
          alt={username} 
          className="avatar"
        />
        <span className="username">{username}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={handleSettings}>
            Settings
          </button>
          <button onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>CRYPTO-DASH</h1>

      <SearchBar />

      <div className="header-right">
        <NotificationBell />
        <AccountOptions username="Bunz" avatarURL={pfpImage}/>
      </div>
    </header>
  );
}

function CoinCard({coin}){
  const isPositive = coin.change >= 0;

  return (
    <div className="coin-card">
      <div className="coin-header">
        <div className="coin-icon-wrapper">
          <img src={coin.icon} alt={coin.name} className="coin-icon"/>
        </div>

        <div className="coin-info">
          <h3>{coin.name}</h3>
          <p className="coin-short">{coin.short}</p>
        </div>

        <span className={`trend-arrow ${isPositive ? 'up' : 'down'}`}>
          {isPositive ? '▲' : '▼'}
        </span>
      </div>

      <div className="coin-price">
        <div className="coin-price-info">
          <h2>${coin.price.toLocaleString()}</h2>
          <span className={`change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{coin.change}%
          </span>
        </div>
      </div>
    </div>
  );
}

function WatchList ({coins}) {
  return (
    <div className="watchlist">
      {coins.map((coin) => (
        <CoinCard coin={coin} />
      ))}
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
      {inWatchlist ? '- Remove from Watchlist' : '+ Add to Watchlist'}
    </button>
  );
}

function CoinRow({coin, inWatchlist, onAddToWatchlist, onRemoveFromWatchlist}) {
  const isPositive = coin.change >= 0;

  return (
    <tr key={coin.id}>
      <td className="coin-cell">
        <img src={coin.icon} alt={coin.name} className="table-icon"/>
        <div>
          <span className="coin-name">{coin.name}</span>
          <span className="coin-symbol">{coin.short}</span>
        </div>
      </td>
      <td className="price-cell">${coin.price.toLocaleString()}</td>
      <td className={`change-cell ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{coin.change}%
      </td>
      <td className="market-cap-cell">
        ${(coin.price * 1000000).toLocaleString()}
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

function CoinGrid ({coins, onAddToWatchlist, onRemoveFromWatchlist, watchedCoins}) {
  const isInWatchlist = (coinId) => {
    return watchedCoins.some(coin => coin.id === coinId);
  };

  return (
    <div className="coin-grid">
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
  //list of coins
  const [coins, setCoins] = useState([
    {id: 1, name: 'Bitcoin', short: 'BTC', price: 52291, icon: btcIcon, change: 0.25},
    {id: 2, name: 'Litecoin', short: 'LTC', price: 8291, icon: ltcIcon, change: 0.25},
    {id: 3, name: 'Ethereum', short: 'ETH', price: 28291, icon: ethIcon, change: 0.25},
    {id: 4, name: 'Solana', short: 'SOL', price: 14291, icon: solIcon, change: -0.25},
    {id: 5, name: 'Cardano', short: 'ADA', price: 1.23, icon: adaIcon, change: 1.5},
    {id: 6, name: 'Ripple', short: 'XRP', price: 0.65, icon: xrpIcon, change: -0.8},
    {id: 7, name: 'Polkadot', short: 'DOT', price: 12.45, icon: dotIcon, change: 2.3},
    {id: 8, name: 'Dogecoin', short: 'DOGE', price: 0.12, icon: dogeIcon, change: 5.2},
    {id: 9, name: 'Avalanche', short: 'AVAX', price: 35.67, icon: avaxIcon, change: -1.2},
    {id: 10, name: 'Polygon', short: 'MATIC', price: 1.89, icon: maticIcon, change: 3.1}
  ]);

  const [watchedCoins, setWatchedCoins] = useState([
    {id: 1, name: 'Bitcoin', short: 'BTC', price: 52291, icon: btcIcon, change: 0.25},
    {id: 2, name: 'Litecoin', short: 'LTC', price: 8291, icon: ltcIcon, change: 0.25},
    {id: 3, name: 'Ethereum', short: 'ETH', price: 28291, icon: ethIcon, change: 0.25},
    {id: 4, name: 'Solana', short: 'SOL', price: 14291, icon: solIcon, change: -0.25},
  ])

  const addToWatchlist = (coin) => {
    if(!watchedCoins.some(c => c.id === coin.id)) {
      setWatchedCoins([...watchedCoins, coin]);
    }
  }

  const removeFromWatchlist = (coin) => {
    setWatchedCoins(watchedCoins.filter(c => c.id !== coin.id));
  }

  return (
    <div>
      <Header />
      <WatchList coins={watchedCoins} />
      <CoinGrid 
        coins={coins} 
        onAddToWatchlist={addToWatchlist} 
        onRemoveFromWatchlist={removeFromWatchlist}
        watchedCoins={watchedCoins}
      />
    </div>
  )
}

export default App
