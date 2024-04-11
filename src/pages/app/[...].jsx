import React from "react";
import Layout from "../../components/Layout";
import { Router } from "@gatsbyjs/reach-router";
import Profile from "../../components/Profile";

function App() {
  return (
    <Layout>
      <Router basepath="/app">
        <Profile path="/profile" />
      </Router>
    </Layout>
  );
}

export default App;
