import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postRes = await API.get(`/posts/${id}`);
        setPost(postRes.data);

        const user = JSON.parse(localStorage.getItem("user"));
        setLikesCount(postRes.data.likes?.length || 0);

        if (user) {
          const isLiked = postRes.data.likes?.includes(user._id);
          setLiked(isLiked);
        }

        const commentsRes = await API.get(`/comments/${id}`);
        setComments(commentsRes.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      const { data } = await API.post(`/comments/${id}`, {
        text: newComment,
      });

      setComments([data, ...comments]);
      setNewComment("");
    } catch (error) {
      console.log(error);
      alert("Failed to add comment");
    }
  };
  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Delete this comment?");
    if (!confirmDelete) return;
    console.log("frontend comment id:", commentId);
    try {
      await API.delete(`/comments/${commentId}`);

      // remove from UI instantly
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );
    } catch (error) {
      console.log(
        "Delete comment error:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Failed to delete comment");
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await API.put(`/posts/${id}/like`);
      setLikesCount(data.likesCount);
      setLiked(!liked);
    } catch (error) {
      console.log(error);
      alert("Failed to like post");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
        <p className="text-lg text-gray-600">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
        <p className="text-lg text-gray-600">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
        >
          Back
        </button>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium text-sm">
            Full Story
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0d0c2b] mt-6 leading-tight">
            {post.title}
          </h1>

          <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-800">
              {post.author?.name || "Unknown Author"}
            </span>
            <span>•</span>
            <span>{post.author?.email || "No email"}</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleLike}
              className="text-2xl transition transform hover:scale-110"
            >
              {liked ? "❤️" : "🤍"}
            </button>

            <span className="text-gray-600 text-sm">{likesCount} likes</span>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            {post.image && (
              <div className="mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full max-h-[500px] object-cover rounded-2xl border border-gray-200"
                />
              </div>
            )}
            <p className="text-gray-700 leading-8 text-lg whitespace-pre-line">
              {post.content}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>

          <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-2"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-xl"
            >
              Post
            </button>
          </form>

          {comments.map((comment) => {
            const user = JSON.parse(localStorage.getItem("user"));

            const isOwner = comment.user?._id === user?._id;

            return (
              <div
                key={comment._id}
                className="bg-white border rounded-xl p-4 mb-3"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">
                    {comment.user?.name || "User"}
                  </p>

                  {isOwner && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <p className="text-gray-600 mt-1">{comment.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
