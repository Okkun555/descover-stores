import Banner from "@/components/Banner/Banner";
import Card from "@/components/Card/Card";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import stores from "../../data/stores.json";
import { GetStaticProps } from "next";
import React from "react";

type HomeProps = {
  id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string;
}[];

export const getStaticProps: GetStaticProps = async () => {
  // NOTE: サーバーサイド側にログが測れる（クライアントサイドには出ない）
  // console.log("getStaticProps");

  return {
    props: { stores },
  };
};

export const Home: React.FC<HomeProps> = (props) => {
  console.log("props", props);
  const handleOnBannerBtnClick = () => console.log("banner btn click");

  return (
    <div className={styles.container}>
      <Head>
        <title>Bar Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />

        <div className={styles.cardLayout}>
          {stores.map((store) => (
            <Card
              key={store.id}
              name={store.name}
              imgUrl={store.imgUrl}
              href={`/store/${store.id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
