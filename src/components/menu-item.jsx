import React from 'react';
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const text = ["Collections", "Men", "Women", "About", "Contact"];

export const MobileMenuItem = ({ i }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <a href='#'>{text[i]}</a>
    </motion.li>
  );
};

export const DesktopMenuItem = ({ i }) => {
  return (
    <motion.li
    whileHover={{ 
      //borderBottom: '3px solid var(--orange)' 
    }}
    >
      <motion.a 
      href='#'
      whileHover={{
        borderBottom: '3px solid var(--orange)', 
        transition: { duration: 3 }
      }}
      transition={{ ease: "easeOut", duration: 3 }}
      >{text[i]}</motion.a>
    </motion.li>
  );
};