import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts");
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      alert("Post deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete post");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium text-sm">
          Creative Publishing Platform
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0d0c2b] mt-6">
          Blog App
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed">
          Discover beautiful stories, share your thoughts, and build your own
          modern blogging experience with a premium interface.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {posts.map((post, index) => (
              <div key={post._id} className="group">
                <div className="rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                  <div
                    className={`h-64 w-full ${
                      index % 4 === 0
                        ? "bg-[#e9d8c7]"
                        : index % 4 === 1
                          ? "bg-[#f4f1ea]"
                          : index % 4 === 2
                            ? "bg-[#ece8ff]"
                            : "bg-[#f8e7ef]"
                    } flex items-center justify-center p-3`}
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-full rounded-2xl bg-white/60 backdrop-blur-sm shadow-inner flex flex-col justify-end p-5">
                        <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                          Featured Post
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
                          {post.title}
                        </h2>
                      </div>
                    )}
                  </div>

                  <div className="px-4 pt-4 pb-5">
                    <p className="text-gray-600 leading-7 text-sm mb-4">
                      {post.content.length > 100
                        ? `${post.content.substring(0, 100)}...`
                        : post.content}
                    </p>

                    {user && post.author && user._id === post.author._id && (
                      <div className="flex gap-2 mb-4">
                        <button
                          onClick={() => handleEdit(post._id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(post._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-800">
                        {post.author?.name || "Unknown"}
                      </span>
                      <button
                        onClick={() => navigate(`/posts/${post._id}`)}
                        className="text-pink-500 font-medium hover:underline"
                      >
                        Read more →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 mt-3 text-sm text-gray-500">
                  <span>@{post.author?.name?.toLowerCase() || "author"}</span>
                  <span>{index + 101} views</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-3xl shadow-sm border border-gray-100 py-16">
            <h2 className="text-2xl font-bold text-gray-800">No posts yet</h2>
            <p className="text-gray-500 mt-3">
              Start by creating your first beautiful blog post.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
