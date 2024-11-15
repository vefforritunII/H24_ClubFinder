import React from 'react';
import styles from './Header.module.css'; // Import the CSS module

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.menuCircle}></div>
      </div>
      <div className={styles.center}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search..."
        />
      </div>
      <div className={styles.right}>
        <div className={styles.profileCircle}></div>
      </div>
    </header>
  );
};

export default Header;
