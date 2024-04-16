import React from "react";
import { AuthProvider } from "../context/authContext";
import { Router } from "@gatsbyjs/reach-router";
import Profile from "../clientPages/Profile";
import Login from "../clientPages/login";
import { NotificationProvider } from "../context/notificationContext";
import Signup from "../clientPages/Signup";
import Recepies from "../clientPages/Recepies";
import AddRecepie from "../clientPages/AddRecepie";
import PersonalRecepie from "../clientPages/PersonalRecepie";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router basepath="/">
          <Profile path="/profile" />
          <Login path="/login" />
          <Signup path="/signup" />
          <Recepies path="/personal-recepies" />
          <AddRecepie path="/add-recepie" />
          <PersonalRecepie path="/personal-recepie/:productId" />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
