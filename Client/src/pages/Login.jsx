import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] px-6 py-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 bg-white rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-pink-100">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-pink-100 via-white to-purple-100 p-10">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-white shadow text-sm font-medium text-gray-700">
              Welcome back
            </span>
            <h1 className="text-5xl font-extrabold text-[#0d0c2b] mt-6 leading-tight">
              Log in and continue building your story.
            </h1>
            <p className="text-gray-600 mt-5 text-lg leading-8">
              Access your blog dashboard, publish new ideas, and manage your
              content with a clean and modern writing experience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-sm">
              <p className="text-3xl font-bold text-[#0d0c2b]">Fast</p>
              <p className="text-gray-500 mt-2">Smooth login experience.</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-sm">
              <p className="text-3xl font-bold text-[#0d0c2b]">Secure</p>
              <p className="text-gray-500 mt-2">JWT protected authentication.</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <p className="text-sm font-semibold text-pink-500 tracking-[0.2em] uppercase">
              Account Access
            </p>
            <h2 className="text-4xl font-extrabold text-[#0d0c2b] mt-3">
              Login
            </h2>
            <p className="text-gray-500 mt-3">
              Enter your credentials to continue.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-400 focus:bg-white transition"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-400 focus:bg-white transition"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#0d0c2b] text-white py-3.5 font-semibold hover:opacity-95 transition disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-6 text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-pink-500 font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;