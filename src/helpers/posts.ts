import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../api/api";

export interface PostInput {
  content: string;
  author: Author;
}

export interface Author {
  id: string;
  name: string;
  photoURL: string;
}

export interface Post {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
}

export const createPost = async (data: PostInput) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const fetchPosts = async () => {
  try {
  } catch (e) {
    console.error("Error fetching document: ", e);
  }
};
