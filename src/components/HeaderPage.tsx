"use client";

import { PiGithubLogo } from "react-icons/pi";
import { CiLinkedin } from "react-icons/ci";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const decoration = "relative before:absolute before:bottom-0 font before:left-0 before:h-1 before:w-full before:origin-left before:scale-x-0 before:bg-gray-800 dark:before:bg-gray-200 before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100";

export default function HeaderPage() {
  return (
    <header
      className="w-11/12 sm:w-8/12 max-w-7xl h-14 px-4 fixed top-3 left-1/2 -translate-x-1/2 z-40
                 flex justify-center sm:justify-end items-center rounded-full shadow-sm
                 bg-white/50 backdrop-blur-xl backdrop-saturate-200
                 border border-white/10 text-black
                 bg-clip-padding overflow-hidden"
      id="header"
    >
      <ul className="flex flex-row gap-4 sm:gap-7 items-center font-bold cursor-pointer text-xs sm:text-base">
        <li>
          <Link className={decoration} href="#sobre">
            Sobre mim
          </Link>
        </li>
        <li>
          <Link className={decoration} href="#projetos">
            Projetos
          </Link>
        </li>
        <li>
          <Link className={decoration} href="#tecnologias">
            Tecnologias
          </Link>
        </li>
        <li>
          <Link className={decoration} href="#contato">
            Contato
          </Link>
        </li>
        <li>
          <a
            href="https://github.com/R-JAC0BS"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-110 text-gray-800 dark:text-gray-200"
          >
            <PiGithubLogo size={25} />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/roberto-jacobs-a620302b3"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-110 text-gray-800 dark:text-gray-200"
          >
            <CiLinkedin size={25} />
          </a>
        </li>
      </ul>
    </header>
  );
}