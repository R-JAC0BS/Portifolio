"use client";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import Modal from '@/components/modal'
import "swiper/css"; // necessário para funcionar corretamente

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
    <div className="w-8/12 max-w-7xl mx-auto mt-10 inline 
     w-full  pb-5 transition-colors duration-300" id = "projetos">
      <div className = "flex align-middle justify-between" >
        <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-200 transition-colors duration-300">Projetos</h1>
        <FaArrowRightArrowLeft size = {30} className="text-gray-800 dark:text-gray-200 transition-colors duration-300"/>
      </div>
      

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={selectProject?.title}
          description={selectProject?.description} tecnologias={selectProject?.details.tecnologias}
          image={selectProject?.image} link = {selectProject?.details.link}
        ></Modal>
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="p-2">
            <div className="bg-white dark:bg-slate-700 rounded-xl w-min-h-96 mb-1 hover:transition-transform ease-in-out rounded-xl
            hover:scale-100 duration-300 cursor-grab shadow-md dark:shadow-slate-800/50 p-2 border border-gray-200 dark:border-slate-600 transition-colors duration-300">
              <div></div> 
              <div className="w-full h-72 inset-shadow-inherit rounded-xl">
                <Image src={project.image } width={280} height={280} alt="image" className="w-full h-full bg-cover rounded-xl"></Image>
              </div>
              <div className="mt-3 font-bold text-gray-800 dark:text-gray-200 m-3 transition-colors duration-300">{project.title}</div>
              <div className="mt-3 text-gray-600 dark:text-gray-400 m-3 transition-colors duration-300">{project.description.slice(0,100)}...</div>

              <div className=" w-full justify-between flex p-3  ">
                <button className=" cursor-pointer text-white bg-gray-800 dark:bg-slate-600 hover:bg-gray-700 dark:hover:bg-slate-500 rounded-full w-2/5 h-10 transition-colors duration-300"
                  onClick={() => {
                    setOpenModal(true);
                    setSelectProject(project)
                  }} >Detalhes</button>
                <button className=" cursor-pointer text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-slate-500 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-full w-2/5 h-10 transition-colors duration-300"> <a href={project.details.link} target="_blank">Github</a></button>

              </div>


            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
