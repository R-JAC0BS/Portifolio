import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiShare1 } from "react-icons/ci";
import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  tecnologias?: string[];
  description?: string;
  image?: string;
  link?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  tecnologias,
  description,
  image,
  link
}: ModalProps) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    if (isOpen) {
      setVisible(true);
      // pequeno delay para disparar a animação
      setTimeout(() => setAnimate(true), 10);
      document.body.style.overflow = "hidden";
      document.getElementById("header")?.classList.add("hidden");


    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
      document.body.style.overflow = "";
      document.getElementById("header")?.classList.remove("hidden");

    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`z-50 fixed inset-0 flex w-full h-full justify-center 
        items-center backdrop-blur-sm backdrop-brightness-50 dark:backdrop-brightness-25 bg-opacity-30 p-3 
        transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0 "

        } `}
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 flex flex-col 
    w-full max-w-5xl h-11/12 max-h-[90vh] p-5
    transform transition-all duration-300 
    overflow-y-auto border border-gray-200 dark:border-slate-600
    ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className="w-full flex justify-end items-end ">
          <button onClick={onClose}>
            <IoCloseCircleOutline
              size={30}
              className="cursor-pointer text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300"
            />
          </button>
        </div>

        <div className="w-full h-4/6 flex justify-center items-center p-5 pl-5 pr-5">
          <div className="relative w-full h-full rounded-2xl shadow-lg dark:shadow-slate-900/50">
            <Image
              src={image || "/default.jpg"}
              alt="Modal Image"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-2xl"
            />
          </div>
        </div>
        <div className="pl-5 max-h-28 bg ">
          <h1 className="text-gray-800 dark:text-gray-200 font-bold text-2xl mb-1 transition-colors duration-300">{title}</h1>
          <p className={`max-h-17 break-words overflow-auto text-gray-600 dark:text-gray-400 transition-colors duration-300`}>{description}</p>

          <ul className="flex flex-wrap gap-5 mt-2  max-w-full">
            {tecnologias?.map((tec, index) => (
              <li
                key={index}
                className="bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-gray-200 rounded-2xl shadow px-4 py-1 flex justify-center items-center text-sm transition-colors duration-300"
              >
                {tec}
              </li>
            ))}
          </ul>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex bg-gray-800 dark:bg-slate-600 text-white rounded-2xl px-5 py-3 shadow-lg mt-3 hover:bg-gray-700 dark:hover:bg-slate-500 transition-colors duration-300 w-48 justify-between"
          >
            Ver no GitHub <CiShare1 size={25} />
          </a>
        </div>
      </div>
    </div>
  );
}
