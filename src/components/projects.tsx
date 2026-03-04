"use client";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRightArrowLeft, FaStar } from "react-icons/fa6";
import Image from "next/image";
import Modal from '@/components/modal'
import "swiper/css";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  details: {
    tecnologias: string[];
    link: string;
  };
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openModal, setOpenModal] = useState(false);
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
    <div className="w-full px-4 py-10" id="projetos">
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
          className="!pb-8"
        >
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={selectProject?.title}
          description={selectProject?.description} tecnologias={selectProject?.details.tecnologias}
          image={selectProject?.image} link = {selectProject?.details.link}
        ></Modal>
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="transition-all duration-500 !overflow-visible">
            <div className="relative rounded-xl w-full min-h-96 mb-1 hover:transition-transform ease-in-out rounded-xl
            duration-300 cursor-grab shadow-md p-2 border border-gray-200 transition-all" style={{ backgroundColor: 'var(--container-color)' }}>
              {project.id === 1 && (
                <div 
                  className="absolute -top-3 left-4 px-3 py-1 rounded-md text-white text-xs font-bold shadow-md flex items-center gap-1"
                  style={{ backgroundColor: 'var(--button-color)', zIndex: 100 }}
                >
                  NEW
                  <FaStar size={10} />
                </div>
              )}
              <div></div> 
              <div className="w-full h-72 inset-shadow-inherit rounded-xl">
                <Image src={project.image } width={280} height={280} alt="image" className="w-full h-full bg-cover rounded-xl"></Image>
              </div>
              <div className="mt-3 font-bold m-3" style={{ color: 'var(--title-color)' }}>{project.title}</div>
              <div className="mt-3 m-3" style={{ color: 'var(--text-color)' }}>{project.description.slice(0,100)}...</div>

              <div className=" w-full justify-between flex p-3  ">
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
      </div>
    </div>
  );
}
