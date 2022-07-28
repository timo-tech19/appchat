import ChatItem from "./ChatItem";
import { FaPaperPlane, FaUserCircle as User } from "react-icons/fa";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../api/api";
import { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { Chat } from "../../helpers/messages";

function Chats() {
  const [chats, setChats] = useState<Chat[]>([]);

  const q = query(collection(db, "chats"), orderBy("updatedAt", "desc"));

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
      <div className='flex flex-col flex-1 ml-4 bg-[#f5f5f5] rounded-lg p-4 h-[82vh]'>
        <div className='border-b-2 border-text border-opacity-10 flex items-center pb-4'>
          <User size={"2.5em"} />
          <p className='ml-4 text-xl'>John Doe</p>
        </div>
        <ul className='py-4 flex-1'></ul>
        <form className='flex items-center pt-4 border-t-2 border-text border-opacity-10'>
          <textarea
            className='p-2 flex-1 bg-transparent placeholder:text-sm placeholder:italic text-base'
            name='message'
            placeholder='Start typing...'
          ></textarea>
          <button
            type='submit'
            className='p-3 rounded-full bg-primary text-light ml-4'
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chats;
