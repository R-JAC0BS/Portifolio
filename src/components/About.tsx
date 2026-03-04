"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import imagem from "../../public/images/default.jpg"
import { HiDownload } from "react-icons/hi";

type About = {
  nome: string;
  descricao: string;
  image?: string;
};

export default function About() {
  const [about, setAbout] = useState<About | null>(null);

  useEffect(() => {
    fetch("/data/sobre.json")
      .then((res) => res.json())
      .then((data: About) => {
        setAbout(data);
      })
      .catch((err) => console.error("Erro ao carregar JSON:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-10 items-center">

      <div className="flex justify-center items-center">
        {about ? (
          <Image
            src={about.image || imagem}
            alt="Imagem de perfil"
            width={280}
            height={280}
            className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] mr-2 shadow object-cover"
            style={{ 
              animation: 'profile__animate 8s ease-in-out infinite 1s',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)'
            }}
            id="ImageAbout"
          />
        ) : (
          
          <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] shadow object-cover"/>
        )}
      </div>

      {/* Texto e botão */}
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--title-color)' }}>
          {about?.nome ?? "Carregando..."} <br />
          <em>Desenvolvedor Full Stack</em>
        </h1>
        <p className="text-justify" style={{ color: 'var(--text-color)' }}>
          {about?.descricao ?? "Carregando descrição..."}
        </p>

        <div className="flex mt-6 items-start">
          <a
            className="inline-flex items-center justify-center gap-2 text-white
                       rounded-xl
                       h-11 w-48 text-base font-semibold
                       shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 cursor-pointer transition-all duration-300"
            style={{ backgroundColor: 'var(--button-color)' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            rel="noopener noreferrer"
            href="./CurriCuloEstagioA.pdf" download="documento.pdf"
          >
            Baixar currículo
            <HiDownload size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
