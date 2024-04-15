import { collection, getFirestore } from "firebase/firestore";
import app from "../packages/admin";

export const db = getFirestore(app);

export const userCollection = collection(db, "users");
