import Head from "next/head";
import Script from "next/script";
import GetTimezone from "../components/GetTimezone";
import styles from "../styles/Home.module.css";

const API_KEY = process.env.GEOCODE_API_KEY;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Worldwide Timezone</title>
        <meta
          name="description"
          content="Get the timezone of all cities in the world"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>Zone_App</h1>

        <p className={styles.description}>
          Get the timezone of all cities or country around the globe
        </p>

        {/* Timezone Request form */}
        <GetTimezone />
      </div>
      <Script
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
      />
    </div>
  );
}


// put the button disable if input is empty
