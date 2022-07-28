import { formatDistance } from "date-fns";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaPaperPlane, FaUserCircle as User } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { db } from "../../api/api";
import { Chat, getChat, Message, MessageUser } from "../../helpers/messages";
import useAuth from "../../helpers/useAuth";

function ChatBox() {
  const { id } = useParams();
  const { user } = useAuth();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState<Message[]>(null);
  const otherUser = chat?.participants?.find(
    (_user: MessageUser) => _user.id !== user.uid
  );

  const q = query(
    collection(db, "chats", id, "messages"),
    orderBy("createdAt", "asc")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: formatDistance(doc.data().createdAt?.toDate(), new Date()),
        });
      });
      //   console.log(messages);
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getChat(id, setChat);
  }, []);

  return (
    <div className='flex flex-col flex-1 ml-4 bg-[#f5f5f5] rounded-lg p-4 h-[82vh]'>
      <div className='border-b-2 border-text border-opacity-10 flex items-center pb-4'>
        <p className='ml-4 text-xl'>{otherUser?.name}</p>
      </div>
      <ul className='py-4 flex-1 flex flex-col justify-end overflow-y-scroll'>
        {messages?.map((message) => {
          return message.sender === user.uid ? (
            <li className='flex mb-4 text-right self-end w-2/3'>
              <div className='ml-2 flex flex-col items-end w-full'>
                <p className='text-text text-sm'>Reply To: {message.replyTo}</p>
                <p className='bg-light p-2 rounded-xl rounded-br-none w-fit self-end'>
                  {message.content}
                </p>
                <p className='text-text text-xs'>{message.createdAt}</p>
              </div>
            </li>
          ) : (
            <li className='flex mb-4 w-2/3'>
              <User size={"2.5em"} />
              <div className='ml-2 flex flex-col flex-1'>
                <p className='text-text text-sm'>Reply To: {message.replyTo}</p>
                <p className='bg-primary text-light p-2 rounded-xl rounded-bl-none self-start'>
                  {message.content}
                </p>
                <p className='text-text text-xs'>{message.createdAt}</p>
              </div>
            </li>
          );
        })}
      </ul>
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
  );
}

export default ChatBox;
