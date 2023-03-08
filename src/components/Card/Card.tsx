import React from "react";
import Image from "next/image";
import Link from "next/link";
import cls from "classnames";
import styles from "./Card.module.css";

type CardProps = {
  href: string;
  name: string;
  imgUrl: string;
};

const Card: React.FC<CardProps> = ({ href, name, imgUrl }) => {
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={imgUrl}
            width={260}
            height={160}
            alt="shop image"
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
