"use client"; // Mark this file as a client-side component

import React from 'react';
import styles from './Sidebar.module.css'; // Import the CSS module
import Link from 'next/link';

const StaticSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarLinks}>
        <li><Link href="/" className={styles.link}>Home</Link></li>
        <li><Link href="/Club" className={styles.link}>Club</Link></li>
        <li><Link href="/About" className={styles.link}>About</Link></li>
      </ul>
    </div>
  );
};

export default StaticSidebar;
