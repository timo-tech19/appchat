import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../api/api";

export interface PostInput {
  content: string;
  authorId: string;
}

export const createPost = async (data: PostInput) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    console.log(docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
