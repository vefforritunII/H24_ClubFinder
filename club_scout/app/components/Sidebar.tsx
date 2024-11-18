"use client"; // Mark this file as a client-side component

import React from 'react';
import styles from './Sidebar.module.css'; // Import the CSS module

const StaticSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarLinks}>
        <li><a href="#home">Home</a></li>
        <li><a href="#discover">Discover</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
  );
};

export default StaticSidebar;
