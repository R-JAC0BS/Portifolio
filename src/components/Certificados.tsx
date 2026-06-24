"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";

type Certificado = {
  id: number;
  titulo: string;
  emissor: string;
  dataCompletado: string;
  logo: string;
  imagemCertificado: string;
  descricao: string;
  linkVerificacao: string;
};

export default function Certificados() {
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [openAllModal, setOpenAllModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedCertificado, setSelectedCertificado] = useState<Certificado | null>(null);

  useEffect(() => {
    fetch("/data/certificados.json")
      .then((res) => res.json())
      .then((data: { Certificados: Certificado[] }) => {
        setCertificados(data.Certificados);
      })
      .catch((err) => console.error("Erro ao carregar certificados:", err));
  }, []);

  // Pegar apenas os primeiros 4 certificados
  const displayedCertificados = certificados.slice(0, 4);

  return (
    <div className="w-full px-4 py-16 relative z-10" id="certificados">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10" style={{ color: 'var(--title-color)' }}>
          Certificados
        </h2>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {displayedCertificados.map((cert) => (
            <CertificadoCard
              key={cert.id}
              certificado={cert}
              onVerify={() => {
                setSelectedCertificado(cert);
                setOpenDetailModal(true);
              }}
            />
          ))}
        </div>

        {/* Botão Ver Mais */}
        {certificados.length > 4 && (
          <div className="flex justify-center">
            <button
              onClick={() => setOpenAllModal(true)}
              className="px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:opacity-80"
              style={{ backgroundColor: 'var(--button-color)' }}
            >
              Ver Mais Certificados
            </button>
          </div>
        )}

        {/* Modal - Todos os Certificados */}
        <AllCertificadosModal
          isOpen={openAllModal}
          onClose={() => setOpenAllModal(false)}
          certificados={certificados}
          onVerify={(cert) => {
            setSelectedCertificado(cert);
            setOpenDetailModal(true);
          }}
        />

        {/* Modal - Detalhes do Certificado */}
        <CertificadoDetailModal
          isOpen={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
          certificado={selectedCertificado}
        />
      </div>
    </div>
  );
}

// Card de Certificado
function CertificadoCard({
  certificado,
  onVerify,
}: {
  certificado: Certificado;
  onVerify: () => void;
}) {
  return (
    <div
      className="flex gap-4 p-5 rounded-xl border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl"
      style={{ backgroundColor: 'var(--container-color)' }}
    >
      {/* Logo */}
      <div className="flex-shrink-0 w-20 h-20 relative">
        <Image
          src={certificado.logo}
          alt={certificado.emissor}
          fill
          className="object-contain"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--title-color)' }}>
            {certificado.titulo}
          </h3>
          <p className="text-sm mb-1" style={{ color: 'var(--text-color)' }}>
            {certificado.emissor}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-color)', opacity: 0.7 }}>
            Completed: {certificado.dataCompletado}
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-3">
          <button
            className="flex-1 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300"
            style={{ backgroundColor: 'var(--button-color)' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View Certificate
          </button>
          <button
            onClick={onVerify}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-100 transition-all duration-300"
            style={{ color: 'var(--title-color)' }}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal - Todos os Certificados
function AllCertificadosModal({
  isOpen,
  onClose,
  certificados,
  onVerify,
}: {
  isOpen: boolean;
  onClose: () => void;
  certificados: Certificado[];
  onVerify: (cert: Certificado) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!visible || !mounted) return null;

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
          w-full max-w-5xl h-[90vh] p-6
          transform transition-all duration-300 
          border border-gray-200
          ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{ backgroundColor: 'var(--container-color)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1"></div>
          <h2 className="text-3xl font-bold text-center" style={{ color: 'var(--title-color)' }}>
            Todos os Certificados
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

        {/* Grid com Scroll */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificados.map((cert) => (
              <CertificadoCard
                key={cert.id}
                certificado={cert}
                onVerify={() => onVerify(cert)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}

// Modal - Detalhes do Certificado
function CertificadoDetailModal({
  isOpen,
  onClose,
  certificado,
}: {
  isOpen: boolean;
  onClose: () => void;
  certificado: Certificado | null;
}) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!visible || !mounted || !certificado) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 flex w-full h-full justify-center 
        items-center backdrop-blur-sm backdrop-brightness-50 bg-opacity-30 p-4 
        transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"}`}
      style={{ zIndex: 10000 }}
      onClick={onClose}
    >
      <div
        className={`rounded-2xl shadow-2xl flex flex-col 
          w-full max-w-4xl max-h-[90vh] p-6
          transform transition-all duration-300 
          border border-gray-200 overflow-y-auto
          ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{ backgroundColor: 'var(--container-color)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image
                src={certificado.logo}
                alt={certificado.emissor}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--title-color)' }}>
                {certificado.titulo}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-color)' }}>
                {certificado.emissor}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoClose size={28} style={{ color: 'var(--title-color)' }} />
          </button>
        </div>

        {/* Imagem do Certificado */}
        <div className="relative w-full h-96 mb-6 rounded-xl overflow-hidden border border-gray-200">
          <Image
            src={certificado.imagemCertificado}
            alt={certificado.titulo}
            fill
            className="object-contain"
          />
        </div>

        {/* Detalhes */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--title-color)' }}>
              Sobre o Certificado
            </h3>
            <p className="text-base" style={{ color: 'var(--text-color)' }}>
              {certificado.descricao}
            </p>
          </div>

          <div>
            <p className="text-sm" style={{ color: 'var(--text-color)' }}>
              <strong>Completado em:</strong> {certificado.dataCompletado}
            </p>
          </div>

          {/* Botão de Verificação */}
          <a
            href={certificado.linkVerificacao}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:opacity-80"
            style={{ backgroundColor: 'var(--button-color)' }}
          >
            Verificar Certificado
            <FiExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}
