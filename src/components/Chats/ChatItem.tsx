import { FaUserCircle as User } from "react-icons/fa";

function ChatItem() {
  return (
    <li className='flex bg-[#f5f5f5] rounded-lg items-center p-2 mb-2'>
      <User size={"2.5em"} />
      <div className='ml-2 flex-1 '>
        <p className='flex justify-between items-center'>
          <span className='font-semibold text-base'>John Doe</span>
          <span className='text-text text-xs'>time</span>
        </p>
        <p className='text-sm text-text'>Lorem ipsum dolor sit...</p>
      </div>
    </li>
  );
}

export default ChatItem;
