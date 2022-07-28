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

export interface Chat {
  id: string;
  lastMessage: string;
  participantIds: string[];
  participants: MessageUser[];
  updatedAt: string;
}

export interface MessageUser {
  id: string;
  name: string;
  photoUrl: string;
}

export const createMessage = async (
  msg: string,
  postContent: string,
  postAuthor: MessageUser
) => {
  // find chat were poster and responder are participants
  const chatsRef = collection(db, "chats");
  let chatRef: DocumentReference<DocumentData>;
  const chatQuery = query(
    chatsRef,
    where("participantIds", "array-contains-any", [
      auth.currentUser.uid,
      postAuthor.id,
    ])
  );

  const getChatSnapshot = await getDocs(chatQuery);

  if (getChatSnapshot.empty) {
    // create chat is no chat
    chatRef = await addDoc(collection(db, "chats"), {
      participantIds: [auth.currentUser.uid, postAuthor.id],
      participants: [
        {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          photoUrl: auth.currentUser.photoURL,
        },
        postAuthor,
      ],
      lastMessage: msg,
      updatedAt: serverTimestamp(),
    });
  } else {
    // update last message for existing chat
    getChatSnapshot.forEach((doc) => {
      chatRef = doc.ref;
    });
    await updateDoc(chatRef, {
      lastMessage: msg,
      updatedAt: serverTimestamp(),
    });
  }

  // add message to subcollection(messages) of chat
  await addDoc(collection(db, "chats", chatRef.id, "messages"), {
    content: msg,
    sender: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    replyTo: postContent,
  });
};
