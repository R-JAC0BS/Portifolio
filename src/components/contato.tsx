"use client";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import routes from "@/assets/keyValue";

import { FaCheck, FaEnvelope } from "react-icons/fa";
import { BsLinkedin, BsWhatsapp } from "react-icons/bs";
import ArticleCard from "./Article";


export default function Contato() {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [send, setSend] = useState (false)
  

  const sendEmail = (e: React.FormEvent) => {
   
    e.preventDefault();
    if (!form.current) return;

   

    emailjs
      .sendForm(
        `${routes.servico}`,      
        `${routes.template}`,     
        form.current,
        `${routes.key}`          
      )
      .then(
        () => {
          setSent(true);
          setSend(true)
          setTimeout (() => {
            setSend(false)
          },2000)
          form.current?.reset();

        },
        (error) => {
          console.error("Erro ao enviar:", error.text);
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 mt-2 h-1/3 resize-none transition-colors duration-300" id="contato">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Entre em contato</h2>
      <div className="flex flex-col md:flex-row w-full justify-center items-center md:items-start gap-16">
     
        <div className="flex flex-col gap-4 w-full md:w-1/3 pt-8">
         <ArticleCard href="rjacobsdev@gmail.com"  placeHolder = "rjacobsdev@gmail.com" rede="email" icon = { <FaEnvelope className="text-2xl" />} />
        <ArticleCard href="https://www.linkedin.com/in/roberto-jacobs-dev" placeHolder="+5499642526" rede=" Whatsapp" icon = { <BsWhatsapp className="text-2xl" />} />
      
        <ArticleCard href="https://www.linkedin.com/in/roberto-jacobs-dev" rede="LinkedIn" icon = { <BsLinkedin className="text-2xl" />} />
             
    
        </div>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white dark:bg-slate-700 p-6 rounded-3xl shadow-lg w-full md:w-5/12 items-center justify-center resize-none mt-10 transition-colors duration-300 border border-gray-200 dark:border-slate-600"
        >
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            required
            className="w-full mb-4 p-3 border border-gray-300 dark:border-slate-500 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Seu email"
            required
            className="w-full mb-4 p-3 border border-gray-300 dark:border-slate-500 rounded bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
          />
          <textarea
            name="message"
            placeholder="Sua mensagem"
            required
            rows={6}
            className="w-full mb-4 p-3 border border-gray-300 dark:border-slate-500 rounded resize-none bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
          ></textarea>
          <button
            type="submit"
            className="w-4/12 bg-gray-800 dark:bg-slate-600 text-white py-3 hover:bg-gray-700 dark:hover:bg-slate-500 transition-all duration-300 cursor-pointer rounded-3xl mx-auto block justify-center items-center flex"
          >
            {!send ? "Enviar mensagem " : <FaCheck size={24} />}
          </button>
          {sent && <p className="text-green-600 dark:text-green-400 mt-4"></p>}
        </form>
      </div>
    </div>
  );
}
