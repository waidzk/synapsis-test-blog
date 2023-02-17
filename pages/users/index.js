import Navigation from "@/components/Navigation";
import style from "@/styles/Users.module.css";
import Head from "next/head";

export default function Users() {
  return (
    <>
      <Head>
        <title>Users | Synapsis Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        <div className={style.users}>
            <h1>users page</h1>
        </div>
      </main>
    </>
  );
}