import React from "react";
import styles from "./Banner.module.css";

type BannerProps = {
  buttonText: string;
  handleOnClick: () => void;
};

const Banner: React.FC<BannerProps> = ({ buttonText, handleOnClick }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Bar</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local Bar!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
