import { FaUserCircle as User } from "react-icons/fa";
import { BsChatDotsFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { Post } from "../../helpers/posts";

function PostItem({ post }: { post: Post }) {
  return (
    <li className='flex border-b-2 border-text py-4 border-opacity-10'>
      <User size={"2.5em"} className='mt-1 mr-4' />
      <div className='flex-1'>
        <h3 className='text-base'>{post.authorName}</h3>
        <p className='text-text text-sm'>
          {post.createdAt} {post.createdAt && "ago"}
        </p>
        <p className='text-sm mt-2'>{post.content}</p>
        <div className='mt-2 flex items-center'>
          <BsChatDotsFill color='#0080FF' className='cursor-pointer' />
          <div className='flex items-center'>
            <BsHeart className='ml-4 cursor-pointer' color='#ff4500' />
            {/* <span className='ml-2 text-sm text-[#ff4500]'>1</span> */}
          </div>
        </div>
      </div>
    </li>
  );
}

export default PostItem;
