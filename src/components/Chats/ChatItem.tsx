import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { FaUserCircle as User } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { db } from "../../api/api";
import { Chat } from "../../helpers/messages";
import useAuth from "../../helpers/useAuth";

function ChatItem({ chat }: { chat: Chat }) {
  const { user } = useAuth();

  const otherUser = chat.participants.find((_user) => _user.id !== user.uid);

  return (
    <li>
      <NavLink
        to={`/chat/${chat.id}`}
        className='flex bg-[#f5f5f5] rounded-lg items-center p-2 mb-2 hover:bg-[#f1f1f1]'
      >
        <User size={"2.5em"} />
        <div className='ml-2 flex-1 '>
          <p className='flex justify-between items-center'>
            <span className='font-semibold text-base'>{otherUser.name}</span>
            <span className='text-text text-xs'>{chat.updatedAt}</span>
          </p>
          <p className='text-sm text-text'>{chat.lastMessage}</p>
        </div>
      </NavLink>
    </li>
  );
}

export default ChatItem;
