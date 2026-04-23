import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tag", tag);

      if (image) {
        formData.append("image", image);
      }

      await API.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post Created Successfully");
      setTitle("");
      setContent("");
      setTag("");
      setImage(null);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium text-sm">
            Creator Studio
          </span>
          <h1 className="text-5xl font-extrabold text-[#0d0c2b] mt-4">
            Create a New Post
          </h1>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            Share your ideas with a clean editor experience and publish elegant
            blog content for your readers.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.6fr_0.8fr] gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-100 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  placeholder="Write an attention-grabbing title..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:border-pink-400 focus:bg-white transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:border-pink-400 focus:bg-white transition"
                />

                {image && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {image.name}
                  </p>
                )}

                {image && (
                  <div className="mt-4">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-full max-h-72 object-cover rounded-2xl border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Tag
                </label>
                <input
                  type="text"
                  placeholder="Example: Technology, Design, AI"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:border-pink-400 focus:bg-white transition"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Start writing your story..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:border-pink-400 focus:bg-white transition h-72 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <button
                className="w-full rounded-2xl bg-[#0d0c2b] text-white py-4 font-semibold text-lg hover:opacity-95 transition disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-[28px] p-6 border border-pink-100">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">
                Writing Tips
              </p>
              <ul className="mt-4 space-y-3 text-gray-700 leading-7">
                <li>• Keep the title clear and engaging.</li>
                <li>• Use short paragraphs for readability.</li>
                <li>• Add useful insights, not filler text.</li>
              </ul>
            </div>

            <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6">
              <p className="text-xl font-bold text-[#0d0c2b]">Preview Style</p>

              <div className="mt-5 rounded-3xl bg-[#f8e7ef] p-5 min-h-[220px] flex flex-col justify-end">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                  {tag || "Your Category"}
                </span>
                <h3 className="text-2xl font-bold text-gray-900">
                  {title || "Your Post Title"}
                </h3>
                <p className="text-gray-600 mt-3">
                  {content || "Your content preview will appear here..."}
                </p>
              </div>

              {image && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Image Preview
                  </p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full max-h-72 object-cover rounded-2xl border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
