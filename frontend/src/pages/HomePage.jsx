import Navbar from "../Components/Navbar/Navbar.jsx";
import RateLimiter from "../Components/RateLimiter/RateLimiter.jsx";
import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import PostCards from "../Components/PostCards/PostCards.jsx";
import PostNotFound from "../Components/PostNotFound/PostNotFound.jsx";

const HomePage = () => {
  const [isRateLimiter, setIsRateLimiter] = useState(false);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true);

      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setPost(res.data);
        setIsRateLimiter(false);
      } catch (error) {
        console.log("Error fetching posts");
        if (error.response.status === 429) {
          setIsRateLimiter(true);
        } else {
          toast.error("Error fetching posts");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen max-w-2xl mx-auto max-lg:px-[10%] max-md:px-[5%]">
      <Navbar />

      {isRateLimiter && <RateLimiter />}

      <div className=" mx-auto mt-3">
        {loading && (
          <div className="text-center text-2xl font-bold mb-4">
            Loading Posts...
          </div>
        )}

        {post.length === 0 && !loading && !isRateLimiter && <PostNotFound/>}

        {post.length > 0 && !isRateLimiter && (
          <PostCards post={post} setPost={setPost}/>
        )}
      </div>
    </div>
  );
};

export default HomePage;
