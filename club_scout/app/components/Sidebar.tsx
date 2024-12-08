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
        <div className={styles.sidebar_section}>
          <div className={`${styles.sidebar_element} ${styles.sidebar_title}`}>ClubScout</div>
        </div>
        <div className={styles.sidebar_section}>
          <Link href="/" className={`${styles.sidebar_element} ${styles.sidebar_link}`}>
            <svg className={styles.sidebar_link_icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2m5-2v-5h4v5zm-5-8.59l7-7l7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z"/></svg>
            <span className={styles.sidebar_link_name}>Home</span>
          </Link>
          <Link href="/Club" className={`${styles.sidebar_element} ${styles.sidebar_link}`}>
            <svg className={styles.sidebar_link_icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 18a7.95 7.95 0 0 0 4.897-1.688l4.396 4.396l1.414-1.414l-4.396-4.396A7.95 7.95 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8s3.589 8 8 8m0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6s-6-2.691-6-6s2.691-6 6-6"/><path fill="currentColor" d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.98 3.98 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002"/></svg>
            <span className={styles.sidebar_link_name}>Discover</span>
            </Link>
          <Link href="" className={`${styles.sidebar_element} ${styles.sidebar_link}`}>
            <svg className={styles.sidebar_link_icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2M5 20v-8h14l.002 8zM5 6h14v2H5zm2-4h10v2H7z"/></svg>
            <span className={styles.sidebar_link_name}>Your clubs</span>
          </Link>
          <Link href="" className={`${styles.sidebar_element} ${styles.sidebar_link}`}>
            <svg className={styles.sidebar_link_icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6m4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4z"/><path fill="currentColor" d="M7 9h10v2H7zm0 4h7v2H7z"/></svg>
            <span className={styles.sidebar_link_name}>Messages</span>
          </Link>
          <Link href="/About" className={`${styles.sidebar_element} ${styles.sidebar_link}`}>
            <svg className={styles.sidebar_link_icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8s-3.589 8-8 8"/><path fill="currentColor" d="M11 11h2v6h-2zm0-4h2v2h-2z"/></svg>
            <span className={styles.sidebar_link_name}>About us</span>
          </Link>
        </div>
        {/* Profile Link at the bottom */}
        <div className={`${styles.sidebar_section} ${styles.sidebar_section__bottom}`}>
          <Link href="/logIn-SignUp/log_in" className={`${styles.sidebar_element} ${styles.sidebar_link}`}>
            <svg className={styles.sidebar_link_icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m0 2c3.213 0 5.982 1.908 7.254 4.648a8 8 0 0 1-.895-.498c-.409-.258-.873-.551-1.46-.772c-.669-.255-1.4-.378-2.234-.378s-1.565.123-2.234.377c-.587.223-1.051.516-1.472.781c-.378.237-.703.443-1.103.594C9.41 8.921 8.926 9 8.33 9c-.595 0-1.079-.079-1.524-.248c-.4-.151-.728-.358-1.106-.598c-.161-.101-.34-.208-.52-.313C6.587 5.542 9.113 4 12 4m0 16c-4.411 0-8-3.589-8-8c0-.81.123-1.59.348-2.327c.094.058.185.11.283.173c.411.26.876.554 1.466.776c.669.255 1.399.378 2.233.378c.833 0 1.564-.123 2.235-.377c.587-.223 1.051-.516 1.472-.781c.378-.237.703-.443 1.103-.595c.445-.168.929-.247 1.525-.247s1.08.079 1.525.248c.399.15.725.356 1.114.602c.409.258.873.551 1.46.773c.363.138.748.229 1.153.291c.049.357.083.717.083 1.086c0 4.411-3.589 8-8 8"/><circle cx="8.5" cy="13.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="13.5" r="1.5" fill="currentColor"/></svg>
            <span className={styles.sidebar_link_name}>Profile</span>
          </Link>
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
