import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const { data } = await API.get("/posts");
        const myPosts = data.filter((post) => post.author?._id === user?._id);
        setPosts(myPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyPosts();
  }, [user?._id]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      alert("Post deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Error deleting post");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium text-sm">
            Dashboard
          </span>
          <h1 className="text-5xl font-extrabold text-[#0d0c2b] mt-4">
            My Posts
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Manage, review, and remove your published blog posts.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className="bg-white rounded-[28px] border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_18px_60px_rgba(0,0,0,0.08)] transition"
              >
                <div
                  className={`h-44 ${
                    index % 3 === 0
                      ? "bg-[#f8e7ef]"
                      : index % 3 === 1
                        ? "bg-[#ece8ff]"
                        : "bg-[#e9d8c7]"
                  } p-6 flex items-end`}
                >
                  <div className="bg-white/70 backdrop-blur rounded-2xl p-4 w-full">
                    <span className="text-xs uppercase tracking-[0.18em] text-gray-500">
                      Blog Post
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-2 line-clamp-2">
                      {post.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 leading-7 min-h-[84px]">
                    {post.content.length > 110
                      ? `${post.content.substring(0, 110)}...`
                      : post.content}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-400">Your Post</span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900">No posts found</h2>
            <p className="text-gray-500 mt-3">
              Start creating and your posts will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPosts;
