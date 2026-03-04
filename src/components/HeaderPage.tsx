"use client";

import { PiGithubLogo } from "react-icons/pi";
import { CiLinkedin } from "react-icons/ci";
import Link from "next/link";


const decoration = "relative before:absolute before:bottom-0 font before:left-0 before:h-1 before:w-full before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100" as const;


export default function HeaderPage() {
  return (
    <header
      className="w-11/12 sm:w-8/12 max-w-7xl h-14 px-4 fixed top-3 left-1/2 -translate-x-1/2 z-40
                 flex justify-between items-center rounded-full shadow-sm
                 backdrop-blur-xl backdrop-saturate-200
                 border border-gray-200/20
                 bg-clip-padding overflow-hidden transition-all duration-300"
      style={{ backgroundColor: 'var(--container-color)', color: 'var(--title-color)' }}
      id="header"
    >
      {/* Logo ou espaço vazio para centralizar o menu */}
      <div className="w-8 sm:w-0"></div>
      
      <ul className="flex flex-row gap-4 sm:gap-7 items-center font-bold cursor-pointer text-xs sm:text-base">
        <li>
          <Link className={decoration} href="#sobre" style={{ color: 'var(--title-color)' }}>
            Sobre mim
          </Link>
        </li>
        <li>
          <Link className={decoration} href="#projetos" style={{ color: 'var(--title-color)' }}>
            Projetos
          </Link>
        </li>
        <li>
          <Link className={decoration} href="#tecnologias" style={{ color: 'var(--title-color)' }}>
            Tecnologias
          </Link>
        </li>
        <li>
          <Link className={decoration} href="#contato" style={{ color: 'var(--title-color)' }}>
            Contato
          </Link>
        </li>
        <li>
          <a
            href="https://github.com/R-JAC0BS"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-110"
          >
            <PiGithubLogo
              size={25}
              style={{ color: 'var(--title-color)' }}
              className="transition-colors duration-300"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/roberto-jacobs-a620302b3"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-110"
          >
            <CiLinkedin
              size={25}
              style={{ color: 'var(--title-color)' }}
              className="transition-colors duration-300"
            />
          </a>
        </li>
      </ul>

      {/* Botão de toggle do tema */}
      <div className="flex items-center">
  
      </div>
    </header>
  );
}