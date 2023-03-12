import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "@/components/Banner/Banner";
import Card from "@/components/Card/Card";

import { Store } from "@/types/store";
import storesData from "../../data/stores.json";

type HomeProps = {
  stores: Store[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // NOTE: サーバーサイド側にログが測れる（クライアントサイドには出ない）
  // console.log("getStaticProps");

  return {
    props: { stores: storesData },
  };
};

export const Home: React.FC<HomeProps> = (props) => {
  const { stores } = props;
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

        {props.stores.length > 0 && (
          <>
            <h2 className={styles.sectionHeading}>Favorite Store</h2>
            <div className={styles.cardLayout}>
              {props.stores.map((store) => (
                <Card
                  key={store.id}
                  name={store.name}
                  imgUrl={store.imgUrl}
                  href={`/store/${store.id}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
