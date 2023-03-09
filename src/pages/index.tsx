import Banner from "@/components/Banner/Banner";
import Card from "@/components/Card/Card";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
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
          <Card
            href="/static/store/bar-doz"
            imgUrl="/hero-image.png"
            name="Bar Doz"
          />
          <Card
            href="/static/store/bar-doz"
            imgUrl="/hero-image.png"
            name="Bar Doz"
          />
        </div>
      </main>
    </div>
  );
}
