import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/axios.js";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [post, setPost] = useState({title: "", content: ""});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        const data = res.data;
        setPost(data);
      } catch (error) {
        console.log("Error fetching post:", error);
        toast.error("Failed to fetch post");
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this note?")) {
        return;
      }

      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Failed to delete note:", error);
      toast.error("Failed to delete note");
    }
  }

  const handleSave = async (e) => {
    if (!post.title.trim() || !post.content.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, post);
      toast.success("Note updated successfully"); 
      setSaving(false);
      navigate("/");
    } catch (error) {
      
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-green-900 border-dashed rounded-full animate-spin"></div>

          {/* Text */}
          <p className="mt-4 text-[#19370f] text-lg font-medium animate-pulse">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[radial-gradient(at_50%_10%,_var(--tw-gradient-stops))] from-[#ffffff] via-[#f8f8f8] to-[#80ff01]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="flex w-auto text-white rounded-full">
              <div className="flex items-center gap-2 p-4 bg-[#93cf24] rounded-full">
                <ArrowLeftIcon />
                <span className="text- sm font-semibold">Back to Home</span>
              </div>
            </Link>
            <button onClick={handleDelete} className="flex gap-3 bg-red-600 p-3 rounded-full text-white"> <Trash2Icon /> delete</button>
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              Create New Note
            </h1>
            <form onSubmit={handleSave} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block font-medium mb-2">Title</label>
                <input
                  placeholder="Enter title"
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({...post, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93cf24]"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block font-medium mb-2">Content</label>
                <textarea
                  placeholder="Write your note here..."
                  value={post.content}
                  onChange={(e) => setPost({...post, content: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#93cf24]"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#93cf24] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#7fbf1c] transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
