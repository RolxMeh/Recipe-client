import Head from "next/head";

import Homepage from "./homepage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Recipe App</title>
        <meta name="description" content="Add and edit Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Homepage />
      </main>
    </>
  );
}
