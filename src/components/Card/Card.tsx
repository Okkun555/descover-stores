import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  href: string;
  name: string;
  imgUrl: string;
};

const Card: React.FC<CardProps> = ({ href, name, imgUrl }) => {
  return (
    <Link href={href}>
      <h2>{name}</h2>
      <Image src={imgUrl} width={260} height={160} alt="shop image" />
    </Link>
  );
};

export default Card;
