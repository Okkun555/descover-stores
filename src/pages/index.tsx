import React, { useEffect, useState } from "react";
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

  const [stores, setStores] = useState<Store[]>([]);
  const [storesError, setStoresError] = useState("");

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function setStoresByLocation() {
      if (latLong) {
        try {
          const fetchedStores = await fetchStores(latLong, 30);
          setStores(fetchedStores);

          console.log(fetchedStores);
        } catch (error: unknown) {
          // FIXME:一旦簡易的にError型を扱う
          if (error instanceof Error) {
            setStoresError(error.message);
          }
        }
      }
    }

    setStoresByLocation();
  }, [latLong]);

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
        {storesError && <p>問題：{storesError}</p>}

        {stores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionHeading}>Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {stores.map((store) => (
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

        {props.stores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionHeading}>Toronto stores</h2>
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
