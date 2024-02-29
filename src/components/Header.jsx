import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import '../styles/Header.css';

const Header = () => {
  const { cartState } = useCart();
  const cartItemCount = cartState.items.length;

  // State for menu visibility
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="Container">
      <header>
        <Link to='/'>
        <h1 className="logo">Shopper Stop</h1>
        </Link>
        {/* Menu icon */}
        <div className='menu-icon'>
        <i className='bx bx-menu ' onClick={toggleMenu}></i>
        </div>
      </header>
      <nav className={`nav-bar ${showMenu ? 'show' : ''}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
      </nav>

      <div className="user-cart">
        <i className='bx bx-user bx-md'></i>
        <Link to="/cart" className="cart-link">
          <i className='bx bx-cart bx-md'>
            {cartItemCount > 0 && (
              <span className="cart-item-count">{cartItemCount}</span>
            )}
          </i>
        </Link>
      </div>
    </div>
  );
};

export default Header;
