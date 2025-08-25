import React from "react";
import { NotebookTabs, ThumbsUp, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../../lib/utils.js";
import api from "../../lib/axios.js";
import toast from "react-hot-toast";
import { useState } from "react";
import { capitalize } from "../../lib/capitalize.js";

const PostCards = ({ post, setPost }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete this yap")) return;

    try {
      await api.delete(`/notes/${id}`);
      setPost((prev) => prev.filter((note) => note._id !== id));
      toast.success("Your yap was deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  const handleLike = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { data } = await api.patch(`/notes/${id}/like`);
      setPost((prev) =>
        prev.map((note) =>
          note._id === id ? { ...note, likes: data.likes } : note
        )
      );
      toast.success("You liked this yap");
    } catch (error) {
      console.log("Error in handleLike", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-x-hidden pb-4">
      {post.map((note) => (
        <Link key={note._id} >
          <div className="bg-[#1e1d22] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-white text-xl font-[600] mb-2 font-mono">
              {capitalize(`${note.title}`)}
            </h2>
            <div className="h-auto w-full py-3">
              <p className="text-[#d7ecce] text-5xl font-[300] mb-4 break-words">
                {capitalize(`${note.content}`)}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-[#ffffff78]">
                {formatDate(new Date(note.createdAt))}
              </span>
              <div className="flex items-center space-x-2">
                <ThumbsUp
                  className="text-blue-500 hover:text-green-500 hover:scale-110 hover:-rotate-12 cursor-pointer"
                  onClick={(e) => handleLike(e, note._id)}
                />
                <span className="text-[#787a7b]">{note.likes}</span>
              </div>
              {/* <div className="flex items-center space-x-2">
                <NotebookTabs className="text-white" />
                <Trash2Icon className="text-gray-500 hover:text-red-500 cursor-pointer" onClick={(e) => handleDelete(e, note._id)}/>
              </div> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostCards;
