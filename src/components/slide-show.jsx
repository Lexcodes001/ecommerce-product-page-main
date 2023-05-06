import React from 'react';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import iconNext from '../images/icon-next.svg';
import iconPrev from '../images/icon-previous.svg';
import productOne from '../images/image-product-1.jpg';
import productTwo from '../images/image-product-2.jpg';
import productThree from '../images/image-product-3.jpg';
import productFour from '../images/image-product-4.jpg';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const images = [
  productOne,
  productTwo,
  productThree,
  productFour
];

export const SlideShow = (props) => {
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setPage([props.index, 0]);
    }
  }, [props.index]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    if (page === 3 && newDirection === 1) {
      setPage([0, newDirection]);
      window.innerWidth > 768 && props.setIndex(0);
    } else if (page === 0 && newDirection === -1) {
      setPage([3, newDirection]);
      window.innerWidth > 768 && props.setIndex(3);
    } else {
      setPage([page + newDirection, newDirection]);
      window.innerWidth > 768 && props.setIndex(page + newDirection);
    }
  };

  return (
    <div className='slideshow'>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className='bg-image'
          key={page}
          style={{backgroundImage: `url(${images[imageIndex]})` }}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          //exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}></motion.div>
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        <img src={iconNext} alt="" />
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        <img src={iconPrev} alt="" />
      </div>
    </div>
  );
};
