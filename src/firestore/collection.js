import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "../packages/admin";

export const db = getFirestore(app);
export const storage = getStorage(app);

export const userCollection = collection(db, "users");
export const recepieCollection = collection(db, "recepies");
