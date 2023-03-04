import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Store: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>Bar Page {id}</div>
      <Link href="/">Back to home</Link>
      <Link href="/store/1111">Go to page dynamic</Link>
    </>
  );
};

export default Store;
