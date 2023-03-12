import { Store } from "@/types/store";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import storesData from "../../../data/stores.json";

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
  const { address, name, neighbourhood } = props.store;

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">Back to home</Link>
      <Link href="/store/1111">Go to page dynamic</Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export default Store;
