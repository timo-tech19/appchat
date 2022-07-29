import ChatItem from "./ChatItem";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../api/api";
import { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { Chat } from "../../helpers/messages";
import { Outlet } from "react-router-dom";
import useAuth from "../../helpers/useAuth";

function Chats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const { user } = useAuth();

  const q = query(
    collection(db, "chats"),
    where("participantIds", "array-contains", user.uid),
    orderBy("updatedAt", "desc")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
        chats.push({
          id: doc.id,
          ...doc.data(),
          updatedAt: formatDistance(doc.data().updatedAt?.toDate(), new Date()),
        });
      });
      // console.log(chats);
      setChats(chats);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='max-w-[1280px] mx-auto px-2 flex'>
      <ul className='w-1/4'>
        {chats?.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default Chats;
