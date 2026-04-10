import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const { data } = await API.get("/posts");
        const myPosts = data.filter(
          (post) => post.author?._id === user?._id
        );
        setPosts(myPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyPosts();
  }, [user?._id]);

  return (
    <div className="min-h-screen bg-[#fcfcfd] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Card */}
        <div className="bg-white rounded-[30px] shadow-lg p-8 mb-10 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-pink-500 text-white flex items-center justify-center text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#0d0c2b]">
                {user?.name}
              </h2>
              <p className="text-gray-500 mt-1">{user?.email}</p>

              <div className="flex gap-6 mt-4 justify-center md:justify-start">
                <div>
                  <p className="text-xl font-bold">{posts.length}</p>
                  <p className="text-gray-500 text-sm">Posts</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{posts.length * 3}</p>
                  <p className="text-gray-500 text-sm">Views</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <button className="bg-[#0d0c2b] text-white px-6 py-3 rounded-full hover:opacity-90 transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#0d0c2b]">
            Recent Posts
          </h2>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.slice(0, 4).map((post) => (
                <div
                  key={post._id}
                  className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-500 mt-2">
                    {post.content.substring(0, 80)}...
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;