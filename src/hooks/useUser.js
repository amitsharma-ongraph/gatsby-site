import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth } from "../packages/admin";
import { navigate } from "gatsby";
import { db, userCollection } from "../firestore/collection";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authState] = useAuth();

  useEffect(() => {
    (async () => {
      if (authState.userId) {
        const docRef = await doc(db, "users", authState.userId);
        const docSnapShot = await getDoc(docRef);
        if (docSnapShot.exists()) {
          setUser(docSnapShot.data());
        }
      }
    })();
  }, [authState.userId]);

  useEffect(() => {
    console.log("user--->", user);
  }, [user]);

  return {
    user,
    loading,
    async signUp(options) {
      try {
        setLoading(true);
        if (options.password !== options.confirmPassword)
          return {
            type: "error",
            title: "Passwords are not equal",
            description: "Please ensure your passwords are the same",
          };

        const { user: __user } = await createUserWithEmailAndPassword(
          auth,
          options.email,
          options.password
        );

        if (!__user.email) throw new Error();

        await setDoc(doc(userCollection, __user.uid), {
          id: __user.uid,
          email: options.email,
          recepies: [],
        });
        setLoading(false);
        return {
          type: "success",
          title: "Account created",
          description: "You have succesfully created an account",
          path: "/app/",
        };
      } catch (e) {
        console.log(e);
        setLoading(false);
        return {
          type: "error",
          title: "Error while signing up",
          description: "Please provide valid credentials",
        };
      }
    },
    async logIn(options) {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, options.email, options.password);
        setLoading(false);
        return {
          type: "success",
          title: "Logged in",
          description: "You have successfully logged in",
        };
      } catch (e) {
        setLoading(false);
        return {
          type: "error",
          title: "Invalid login credentials",
          description: "Please provide valid Login credentials",
        };
      }
    },
    async logOut() {
      try {
        setLoading(true);
        await signOut(auth);
        navigate("/");
        setLoading(false);
        return {
          type: "success",
          title: "Logged out",
          description: "You have successfully logged out",
          path: "/profile",
        };
      } catch (e) {
        setLoading(false);
        return e;
      }
    },
  };
};
