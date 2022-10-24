import React from 'react';
import styles from '../styles/Nav.module.css';
import Link from "next/link";

const NavBar = () => {
  return (
    <div className={styles.container}>
      {/* 主页 */}
      <Link href='/'>
        <a className={styles.signature}>主页</a>
      </Link>

      <nav className={styles.nav}>
        {/* 博客 */}
        <Link href='/blog'>
          <span className={styles.icon}>
            博客
          </span>
        </Link>

        {/* 项目 */}
        <Link href='/project'>
          <span className={styles.icon}>
            项目
          </span>
        </Link>

        {/* 简历 */}
        <Link href='/resume'>
          <span className={styles.icon}>
            简历
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
