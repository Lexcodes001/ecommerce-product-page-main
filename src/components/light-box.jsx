import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { SlideShow } from './slide-show';
import productOne from '../images/image-product-1.jpg';
import prodThumbnailOne from '../images/image-product-1-thumbnail.jpg';
import prodThumbnailTwo from '../images/image-product-2-thumbnail.jpg';
import prodThumbnailThree from '../images/image-product-3-thumbnail.jpg';
import prodThumbnailFour from '../images/image-product-4-thumbnail.jpg';

const variants = {
  open: {
    opacity: 1, display: 'flex',
    transition: { duration: 1, type: "tween", staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    opacity: 0, display: 'none',
    transition: { duration: 1, type: "spring", staggerChildren: 0.05, staggerDirection: -1 }
  }
}

export const LightBox = () => {
  const [[isOpen, index], setOpen] = useState([false, null]);

  const indexImg = (ind, isInnerImg) => {
    if (!isInnerImg) {
      if (isOpen) {
        setOpen([false, null]);
      } else {
        setOpen([true, ind]);
      }
    } else {
      setOpen([true, ind]);
    }
  }

  const handleSetIndex = (newValue) => {
    setOpen([true, newValue]);
  };

  return(
    <>
      <div className="static">
        <img className='static-prod' src={productOne} alt="." />
        <div className="thumbnails">
          <img 
          className={`${index === 0 ? "active" : ""}`} 
          onClick={() => indexImg(0, false)} src={prodThumbnailOne} alt="." />
          <img 
          className={`${index === 1 ? "active" : ""}`} 
          onClick={() => indexImg(1, false)} src={prodThumbnailTwo} alt="." />
          <img 
          className={`${index === 2 ? "active" : ""}`} 
          onClick={() => indexImg(2, false)} src={prodThumbnailThree} alt="." />
          <img 
          className={`${index === 3 ? "active" : ""}`} 
          onClick={() => indexImg(3, false)} src={prodThumbnailFour} alt="." />
        </div>
      </div>

      <motion.div 
        className="lightbox-container"
        initial={false}
        variants={variants}
        animate={isOpen ? "open" : "closed"}>
        
        <motion.div 
          className="lightbox-bg"
          onClick={() => indexImg(0)}></motion.div>

        <motion.div 
          className="lightbox">
            <motion.div 
              className="close"
              onClick={() => indexImg(0)}>
              <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#fff" fillRule="evenodd"/></svg>
            </motion.div>

            <SlideShow index={index} setIndex={handleSetIndex}/>

            <motion.div 
              className="thumbnails">
              <div
                className={`${index === 0 ? "white-bg active" : "white-bg"}`}>
                <img 
                  className={`${index === 0 ? "active" : ""}`} 
                  src={prodThumbnailOne} alt="." 
                  onClick={() => indexImg(0, true)}/>
              </div>

              <div
                className={`${index === 1 ? "white-bg active" : "white-bg"}`}>
                <img 
                  className={`${index === 1 ? "active" : ""}`} 
                  src={prodThumbnailTwo} alt="." 
                  onClick={() => indexImg(1, true)}/>
              </div>

              <div
                className={`${index === 2 ? "white-bg active" : "white-bg"}`}>
                <img 
                  className={`${index === 2 ? "active" : ""}`} 
                  src={prodThumbnailThree} alt="." 
                  onClick={() => indexImg(2, true)}/>
              </div>

              <div
                className={`${index === 3 ? "white-bg active" : "white-bg"}`}>
                <img 
                  className={`${index === 3 ? "active" : ""}`} 
                  src={prodThumbnailFour} alt="." 
                  onClick={() => indexImg(3, true)}/>
              </div>

            </motion.div>
          </motion.div>
      </motion.div>
    </>
  );
}