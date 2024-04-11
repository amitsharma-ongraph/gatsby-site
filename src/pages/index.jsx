import * as React from "react";
import Layout from "../components/Layout";
import RecepieList from "../components/recepies/RecepieList";
import { useRecepie } from "../hooks/useRecepie";

export default function Home({ data }) {
  const { getAllRecepies } = useRecepie();

  const recepies = getAllRecepies();

  return (
    <Layout>
      <RecepieList recepies={recepies} title="All Recepies" />
    </Layout>
  );
}
