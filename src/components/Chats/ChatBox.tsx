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
import { FaUserCircle as User } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { db } from "../../api/api";
import { Chat, getChat, Message, MessageUser } from "../../helpers/messages";
import useAuth from "../../helpers/useAuth";
import MessageForm from "./MessageForm";

function ChatBox() {
  const { id } = useParams();
  const { user } = useAuth();
  const [chat, setChat] = useState<Chat>(null);
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
  }, [id]);

  useEffect(() => {
    getChat(id, setChat);
  }, [id]);

  return (
    <div className='flex flex-col flex-1 ml-4 bg-[#f5f5f5] rounded-lg p-4 h-[82vh]'>
      <div className='border-b-2 border-text border-opacity-10 flex items-center pb-4'>
        <p className='ml-4 text-xl uppercase'>{otherUser?.name}</p>
      </div>
      <ul className='py-4 flex-1 flex flex-col justify-end overflow-y-scroll'>
        {messages?.map((message) => {
          return message.sender === user.uid ? (
            <li
              key={message.id}
              className='flex mb-4 text-right self-end w-2/3'
            >
              <div className='ml-2 flex flex-col items-end w-full'>
                {message.replyTo && (
                  <p className='text-text text-sm'>
                    Reply To: {message.replyTo}
                  </p>
                )}
                <p className='bg-light text-left p-2 rounded-xl rounded-br-none w-fit self-end'>
                  {message.content}
                </p>
                <p className='text-text text-xs'>{message.createdAt}</p>
              </div>
            </li>
          ) : (
            <li key={message.id} className='flex mb-4 w-2/3'>
              <User size={"2.5em"} />
              <div className='ml-2 flex flex-col flex-1'>
                {message.replyTo && (
                  <p className='text-text text-sm'>
                    Reply To: {message.replyTo}
                  </p>
                )}
                <p className='bg-primary text-light p-2 rounded-xl rounded-bl-none self-start'>
                  {message.content}
                </p>
                <p className='text-text text-xs'>{message.createdAt}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <MessageForm chatId={chat?.id} />
    </div>
  );
}

export default ChatBox;
