import { FaUserCircle as User } from "react-icons/fa";
import { BsChatDotsFill, BsHeart } from "react-icons/bs";
import { Post } from "../../helpers/posts";
import { FormEvent, useState } from "react";
import { createMessage } from "../../helpers/messages";
import useAuth from "../../helpers/useAuth";

function PostItem({ post }: { post: Post }) {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    setLoading(true);
    await createMessage(message, post.content, post.author);
    setMessage("");
    setShowMessageForm(false);
    setLoading(false);
  };

  return (
    <li className='flex border-b-2 border-text py-4 border-opacity-10'>
      <User size={"2.5em"} className='mt-1 mr-4' />
      <div className='flex-1'>
        <h3 className='text-base'>{post.author.name}</h3>
        <p className='text-text text-sm'>
          {post.createdAt} {post.createdAt && "ago"}
        </p>
        <p className='text-sm mt-2'>{post.content}</p>
        {user.uid !== post.author.id ? (
          <div className='mt-2 flex items-center'>
            <BsChatDotsFill
              color='#0080FF'
              className='cursor-pointer'
              onClick={() => setShowMessageForm((curState) => !curState)}
            />
            {/* <div className='flex items-center'>
              <BsHeart className='ml-4 cursor-pointer' color='#ff4500' />
              <span className='ml-2 text-sm text-[#ff4500]'>1</span>
            </div> */}
          </div>
        ) : null}
        <form
          className={`flex w-full mt-4 ${showMessageForm || "hidden"}`}
          onSubmit={sendMessage}
        >
          <input
            name='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='flex-1 rounded-full bg-[#f5f5f5] py-2 px-4 text-sm'
          />
          <button
            type='submit'
            className='p-2 bg-primary rounded-lg text-light ml-4'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </li>
  );
}

export default PostItem;
