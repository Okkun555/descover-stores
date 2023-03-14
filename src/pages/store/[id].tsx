import { Store } from "@/types/store";
import styles from "@/styles/store.module.css";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import storesData from "../../../data/stores.json";
import Image from "next/image";
import cls from "classnames";

type StoreProps = {
  store: Store;
};

export const getStaticProps: GetStaticProps = (
  staticProps: GetStaticPropsContext
) => {
  const params = staticProps.params;

  return {
    props: {
      store: storesData.find((store) => store.id === Number(params!.id)),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = storesData.map((store) => {
    return {
      params: {
        id: store.id.toString(),
      },
    };
  });

  return {
    paths,
    // fallback: false, // NOTE: 該当しないidの場合Nextで用意されている404を表示
    fallback: true,
  };
};

const Store: React.FC<StoreProps> = (props) => {
  const { address, name, neighbourhood, imgUrl } = props.store;

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpvoteButton = () => console.log("test");

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="places icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="nearMe icon"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;
