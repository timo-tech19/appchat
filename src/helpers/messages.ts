import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { AppUser } from ".";
import { auth, db } from "../api/api";

export interface Chat {
  id: string;
  lastMessage: string;
  participantIds: string[];
  participants: AppUser[];
  updatedAt: string;
}

export interface Message {
  content: string;
  createdAt: string;
  id: string;
  replyTo: string;
  sender: string;
}

export const createMessage = async (
  msg: string,
  postContent: string,
  postAuthor: AppUser
) => {
  // find chat were poster and responder are participants
  const chatsRef = collection(db, "chats");
  let chatRef: DocumentReference<DocumentData>;

  //TODO: find chat where the active user and poster are participants
  const chatQuery = query(
    chatsRef,
    where("participantIds", "array-contains", auth.currentUser.uid)
  );

  const getChatSnapshot = await getDocs(chatQuery);
  let chats = [];
  getChatSnapshot.forEach((doc) => {
    chats.push({ id: doc.id, ...doc.data() });
  });
  const chat = chats.find((chat) => {
    return chat.participantIds.includes(postAuthor.id);
  });

  if (!chat) {
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
    chatRef = doc(db, "chats", chat.id);
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

export const getChat = async (id: string, cb) => {
  const docRef = doc(db, "chats", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    cb({ id: docSnap.id, ...docSnap.data() });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const sendMessageInChat = async (msg: string, chatId: string) => {
  try {
    // update chat
    const chatRef = doc(db, "chats", chatId);
    await updateDoc(chatRef, {
      lastMessage: msg,
      updatedAt: serverTimestamp(),
    });

    // add message to subcollection(messages) of chat
    await addDoc(collection(db, "chats", chatId, "messages"), {
      content: msg,
      sender: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};
