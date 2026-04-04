"use client";

import Threads from "./Threads";
import SplitText from "./SplitText";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center relative z-10 -mx-8 sm:-mx-12 -mt-20">
      <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <Threads amplitude={1.5} distance={0.3} enableMouseInteraction color={[1, 1, 1]} />
      </div>

      <SplitText
        text="Bem vindo"
        tag="h1"
        className="text-6xl sm:text-8xl font-bold"
        delay={60}
        duration={1.2}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="0px"
        textAlign="center"
      />

      <div className="relative z-10 flex gap-4 mt-8">
        <a
          href="./CurriCuloEstagioA.pdf"
          download="curriculo.pdf"
          className="px-15 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:opacity-80"
          style={{ backgroundColor: 'var(--button-color)' }}
        >
          Currículo
        </a>
        <a
          href="#contato"
          className="px-15 py-3 rounded-xl font-semibold border border-gray-300 bg-white transition-all duration-300 hover:opacity-80"
          style={{ color: 'var(--button-color)' }}
        >
          Contato
        </a>
      </div>
    </section>
  );
}
