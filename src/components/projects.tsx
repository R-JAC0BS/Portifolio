"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRightArrowLeft, FaStar, FaChevronDown } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Modal from '@/components/modal'
import { GetSize } from "@/utils/getSize";
import "swiper/css";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  deploy?: string;
  details: {
    tecnologias: string[];
    link: string;
  };
};



export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openGridModal, setOpenGridModal] = useState(false);
  const [selectProject, setSelectProject] = useState<Project>();
 

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data: { Projects: Project[] }) => {
        setProjects(data.Projects);
      })
      .catch((err) => console.error("Erro ao carregar JSON:", err));
  }, []);

  return (
    <div className="w-full px-4 py-10 relative z-10" id="projetos"
  >
      <div className="max-w-7xl mx-auto">
        <div className="flex align-middle justify-between mb-6">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--title-color)' }}>Projetos</h1>
          <FaArrowRightArrowLeft size={30} style={{ color: 'var(--title-color)' }} />
        </div>

        <Swiper
          spaceBetween={31}
          slidesPerView={1}
          centeredSlides={false}
          grabCursor={true}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          onSlideChange={(swiper) => {
            const slides = swiper.slides;
            slides.forEach((slide, index) => {
              const slideElement = slide as HTMLElement;
              if (index === swiper.activeIndex + 1) {
                slideElement.style.transform = 'scale(1.05)';
                slideElement.style.zIndex = '10';
              } else {
                slideElement.style.transform = 'scale(1)';
                slideElement.style.zIndex = '1';
              }
            });
          }}
          onInit={(swiper) => {
            const slides = swiper.slides;
            slides.forEach((slide, index) => {
              const slideElement = slide as HTMLElement;
              if (index === swiper.activeIndex + 1) {
                slideElement.style.transform = 'scale(1.05)';
                slideElement.style.zIndex = '10';
              }
            });
          }}
          className="!pb-8 !pt-6"
        >
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={selectProject?.title}
          description={selectProject?.description} tecnologias={selectProject?.details.tecnologias}
          image={selectProject?.image} link={selectProject?.details.link} deploy={selectProject?.deploy}
        ></Modal>
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="transition-all duration-500 !overflow-visible">
           <div
            className="relative z-10 rounded-xl w-full mb-1 cursor-grab shadow-md p-2 border border-gray-200 transition-all flex flex-col h-[480px]"
        
          >
              {project.id === 1 && (
                <div 
                  className="absolute -top-3 left-4 px-3 py-1 rounded-md text-white text-xs font-bold shadow-md flex items-center gap-1"
                  style={{ backgroundColor: 'var(--button-color)', zIndex: 100 }}
                >
                  NEW
                  <FaStar size={10} />
                </div>
              )}
             <div
  className="w-full rounded-xl overflow-hidden flex-shrink-0"
  style={{
    height: GetSize.isMobile ? "200px" : "250px",
  }}
>
  <Image
    src={project.image}
    width={280}
    height={280}
    alt="image"
    className="w-full h-full object-cover rounded-xl"
  />
</div>
              <div className="mt-3 font-bold m-3" style={{ color: 'var(--title-color)' }}>{project.title}</div>
              <div className="mt-3 m-3 flex-1 overflow-hidden" style={{ color: 'var(--text-color)' }}>{project.description.slice(0,100)}...</div>

              <div className="w-full justify-between flex p-3 mt-auto">
                <button className=" cursor-pointer text-white rounded-xl w-2/5 h-10 transition-all duration-300"
                  style={{ backgroundColor: 'var(--button-color)' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  onClick={() => {
                    setOpenModal(true);
                    setSelectProject(project)
                  }} >Detalhes</button>
                <button className=" cursor-pointer border border-gray-300 hover:bg-gray-100 rounded-xl w-2/5 h-10 transition-all duration-300" style={{ color: 'var(--title-color)' }}> <a href={project.details.link} target="_blank">Github</a></button>

              </div>


            </div>
          </SwiperSlide>
        ))}
        </Swiper>

        {/* Botão Expandir */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setOpenGridModal(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer"
            style={{ 
              color: 'var(--title-color)' 
            }}
          >
            <span className="w-20 h-0.5" style={{ backgroundColor: 'var(--button-color)' }}></span>
            <span className="font-semibold">Expandir</span>
            <FaChevronDown size={16} style={{ color: 'var(--button-color)' }} />
            <span className="w-20 h-0.5" style={{ backgroundColor: 'var(--button-color)' }}></span>
          </button>
        </div>

        {/* Modal Grid de Projetos */}
        <GridProjectsModal 
          isOpen={openGridModal} 
          onClose={() => setOpenGridModal(false)}
          projects={projects}
          onSelectProject={(project) => {
            setSelectProject(project);
            setOpenModal(true);
          }}
        />
      </div>
    </div>
  );
}

