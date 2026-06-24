"use client";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as riIcons from "react-icons/ri";
import { IconType } from "react-icons";

interface Tecnologia {
    nome: string;
    icon: string;
    iconColor?: string;
}

interface TecnologiaGroup {
    Titulo: string;
    tecnologias: Tecnologia[];
}

interface Tecnologias {
    BackEnd: TecnologiaGroup;
    FrontEnd: TecnologiaGroup;
    Devops: TecnologiaGroup;
    db: TecnologiaGroup;
}

function getIcon(name: string): IconType | null {
    return (FaIcons as Record<string, IconType>)[name]
        ?? (SiIcons as Record<string, IconType>)[name]
        ?? (riIcons as Record<string, IconType>)[name]
        ?? null;
}

export default function Tecnologias() {
    const [minhasTecnologias, setTecnologias] = useState<Tecnologias>();

    useEffect(() => {
        fetch("/data/tecnlogias.json")
            .then((res) => res.json())
            .then((data: Tecnologias) => setTecnologias(data))
            .catch((err) => console.error("Erro ao carregar JSON:", err));
    }, []);

    return (
        <div className="h-full justify-center flex flex-col items-center relative z-10" id="tecnologias">
            <h2 className="text-3xl font-bold mt-10 mb-2">Tecnologias</h2>
            <div className="flex w-full sm:w-11/12 md:w-10/12 justify-center items-start flex-wrap gap-8 px-8 py-10">
                {minhasTecnologias && Object.values(minhasTecnologias).map((group, i) => (
                    <div key={i} className="rounded-2xl border border-gray-200 p-8 flex flex-col gap-4 w-72 shadow-[0_6px_10px_rgba(0,0,0,0.1)]" style={{ backgroundColor: 'var(--container-color)' }}>
                        <h3 className="font-bold text-xl mb-2">{group.Titulo}</h3>
                        <div className="flex flex-wrap gap-3">
                            {group.tecnologias.map((tec: Tecnologia, j: number) => {
                                const Icon = getIcon(tec.icon);
                                return (
                                    <span key={j} className="rounded-xl px-4 py-2 text-base text-white border border-gray-200 transition-colors duration-300 hover:opacity-80 flex items-center gap-2"
                                        style={{ backgroundColor: 'var(--button-color)' }}>
                                        {Icon && <Icon size={18} color={tec.iconColor} />}
                                        {tec.nome}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
