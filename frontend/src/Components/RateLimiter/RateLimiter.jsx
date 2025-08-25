import React from "react";
import { CircleAlert } from "lucide-react";

const RateLimiter = () => {
  return (
    <div className="w-full h-16 flex items-center justify-center mt-9">
      <div className="w-full max-w-3xl p-4 bg-red-100  rounded-lg shadow-md flex">
        <div className="flex items-center justify-center mr-4">
          <CircleAlert className="w-12 h-24" color="#E14434" />
        </div>
        <div>
          <h1 className="text-red-800 text-lg font-semibold">
            Rate Limit Reach
          </h1>
          <p className="text-red-400">
            Too many requests are going to kill my yapping website, come on, be
            patient — give it a chance to catch its breath before trying again!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimiter;
