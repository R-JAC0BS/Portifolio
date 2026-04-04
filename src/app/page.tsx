import HeaderPage from "@/components/HeaderPage";
import Hero from "@/components/Hero";
import MarginComponent from "@/components/MarginComponent";
import Projects from "@/components/projects";
import About from "@/components/About";
import Tecnologias from "@/components/tecnlogias";
import Contato from "@/components/contato"
import BackToTopButton from "@/components/BackToTopButton";


export const metadata = {
  title: "Portifolio"
}

export default function Home() {
  return (
    <div className="flex flex-col pt-15 min-h-screen p-8 gap-16 sm:p-12 font-[family-name:var(--font-geist-sans)] transition-colors duration-300 relative overflow-x-hidden" style={{ backgroundColor: 'var(--body-color)' }}>
      {/* Dot pattern background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.12) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }} />
      {/* Spotlight faixa topo - linha */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-[2px] z-50" style={{ background: 'linear-gradient(90deg, transparent 0%, #4f46e5 20%, #7c3aed 40%, #22d3ee 55%, #10b981 70%, #6366f1 85%, transparent 100%)' }} />
      {/* Spotlight faixa topo - glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[100px] h-[30px] rounded-full blur-[35px] opacity-80 z-0" style={{ background: 'radial-gradient(ellipse at top, #6366f1 0%, #7c3aed 30%, #10b981 60%, transparent 80%)' }} />
      {/* Spotlight esquerda inferior */}
      <div className="pointer-events-none fixed bottom-[-60px] left-[-60px] w-[180px] h-[180px] rounded-full blur-[70px] opacity-60" style={{ background: 'radial-gradient(ellipse at top, #6366f1 0%, #7c3aed 30%, #10b981 60%, transparent 80%)' }} />
      {/* Spotlight direita inferior */}
      <div className="pointer-events-none fixed bottom-[-60px] right-[-60px] w-[180px] h-[180px] rounded-full blur-[70px] opacity-20" style={{ background: 'radial-gradient(ellipse at top, #6366f1 0%, #7c3aed 30%, #10b981 60%, transparent 80%)' }} />
      <HeaderPage />
      <Hero />
      <MarginComponent />
      <About />
      <Projects />
      <Tecnologias/>
      <Contato/>
      <BackToTopButton />
    </div>
  );
}