"use client";

import { PiGithubLogo } from "react-icons/pi";
import { CiLinkedin } from "react-icons/ci";
import Link from "next/link";

const decoration = "relative before:absolute before:bottom-0 font before:left-0 before:h-1 before:w-full before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100" as const;

const navItem = "px-3 py-1.5 rounded-lg transition-all duration-200  hover:scale-105 inline-block" as const;

export default function HeaderPage() {
  return (
    <header
      className="w-10/12 sm:w-5/12 max-w-7xl h-14 px-4 fixed top-3 left-1/2 -translate-x-1/2 z-40
                 flex justify-between items-center rounded-full
                 bg-white/20 backdrop-filter backdrop-blur-md
                 border border-white/30
                 shadow-[0_8px_32px_0_rgba(31,38,135,0.2),inset_0_1px_0_0_rgba(255,255,255,0.4)]
                 overflow-hidden transition-all duration-300"
      style={{ color: 'var(--title-color)' }}
      id="header"
    >
      <div className="w-8 sm:w-0"></div>

      <ul className="flex flex-row gap-4 sm:gap-7 items-center font-bold cursor-pointer text-xs sm:text-base">
        <li>
          <Link className={navItem} href="#sobre" style={{ color: 'var(--title-color)' }}>
            Sobre mim
          </Link>
        </li>
        <li>
          <Link className={navItem} href="#projetos" style={{ color: 'var(--title-color)' }}>
            Projetos
          </Link>
        </li>
        <li>
          <Link className={navItem} href="#tecnologias" style={{ color: 'var(--title-color)' }}>
            Tecnologias
          </Link>
        </li>
        <li>
          <Link className={navItem} href="#contato" style={{ color: 'var(--title-color)' }}>
            Contato
          </Link>
        </li>
        <li>
          <a
            href="https://github.com/R-JAC0BS"
            target="_blank"
            rel="noopener noreferrer"
            className={`${navItem} flex items-center`}
          >
            <PiGithubLogo
              size={25}
              style={{ color: 'var(--title-color)' }}
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/roberto-jacobs-a620302b3"
            target="_blank"
            rel="noopener noreferrer"
            className={`${navItem} flex items-center`}
          >
            <CiLinkedin
              size={25}
              style={{ color: 'var(--title-color)' }}
            />
          </a>
        </li>
      </ul>

      <div className="flex items-center"></div>
    </header>
  );
}
