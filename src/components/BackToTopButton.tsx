"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-30">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-gray-800 dark:bg-slate-600 text-white rounded-full p-3 hover:bg-gray-700 dark:hover:bg-slate-500 transition-colors duration-300 shadow-lg dark:shadow-slate-900/50"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
