import { Store } from "@/types/store";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
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
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    // fallback: false, // NOTE: 該当しないidの場合Nextで用意されている404を表示
    fallback: true,
  };
};

const Store: React.FC<StoreProps> = (props) => {
  const { store } = props;

  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Bar Page {id}</div>
      <Link href="/">Back to home</Link>
      <Link href="/store/1111">Go to page dynamic</Link>
      <p>{store.address}</p>
      <p>{store.name}</p>
    </>
  );
};

export default Store;
