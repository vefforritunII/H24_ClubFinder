"use client"; // Mark this file as a client-side component

import React from 'react';
import styles from './Sidebar.module.css'; // Import the CSS module
import Link from 'next/link';

const StaticSidebar = () => {
  return (
    <div className={styles.sidebar}>
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
        <Link href="/profile/User" className={styles.link}>Profile</Link> {/*þarf að laga þetta, mun gera á eftir @lukasGrig*/}
      </div>
    </div>
  );
};

export default StaticSidebar;
