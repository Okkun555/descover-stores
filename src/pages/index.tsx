import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "@/components/Banner/Banner";
import Card from "@/components/Card/Card";

import { Store } from "@/types/store";
import { fetchStores } from "../lib/stores";
import useTrackLocation from "@/hooks/use-track-location";

type HomeProps = {
  stores: Store[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // NOTE: サーバーサイド側にログが測れる（クライアントサイドには出ない）
  // console.log("getStaticProps");

  const stores = await fetchStores();

  return {
    props: { stores },
  };
};

export const Home: React.FC<HomeProps> = (props) => {
  const { handleTrackLocation, latLong, locationErrorMessage } =
    useTrackLocation();

  console.log({ latLong, locationErrorMessage });

  const handleOnBannerBtnClick = () => {
    console.log("banner btn click");
    handleTrackLocation();
  };

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
        {locationErrorMessage && <p>問題：{locationErrorMessage}</p>}

        {props.stores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionHeading}>Favorite Store</h2>
            <div className={styles.cardLayout}>
              {props.stores.map((store) => (
                <Card
                  key={store.id}
                  name={store.name}
                  imgUrl={
                    store.imgUrl ||
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                  href={`/store/${store.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
