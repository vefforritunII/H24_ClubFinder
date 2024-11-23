"use client"; // Mark this file as a client-side component

import React, { useState } from 'react';
import styles from './Sidebar.module.css'; // Import the CSS module
import Link from 'next/link';

const StaticSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.sidebarLinks}>
          <li><h1 className={styles.h1}>Clubscout</h1></li>
          <li><Link href="/" className={styles.link}>Home</Link></li>
          <li><Link href="/Club" className={styles.link}>Discover</Link></li>
          <li><Link href="" className={styles.link}>Your Clubs</Link></li>
          <li><Link href="" className={styles.link}>Messages</Link></li>
          <li><Link href="/About" className={styles.link}>About</Link></li>
        </ul>
        {/* Profile Link at the bottom */}
        <div className={styles.profileContainer}>
          <Link href="/logIn-SignUp/log_in" className={styles.link}>Profile</Link>
        </div>
      </div>

      {/* Hamburger Menu Icon */}
      <div
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={toggleSidebar}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default StaticSidebar;
