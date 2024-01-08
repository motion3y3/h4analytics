import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  updateDoc,
  DocumentData
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  updateMetadata,
  uploadBytes
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF_3VZXSslRPK-Ubph-In-YfVj41ZcoQA",
  authDomain: "church-of-god-kl.firebaseapp.com",
  projectId: "church-of-god-kl",
  storageBucket: "church-of-god-kl.appspot.com",
  messagingSenderId: "144292826716",
  appId: "1:144292826716:web:7488a12179aab337ee2099"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Initialize Firestore Database
const db = getFirestore(app);


export const getAttendance = async (): Promise<DocumentData[]> => {
  const attendanceRef = await getDocs(collection(db, "attendance"));
  const productsMap = attendanceRef.docs.map(doc => doc.data())

  return productsMap
}

export const getUsers = async (): Promise<DocumentData[]> => {
  const attendanceRef = await getDocs(collection(db, "users"));
  const productsMap = attendanceRef.docs.map(doc => doc.data())

  return productsMap
}
