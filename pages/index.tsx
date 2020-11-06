import Head from 'next/head';
import Navbar from '../components/Navbar';
import { table, getMinifyRecords } from './api/utils/airtable';
import styles from '../styles/Home.module.css';

export default function Home({ todos }) {
  console.log({ todos });
  return (
    <div>
      <Head>
        <title>Autenticated TodoApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-xl">
        <Navbar />
        <h1>Todo App</h1>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const records = await table.select({}).firstPage();
  const minifiedRecords = getMinifyRecords(records);
  return {
    props: {
      todos: minifiedRecords,
    },
  };
}
