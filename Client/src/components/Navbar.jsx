import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinkClass = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-pink-500"
        : "text-gray-700 hover:text-pink-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0d0c2b]"
        >
          BlogApp
        </Link>

        {/* Search bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-2xl">
          <div className="w-full flex items-center bg-white border border-pink-200 rounded-full px-5 py-3 shadow-sm">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
            />
            <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center text-lg font-bold">
              ↗
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 md:gap-6">

          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>

          {!user && (
            <>
              <Link to="/register" className={navLinkClass("/register")}>
                Sign up
              </Link>

              <Link
                to="/login"
                className="bg-[#0d0c2b] text-white px-5 py-2.5 rounded-full hover:opacity-90 transition"
              >
                Log in
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/create" className={navLinkClass("/create")}>
                Create
              </Link>

              <Link to="/myposts" className={navLinkClass("/myposts")}>
                My Posts
              </Link>

              <Link to="/profile" className={navLinkClass("/profile")}>
                Profile
              </Link>

              <span className="hidden md:inline text-gray-500 font-medium">
                Hi, {user.name}
              </span>
              <Link to="/settings">Settings</Link> 
              <button
                onClick={handleLogout}
                className="bg-[#0d0c2b] text-white px-5 py-2.5 rounded-full hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;