// firebaseUtils.js
import { app } from "./firebaseconfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

export const submitSignup = async ({ name, email, phoneNumber, password }) => {
  try {
    const usersCollection = collection(db, "users");

    const newUserDocRef = await addDoc(usersCollection, {
      email,
      name: name || null,
      phoneNumber: phoneNumber || null,
    });

    return { uid: newUserDocRef.id, email, name, phoneNumber };
  } catch (error) {
    throw new Error(error.message);
  }
};
