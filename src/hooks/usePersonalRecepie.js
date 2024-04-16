import { addDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { recepieCollection, storage } from "../firestore/collection";
import { useAuth } from "./useAuth";
import uniqid from "uniqid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
export const usePersonalRecepie = () => {
  const [recepies, setRecepies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authState] = useAuth();

  useEffect(() => {
    const q = query(recepieCollection, where("userId", "==", authState.userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recipesData = [];
      snapshot.forEach((doc) => {
        const recepie = doc.data();
        recipesData.push({
          ...recepie,
          productId: doc.id,
        });
      });
      setRecepies(recipesData);
    });
    return () => unsubscribe();
  }, [authState.userId, recepieCollection]);

  return {
    recepies,
    loading,
    addRecepie: async (recepie) => {
      try {
        var id;

        do {
          id = uniqid();
        } while (recepies.find((recepie) => recepie.id === id));

        const storageRef = ref(
          storage,
          `recipe_images/${id}/${recepie.image.name}`
        );

        const uploadTask = uploadBytesResumable(storageRef, recepie.image);

        const imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on("state_changed", null, reject, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(resolve);
          });
        });
        if (!imageUrl) throw new Error("Image upload failed");

        recepie = { ...recepie, userId: authState.userId, image: imageUrl, id };
        setLoading(true);
        await addDoc(recepieCollection, recepie);
        setLoading(false);
        return {
          type: "success",
          title: "recepie added succesfully",
          path: "/personal-recepies",
        };
      } catch (error) {
        setLoading(false);
        return {
          type: "error",
          title: "error while adding new recepie",
        };
      }
    },
  };
};
