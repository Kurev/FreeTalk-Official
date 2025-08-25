import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import { TrashIcon, UserStar } from "lucide-react";
import toast from "react-hot-toast";
import { capitalize } from '../lib/capitalize.js';

function AdminPage() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(""); // No localStorage persistence
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Fetch notes (only after login)
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", loginForm);
      setToken(res.data.token); // Store in state only
      toast.success("Log In Confirm");
      fetchNotes();
    } catch (err) {
      alert("Invalid credentials");
      setLoading(false);
    }
  };

  // Handle deleting a note (admin only)
  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted Successfully")
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert("Delete failed (admin only)");
    }
  };

  // Auto logout on navigating away
  useEffect(() => {
    const handleBeforeUnload = () => {
      setToken("");
      setNotes([]);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);



  // If not logged in, show login form
  if (!token) {
    return (
      <div className="max-sm:px-[5%] flex items-center justify-center min-h-screen [background:radial-gradient(165%_125%_at_50%_10%,#000_40%,#63e_100%)] shadow-2xl">
        <form
          onSubmit={handleLogin}
          className="bg-[#33333626] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-sm border-slate-300"
        >
          <div className="flex justify-center mb-3">
            <div className="rounded-full bg-[#0f0f10d1] p-4 text-[#873de8]">
              <UserStar size={40} />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-3 text-[#fff]">
            Welcome <span className="text-[#873de8]">Admin</span>
          </h2>
          <p className="text-md mb-6 text-[#a9a6a690]">
            You are about to delete unsafe or malicious data. Make sure this
            action is intended.
          </p>

          <label className="text-[#e8d9f3]">Username</label>
          <input
            type="text"
            placeholder="Secret"
            value={loginForm.username}
            onChange={(e) =>
              setLoginForm({ ...loginForm, username: e.target.value })
            }
            className="w-full text-[#6c1ce4] font-semibold px-4 py-2 mt-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <label className="text-[#e8d9f3]">Password</label>

          <input
            type="password"
            placeholder="*******"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            className="w-full px-4 font-semibold py-2 mt-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-500 transition-colors font-semibold"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  // Admin notes view
  return (
    <div className="min-h-screen bg-[#0e0e0e] p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[#9653fb] text-center">
          Admin Panel
        </h2>
        {notes.length === 0 && (
          <p className="text-center text-gray-500">No notes found.</p>
        )}
        <div className="flex flex-col gap-4 ">
          <ul className="flex justify-between text-white">
            <li className="flex-1 text-xl font-light">Name</li>
            <li className="flex-1 text-xl font-light">Title</li>
            <li className="flex-[0.8]"></li>
          </ul>
          {notes.map((note, index) => (
            <div
              key={note._id}
              className="bg-[#171924] p-3 rounded-lg shadow hover:shadow-lg transition-shadow flex justify-between items-center"
            >
              <div className="flex-1">
                <h3 className="text-base text-[#ffffffbc]">
                  {`${index + 1}. `}
                 { capitalize(`${note.title}`)}
                </h3>
              </div>
              <div className="flex-1">
                {" "}
                <p className="text-base text-[#ffffffbc]">{capitalize(`${note.content}`)}</p>
              </div>
              <div className="flex-[0.8] flex justify-end">
                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-red-500 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-colors font-medium"
                >
                  <TrashIcon/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
