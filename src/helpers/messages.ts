import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../api/api";

export const createMessage = async (
  msg: string,
  postContent: string,
  postAuthorId: string
) => {
  // find chat were poster and responder are participants
  const chatsRef = collection(db, "chats");
  let chatRef: DocumentReference<DocumentData>;
  const chatQuery = query(
    chatsRef,
    where("participants", "array-contains-any", [
      auth.currentUser.uid,
      postAuthorId,
    ])
  );

  const getChatSnapshot = await getDocs(chatQuery);

  if (getChatSnapshot.empty) {
    // create chat is no chat
    chatRef = await addDoc(collection(db, "chats"), {
      participants: [auth.currentUser.uid, postAuthorId],
      lastMessage: msg,
      updatedAt: serverTimestamp(),
    });
  } else {
    // update last message for existing chat
    getChatSnapshot.forEach((doc) => {
      chatRef = doc.ref;
    });
    await updateDoc(chatRef, { lastMessage: msg });
  }

  // add message to subcollection(messages) of chat
  await addDoc(collection(db, "chats", chatRef.id, "messages"), {
    content: msg,
    sender: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    replyTo: postContent,
  });
};
