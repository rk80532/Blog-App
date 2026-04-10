import { useState } from "react";
import API from "../services/api";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.put("/auth/update", { name, bio });

      localStorage.setItem("user", JSON.stringify(data));

      alert("Profile updated");
    } catch (error) {
      console.log(error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow">

        <h2 className="text-3xl font-bold mb-6">Settings</h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Bio"
            className="w-full border p-3 rounded-xl"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button className="bg-black text-white px-6 py-3 rounded-xl">
            Update Profile
          </button>

        </form>
      </div>
    </div>
  );
}

export default Settings;