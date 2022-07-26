import { formatDistance } from "date-fns";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/api";
import { Post } from "../../helpers/posts";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

function Feed() {
  const [posts, setPosts] = useState<Post[]>(null);

  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
          createdAt: formatDistance(doc.data().createdAt?.toDate(), new Date()),
        });
      });
      setPosts(posts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className='w-3/5 mx-auto'>
      <PostForm />
      <ul>
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

export default Feed;
