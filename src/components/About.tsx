"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import imagem from "../../public/images/default.jpg"

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
      {/* Imagem */}
      <div className="flex justify-center items-center">
        {about ? (
          <Image
            src={about.image || imagem}
            alt="Imagem de perfil"
            width={280}
            height={280}
            className="rounded-full w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] mr-2 shadow object-cover "
            id="ImageAbout"
          />
        ) : (
          
          <div className="relative rounded-full w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] shadow object-cover"/>
        )}
      </div>

      {/* Texto e botão */}
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
          {about?.nome ?? "Carregando..."} <br />
          <em>Desenvolvedor Full Stack</em>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-justify transition-colors duration-300">
          {about?.descricao ?? "Carregando descrição..."}
        </p>

        <div className="flex justify-center mt-6 items-start">
          <a
            className="inline-flex items-center justify-center bg-gray-800 dark:bg-slate-600 text-white
                       rounded-full hover:bg-gray-700 dark:hover:bg-slate-500 transition-colors duration-300
                       h-12 w-full sm:w-96 text-lg font-semibold
                       shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 cursor-pointer"
            rel="noopener noreferrer"
            href="./CurriCuloEstagioA.pdf" download="documento.pdf"
          >
            Baixar curriculo
          </a>
        </div>
      </div>
    </div>
  );
}
