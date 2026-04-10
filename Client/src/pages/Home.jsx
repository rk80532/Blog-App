import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);

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
                    } flex items-center justify-center p-6`}
                  >
                    <div className="w-full h-full rounded-2xl bg-white/60 backdrop-blur-sm shadow-inner flex flex-col justify-end p-5">
                      <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                        Featured Post
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
                        {post.title}
                      </h2>
                    </div>
                  </div>

                  <div className="px-4 pt-4 pb-5">
                    <p className="text-gray-600 leading-7 text-sm mb-4">
                      {post.content.length > 100
                        ? `${post.content.substring(0, 100)}...`
                        : post.content}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-800">
                        {post.author?.name || "Unknown"}
                      </span>
                      <span className="text-gray-400">Read more</span>
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