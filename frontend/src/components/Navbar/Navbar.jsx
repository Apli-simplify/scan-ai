import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                ScanAI 🔎
            </div>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link to="/" className={styles.navLink}>
                        Character Recognizer
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link to="/text-extractor" className={styles.navLink}>
                        Text Extractor
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;