// Componente Modal Grid
function GridProjectsModal({ 
  isOpen, 
  onClose, 
  projects,
  onSelectProject 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      document.body.style.overflow = "hidden";
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
      document.body.style.overflow = "";
      setSearchTerm(""); // Limpa a busca ao fechar
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!visible || !mounted) return null;

  // Filtrar projetos
  const filteredProjects = projects.filter((project) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesName = project.title.toLowerCase().includes(searchLower);
    const matchesTech = project.details.tecnologias.some((tech) =>
      tech.toLowerCase().includes(searchLower)
    );
    return matchesName || matchesTech;
  });

  const modalContent = (
    <div
      className={`fixed inset-0 flex w-full h-full justify-center 
        items-center backdrop-blur-sm backdrop-brightness-50 bg-opacity-30 p-4 
        transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"}`}
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className={`rounded-2xl shadow-2xl flex flex-col 
          w-full max-w-7xl h-[90vh] p-6
          transform transition-all duration-300 
          border border-gray-200
          ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{ backgroundColor: 'var(--container-color)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Título e Botão Fechar */}
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <h2 className="text-3xl font-bold text-center" style={{ color: 'var(--title-color)' }}>
              Todos os Projetos
            </h2>
            <div className="flex-1 flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <IoClose size={28} style={{ color: 'var(--title-color)' }} />
              </button>
            </div>
          </div>

          {/* Campo de Pesquisa */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <FiSearch 
                className="absolute left-3 top-1/2 -translate-y-1/2" 
                size={20} 
                style={{ color: 'var(--text-color)' }}
              />
              <input
                type="text"
                placeholder="Buscar por nome ou tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all w-full"
                style={{ 
                  backgroundColor: 'var(--body-color)', 
                  color: 'var(--title-color)',
                  borderColor: 'var(--button-color)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Grid com Scroll */}
        <div className="flex-1 overflow-y-auto pr-2">
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-xl" style={{ color: 'var(--text-color)' }}>
                Nenhum projeto encontrado
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-gray-200 shadow-md p-3 cursor-pointer flex flex-col h-[400px]"
                style={{ backgroundColor: 'var(--body-color)' }}
              >
                {/* Imagem */}
                <div className="w-full h-48 rounded-xl overflow-hidden mb-3 flex-shrink-0">
                  <Image
                    src={project.image}
                    width={280}
                    height={200}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Conteúdo */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--title-color)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 line-clamp-3 flex-1" style={{ color: 'var(--text-color)' }}>
                    {project.description}
                  </p>

                  {/* Botões */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      className="flex-1 text-white rounded-lg py-2 text-sm transition-all duration-300"
                      style={{ backgroundColor: 'var(--button-color)' }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      onClick={() => onSelectProject(project)}
                    >
                      Detalhes
                    </button>
                    <button
                      className="flex-1 border border-gray-300 hover:bg-gray-100 rounded-lg py-2 text-sm transition-all duration-300"
                      style={{ color: 'var(--title-color)' }}
                    >
                      <a href={project.details.link} target="_blank" rel="noopener noreferrer">
                        Github
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return null;
}
