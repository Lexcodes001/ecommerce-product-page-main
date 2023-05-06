import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from './main';
import './styles/navbar.css';
import iconCart from '../images/icon-cart.svg';
import userAvatar from '../images/image-avatar.png';
import logo from '../images/logo.svg';
import deleteIcon from '../images/icon-delete.svg';
import { MobileMenuItem } from "./menu-item";
import { DesktopMenuItem } from "./menu-item";
import { Twirl as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  open: {
    opacity: 1, x: 0,
    transition: { type: "tween", staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    opacity: 0, x: "-100%",
    transition: { type: "tween", staggerChildren: 0.05, staggerDirection: -1 }
  },
  mobileCartOpened: {
    opacity: 1, y: 55, zIndex: 0, scale: 1,
    transition: { type: "spring", bounce: 0.5, staggerChildren: 0.07, delayChildren: 0.2 }
  },
  mobileCartClosed: {
    opacity: 0, y: "-200%", zIndex: 0, scale: 0.5,
    transition: { type: "spring", bounce: 0.5, staggerChildren: 0.05, staggerDirection: -1 }
  },
  desktopCartOpened: {
    opacity: 1, x: -257, y: 48, zIndex: 0, scale: 1,
    transition: { type: "spring", bounce: 0.5, staggerChildren: 0.07, delayChildren: 0.2 }
  },
  desktopCartClosed: {
    opacity: 0, x: -50, y: "-200%", zIndex: 0, scale: 0.5,
    transition: { type: "spring", bounce: 0.5, staggerChildren: 0.05, staggerDirection: -1 }
  },
  reveal: {
    scale: 1, opacity: 1,
    transition: {
      type: "spring", duration: 0.8
    }
  },
  hide: {
    scale: 0.8, opacity: 0,
    transition: {
      type: "spring", duration: 0.8
    }
  }
};

const OrderItem = ({item}) => {
  
  const deleteItem = useContext(MyContext);
    return(
      <motion.div 
      className="order"
      variants={variants}
      initial="hide"
      animate="reveal"
      exit="hide"
      transition={{ type: "spring", duration: 0.8 }}>
        <div className="details">
          <img className='thumbnail' src={item.imgSrc} alt="" />
          <div className="product">
            <div className="name">{item.prodName}</div>
            <div className="price">${item.price}.00 × {item.count} <span className="total">${item.price * item.count}.00</span></div>
          </div>
        </div>
        <img onClick={()=>{deleteItem(item)}} className='delete' src={deleteIcon} alt="." />
      </motion.div>
    );
}

const CartItems = (props) => {
  return(
    <motion.div 
      className="cart-container"
      variants={variants}
      initial="hide"
      animate="reveal"
      exit="hide">
      <div className="order-box">
          <AnimatePresence initial={true} mode='popLayout'>
            {props.count.map( item => (
            <OrderItem item={item} key={item.id} />
          ))}
          </AnimatePresence>
      </div>
      <button className="checkout">Checkout</button>
    </motion.div>
  );
}

export const Navbar = ({count}) => {
  const [isOpen, setOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const itemIds = [0, 1, 2, 3, 4];

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Your function that should run on width change
  const handleWidthChange = () => {
    console.log('The width has changed!');
  }

  // Call handleWidthChange whenever the width state changes
  useEffect(() => {
    handleWidthChange();
  }, [width]);

  return (
    <>
      <nav>
        <button className='bar-icon'>
          <Hamburger size={18} distance='sm' toggled={isOpen} toggle={() => setOpen(isOpen => !isOpen)}/>
        </button>
        <motion.div 
          className="top-nav"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition= {{ type: "tween", ease: "easeOut", duration: .7}}>
          <div className="left-items">
            <img src={logo} alt="" />
            <div className="desktop">
              <motion.ul>
                {itemIds.map(i => (
                  <DesktopMenuItem i={i} key={i} />
                ))}
              </motion.ul>
            </div>
          </div>

          <div className="right-items">
            <div className="cart-component">
              <img src={iconCart} className='cart-icon' alt="" onClick={() => setCartOpen(isCartOpen => !isCartOpen)}/>
              <span style={{display: count.length === 0 ? 'none' : 'flex'}} className="count">{count.length}</span>

              <motion.div
                className='cart-div'
                initial={false}
                variants={variants}
                animate={isCartOpen ? `${width < 769 ? "mobileCartOpened" : "desktopCartOpened" }` :  `${width < 769 ? "mobileCartClosed" : "desktopCartClosed" }`}>
                <div className="cart">
                  <div className="header">
                    <p>Cart</p>
                    <div 
                      onClick={() => setCartOpen(isCartOpen => !isCartOpen)}
                      className="svg">
                        <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#000" fillRule="evenodd"/></svg>
                    </div>
                  </div>
                  <div className="cart-box">
                    <AnimatePresence initial={true} mode='popLayout'>
                      {count.length === 0 ? <motion.div className="empty" variants={variants} initial="hide" animate="reveal" exit="hide"><p>Your cart is empty!</p></motion.div> : <CartItems count={count} />}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
            <img className='user-dp' src={userAvatar} alt="" />
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}>
          <motion.div
            className="mobile"
            variants={variants}
            onClick={() => setOpen(isOpen => !isOpen)}></motion.div>
          
          <motion.ul
            className='hidden'
            variants={variants} >
            {itemIds.map(i => (
              <MobileMenuItem i={i} key={i} />
            ))}
          </motion.ul>
        </motion.div>
      </nav>
    </>
  );
}