import React, { useState } from "react";
import Layout from "../components/Layout";

function Contact() {
  const [login, setLogin] = useState(false);
  setTimeout(() => {
    setLogin(true);
  }, 3000);

  if (!login) {
    return (
      <Layout>
        <div>not authorized</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div>contact</div>
    </Layout>
  );
}

export default Contact;
