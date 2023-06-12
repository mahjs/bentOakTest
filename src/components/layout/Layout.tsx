import React from "react";
import classes from "./layout.module.css";
import happyWorm from "../../assets/happy_worm.png";
import icon from "../../assets/icon.png";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.innerCircle}></div>
      <div className={classes.borderedRect}></div>
      <div className={classes.borderdCircle}></div>
      <div className={classes.icon}>
        <img src={icon} alt="app icon" />
      </div>
      <div className={classes.happyWorm}>
        <img src={happyWorm} alt="A happy worm" />
      </div>
      {children}
    </div>
  );
};

export default Layout;
