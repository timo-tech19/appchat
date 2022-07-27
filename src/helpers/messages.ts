import { collection, query, where } from "firebase/firestore";
import { auth, db } from "../api/api";

export const createMessage = async (msg: string, postAuthorId: string) => {
  // find chat were poster and responder are participants
  const chatsRef = collection(db, "chats");
  const chatQuery = query(
    chatsRef,
    where("participants", "array-contains-any", [auth.currentUser.uid])
  );

  // add message to subcollection(messages) of chat
};
