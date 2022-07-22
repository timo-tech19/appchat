import { FormEvent, useState } from "react";
import { FaUserCircle as User } from "react-icons/fa";

function PostForm() {
  const [post, setPost] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(post);
  };

  return (
    <>
      <div className='shadow-md rounded-lg p-5'>
        <h2 className='text-lg'>Break the ice!❄️</h2>
        <div className='flex items-start'>
          <User size={"2.5em"} className='mt-5' />
          <form className='flex flex-col flex-1 mt-2' onSubmit={handleSubmit}>
            <textarea
              name='post'
              placeholder='What do you wanna talk about?'
              className='bg-[#f5f5f5] ml-4 py-2 px-4 rounded-lg'
              value={post}
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
            <button
              type='submit'
              className='bg-primary px-6 py-2 rounded-md text-light mt-2 self-end'
            >
              Post
            </button>
          </form>
        </div>
      </div>
      <hr className='border-2 border-[#f5f5f5] my-5' />
    </>
  );
}

export default PostForm;
