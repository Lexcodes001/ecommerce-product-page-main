import React, { Component } from 'react';
import { createContext } from 'react';
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import './styles/main.css';
import { SlideShow } from './slide-show';
import { Navbar } from './navbar';
import { LightBox } from "./light-box";
import iconMinus from '../images/icon-minus.svg';
import iconPlus from '../images/icon-plus.svg';
import prodThumbnail from '../images/image-product-1-thumbnail.jpg';

export const MyContext = createContext('default');

class Main extends Component {
  state = { 
    items: [],
    prodName: 'Fall Limited Edition Sneakers',
    price: 125,
    count: 0
  }

  incrementCount = () => {
    let count = this.state.count + 1;
    this.setState({count});
  }

  decrementCount = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      this.setState({count: 0});
    } else {
      this.setState({count});
    }
  }

  addItem = () => {
    const {prodName, price, count, items} = this.state;

    if (count !== 0) {
      const newItem = {
        imgSrc: prodThumbnail,
        prodName: prodName,
        price: price,
        count: count,
        id: items.length
      }
  
      items.push(newItem);
      this.setState({items});
      this.setState({count: 0});
  
      console.log('the new item is:', newItem);
    } else {
      return;
    }
  };

  deleteItem = (item) => {
    const items = this.state.items.filter(itm => itm.id !== item.id);
    this.setState({items});
  };

    render() {
      const {prodName, price, count, items} = this.state;

      const variants = {
        rightOpen: {
          opacity: 1, x: 0,
          transition: { type: "tween", ease: "easeOut", duration: .7, staggerChildren: 0.07, delayChildren: 0.2 }
        },
        rightClosed: {
          opacity: 0, x: "10",
          transition: { type: "tween", staggerChildren: 0.05, staggerDirection: -1 }
        },
        popUpOpen: {
          opacity: 1, y: 0, scale: 1,
          transition: { type: "spring", duration: .6, bounce: 0.5, staggerChildren: 0.07, delayChildren: 0.2 }
        },
        popUpClose: {
          opacity: 0, y: "10", scale: 0.8,
          transition: { type: "spring", staggerChildren: 0.05, staggerDirection: -1 }
        }
      };
        return (
          <div className='body'>
            <MyContext.Provider value={(arg)=>{this.deleteItem(arg)}}>
              <Navbar count={items} />
            </MyContext.Provider>
            <div className="main">
              {window.innerWidth < 769 ? <SlideShow /> : <LightBox />}
              <motion.div 
              className="product-details" >
                <motion.div 
                className="company-name"
                variants={variants}
                initial="rightClosed"
                whileInView="rightOpen">SNEAKER COMPANY</motion.div>

                <motion.div 
                className="name"
                variants={variants}
                initial="rightClosed"
                whileInView="rightOpen">{prodName}</motion.div>

                <motion.p 
                className="desc"
                variants={variants}
                initial="rightClosed"
                whileInView="rightOpen">These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.</motion.p>

                <motion.div className="price-details"
                  variants={variants}
                  initial="rightClosed"
                  whileInView="rightOpen">
                  <div className="details">
                    <div className="discount-price">${price}.00</div>
                    <div className="discount">50%</div>
                  </div>
                  <div className="original-price">$250.00</div>
                </motion.div>

                <div className="actions">
                  <motion.div className="product-count"
                    variants={variants}
                    initial="popUpClose"
                    whileInView="popUpOpen">
                    <img onClick={this.decrementCount} src={iconMinus} alt="." />
                    <motion.div className="count">{count}</motion.div>
                    <img onClick={this.incrementCount} src={iconPlus} alt="." />
                  </motion.div>

                  <motion.button 
                    className='add-btn'
                    variants={variants}
                    initial="popUpClose"
                    whileInView="popUpOpen"
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={()=> {this.addItem()}}>
                    <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#fff" fillRule="nonzero"/></svg>
                    <p>Add to cart</p>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        );
    };
}

export default Main;