import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiShare1 } from "react-icons/ci";
import Image from "next/image";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  tecnologias?: string[];
  description?: string;
  image?: string;
  link?: string;
  deploy?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  tecnologias,
  description,
  image,
  link,
  deploy
}: ModalProps) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
      document.getElementById("header")?.classList.add("hidden");
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
      document.getElementById("header")?.classList.remove("hidden");
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!visible || !mounted) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 flex w-full h-full justify-center 
        items-center backdrop-blur-sm backdrop-brightness-50 bg-opacity-30 p-3 
        transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"} `}
      style={{ zIndex: 9999, overflow: 'hidden' }}
      onClick={onClose}
    >
      <div
        className={`rounded-2xl shadow-lg flex flex-col 
    w-full max-w-5xl max-h-[90vh] p-5
    transform transition-all duration-300 
    overflow-y-auto border border-gray-200
    ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{ backgroundColor: 'var(--container-color)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Layout: Imagem à esquerda, Conteúdo à direita */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Imagem - Lado Esquerdo */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="relative w-full h-80 md:h-[500px] rounded-2xl shadow-lg overflow-hidden">
              <Image
                src={image || "/default.jpg"}
                alt="Modal Image"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* Conteúdo - Lado Direito */}
          <div className="flex-1 flex flex-col relative">
            {/* Botão de fechar no canto superior direito do texto */}
            <button onClick={onClose} className="absolute -top-2 -right-2 md:top-0 md:right-0">
              <IoCloseCircleOutline
                size={30}
                className="cursor-pointer transition-colors duration-300"
                style={{ color: 'var(--title-color)' }}
              />
            </button>

            <h1 className="font-bold text-2xl mb-3 pr-8 transition-colors duration-300" style={{ color: 'var(--title-color)' }}>{title}</h1>
            <p className="break-words mb-4 transition-colors duration-300" style={{ color: 'var(--text-color)' }}>{description}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2" style={{ color: 'var(--title-color)' }}>Tecnologias:</h3>
              <ul className="flex flex-wrap gap-2">
                {tecnologias?.map((tec, index) => (
                  <li
                    key={index}
                    className="rounded-2xl shadow px-4 py-1 flex justify-center items-center text-sm transition-colors duration-300"
                    style={{ backgroundColor: 'var(--body-color)', color: 'var(--title-color)' }}
                  >
                    {tec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 mt-auto">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white rounded-xl px-5 py-3 shadow-lg transition-all duration-300 flex-1"
                style={{ backgroundColor: 'var(--button-color)' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Ver no GitHub <CiShare1 size={25} />
              </a>

              {deploy && (
                <a
                  href={deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-white rounded-xl px-5 py-3 shadow-lg transition-all duration-300 flex-1 bg-black hover:bg-gray-800"
                >
                  Visualizar Deploy <CiShare1 size={25} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
