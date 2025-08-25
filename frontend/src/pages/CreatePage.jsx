import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import api from "../lib/axios.js";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error(
          "Bruh chill!!! are you destroying my server? why are you hurry",
          {
            duration: 5000,
            incon: "🚨",
          }
        );
      } else {
        toast.error("Error creating note");
      }
      console.error("Error creating note:", error);
    } finally {
    }
  };

  return (
    <div
      className="w-full h-screen bg-neutral-950 
  bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-[#33333626] backdrop-blur-md p-6 rounded-lg shadow-md">
          <Link to="/" className="flex w-auto text-white rounded-full">
            <div className="flex items-center gap-2 p-3 bg-[#4a3cec] rounded-full">
              <ArrowLeftIcon size={20}/>
              <span className="text-sm font-semibold">Back to Home</span>
            </div>
          </Link>
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-white">
              Create New Note
            </h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block font-medium mb-2 text-white">Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#71adfba4] text-black"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block font-medium mb-2 text-white">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your content here..."
                  className="w-full px-4 py-2 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#71adfba4] text-black"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4a3cec] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#4b3cec95] transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
