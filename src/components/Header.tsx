import React from 'react';
import { 
  FileText, 
  Calculator, 
  Search, 
  Layers, 
  HelpCircle, 
  Download,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'solver' | 'calculator' | 'database' | 'products' | 'manual';
  setActiveTab: (tab: 'solver' | 'calculator' | 'database' | 'products' | 'manual') => void;
  selectedSpecies: 'all' | 'avicultura' | 'suinocultura';
  setSelectedSpecies: (species: 'all' | 'avicultura' | 'suinocultura') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedSpecies,
  setSelectedSpecies,
}) => {
  return (
    <header className="bg-gradient-to-r from-[#3B0E3C] via-[#4A154B] to-[#591C5C] text-white shadow-xl sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3.5">
            {/* Celtz / SAN Logo Badge */}
            <div className="flex items-center gap-2">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-1.5 flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">
                  Celtz<sup className="text-xs font-semibold text-amber-400">®</sup>
                </span>
                <span className="w-1 h-5 bg-amber-400/80 rounded-full"></span>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] font-bold tracking-widest text-amber-400">SAN</span>
                  <span className="text-[9px] font-medium tracking-wider text-white/80">VET</span>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Guia Técnico & Calculadora de Doses
              </h1>
              <p className="text-xs text-purple-200/90 hidden sm:block">
                Manual de Aplicação Estratégica Celtz® · Avicultura & Suinocultura
              </p>
            </div>
          </div>

          {/* Quick Species Filter & PDF Download */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Species Pill Selector */}
            <div className="bg-white/10 backdrop-blur-sm p-1 rounded-xl flex items-center text-xs font-medium border border-white/15">
              <button
                type="button"
                onClick={() => setSelectedSpecies('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedSpecies === 'all'
                    ? 'bg-amber-400 text-stone-900 font-semibold shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Todas as Espécies
              </button>
              <button
                type="button"
                onClick={() => setSelectedSpecies('avicultura')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  selectedSpecies === 'avicultura'
                    ? 'bg-amber-400 text-stone-900 font-semibold shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🐔</span> Avicultura
              </button>
              <button
                type="button"
                onClick={() => setSelectedSpecies('suinocultura')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  selectedSpecies === 'suinocultura'
                    ? 'bg-amber-400 text-stone-900 font-semibold shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🐷</span> Suinocultura
              </button>
            </div>

            {/* Download PDF button */}
            <a
              href="/assets/aistudio/15396_-_SAN_Manual_Uso_Celtz-Final_b7a104e7.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Baixar Manual Técnico Original em PDF"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm transition-colors border border-emerald-400/30"
              title="Baixar Manual Técnico Original em PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF Oficial</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-white/10 overflow-x-auto no-scrollbar" aria-label="Navegação Principal">
          <button
            type="button"
            onClick={() => {
              setActiveTab('solver');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'solver'
                ? 'bg-white text-[#4A154B] font-bold shadow-md'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>Diagnóstico & Solução</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('calculator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'calculator'
                ? 'bg-white text-[#4A154B] font-bold shadow-md'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>Calculadora de Doses</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('database');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'database'
                ? 'bg-white text-[#4A154B] font-bold shadow-md'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            <Search className="w-4 h-4 text-amber-500" />
            <span>Banco de Protocolos (25+)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'products'
                ? 'bg-white text-[#4A154B] font-bold shadow-md'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Produtos Celtz®</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('manual');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'manual'
                ? 'bg-white text-[#4A154B] font-bold shadow-md'
                : 'text-white/85 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Sumário do Manual</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
