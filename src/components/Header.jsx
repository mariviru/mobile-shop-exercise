import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

import { DataContext, Context } from "../utils/context";
import { useEffect } from "react";

const Header = () => {
  const { shoppingCartQuantity } = DataContext(Context);
  const localCartData = JSON.parse(localStorage.getItem('cart'));
  const [badgeNumber, setBadgeNumber] = useState(0);

  useEffect(() => {
    if (localCartData && localCartData > 0) {
      setBadgeNumber(localCartData);
    } else {
      setBadgeNumber(shoppingCartQuantity);
    };
  }, [localCartData, shoppingCartQuantity]);

  return (
    <header className="c-header">
      <Link to="/">
        <div className="c-header__logo-wrapper">
          <h1 className="c-header__logo">
            <FontAwesomeIcon icon="mobile-screen"/>
            <span className="c-header__text">mobile shop</span>
          </h1>
          <p className="c-header__slogan">Your trusted online store</p>
      </div>
      </Link>
      <button className='c-header__shopping-cart'>
        <FontAwesomeIcon className='c-header__cart-icon' icon="cart-shopping" size="2x"/>
        {badgeNumber > 0 && <span className='c-header__cart-badge'>{badgeNumber}</span>}
      </button>
    </header>
  )
};

export default Header;