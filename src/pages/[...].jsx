import React from "react";
import { AuthProvider } from "../context/authContext";
import { Router } from "@gatsbyjs/reach-router";
import Profile from "../clientPages/Profile";
import Login from "../clientPages/login";
import { NotificationProvider } from "../context/notificationContext";
import Signup from "../clientPages/Signup";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router basepath="/">
          <Profile path="/profile" />
          <Login path="/login" />
          <Signup path="/signup" />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
