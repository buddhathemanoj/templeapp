// firebaseUtils.js
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, auth } from "./firebaseconfig";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

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

const signupUser = async ({
  name,
  email,
  phoneNumber,
  password,
  confirmPassword,
}) => {
  try {
    if (password.length < 6) {
      throw new Error("Password should be at least 6 characters long");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const res = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(res.user);

    const userDocRef = doc(db, "users", res.user.uid);

    await setDoc(userDocRef, {
      uid: res.user.uid,
      name: name || null,
      email: res.user.email,
      phoneNumber: phoneNumber || null,
      password: password || null,
      // confirmPassword: confirmPassword || null,
    });

    return { ...res.user, name, email, phoneNumber };
  } catch (error) {
    console.log("Error signup user:", error);
    throw new Error(error.message);
  }
};

export { signupUser };

const loginUser = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    const userDocRef = doc(db, "users", res.user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const { name, email, phoneNumber } = userData;
      return { ...res.user, name, email, phoneNumber };
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    throw new Error(error.message);
  }
};

export { loginUser };
