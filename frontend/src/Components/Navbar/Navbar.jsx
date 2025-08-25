import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react"; // Ensure you have this icon installed

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScroll(true);
      } else {
        setScroll(false);

      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`py-4 sm:px-6 p-3 flex justify-between items-center sticky top-0 
    ${scroll ? "bg-[#17191e60] backdrop-blur-lg border-b-2 border-[#ffffff14]" : "bg-transparent"} 
    `}>
      <h1 className="lg:text-[4rem] md:text-[2.5rem] text-[1.5rem] font-serif font-bold text-white">
        FreeTalks
      </h1>
      <Link
        to="/create"
        className="flex items-center gap-1 sm:p-3 p-2 bg-[#4a3cec] text-white rounded-full hover:bg-[#a198e9] transition-colors"
      >
        <PlusIcon />
        <span className="lg:text-lg sm:text-sm text-xs">Yap now</span>
      </Link>
    </div>
  );
};

export default Navbar;
