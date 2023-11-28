import React from 'react';
import classes from './Header.module.css';

const Header = () => {
  return <header className={classes.header} data-testid={'header'}></header>;
};

export default Header;
