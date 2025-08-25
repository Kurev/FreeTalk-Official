import React from "react";
import { FileX } from "lucide-react"; // npm install lucide-react

const PostNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-greem px-4">
      <FileX className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-3xl font-bold mb-2">No yap yet</h1>
      <p className="text-gray-400 text-center max-w-md mb-6">
        Got a story from today? Or maybe a rant you’ve been holding in? Let it out here!
      </p>
    </div>
  );
};

export default PostNotFound;
