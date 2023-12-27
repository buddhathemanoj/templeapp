// firebaseUtils.js
import { app } from "./firebaseconfig";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(app);

const submitFormData = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), formData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export { submitFormData };

const signup = async ({ name, email, phoneNumber, password }) => {
  try {
    const userDocRef = await addDoc(collection(db, "users"), {
      email,
      name: name || null,
      phoneNumber: phoneNumber || null,
      password: password || null,
    });
    console.log("User signed up successfully with ID: ", userDocRef.id);
    /* const uid = userDocRef.id;
    await setDoc(userDocRef, { uid }, { merge: true }); */
    return { uid: userDocRef.id, email, name, phoneNumber, password };
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

export { signup };

const login = async ({ email, password }) => {
  try {
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0].data();
      console.log("User logged in successfully:", userDoc);
      return userDoc;
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
};

export { login };
