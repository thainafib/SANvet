import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { ProblemSolver } from './components/ProblemSolver.tsx';
import { DoseCalculator } from './components/DoseCalculator.tsx';
import { ProtocolDatabase } from './components/ProtocolDatabase.tsx';
import { ProductCatalog } from './components/ProductCatalog.tsx';
import { ManualViewer } from './components/ManualViewer.tsx';
import { 
  ShieldCheck, 
  Droplet, 
  Sparkles, 
  Calculator, 
  Search, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'solver' | 'calculator' | 'database' | 'products' | 'manual'>('solver');
  const [selectedSpecies, setSelectedSpecies] = useState<'all' | 'avicultura' | 'suinocultura'>('all');

  // Pre-load parameters for calculator
  const [calculatorPreload, setCalculatorPreload] = useState<{
    productId: string;
    doseValue: number;
    mode: 'tonnage' | 'flock';
  }>({
    productId: 'celtz-gh-pwd',
    doseValue: 1000,
    mode: 'flock'
  });

  const handleSelectForCalculation = (productId: string, doseValue: number, mode: 'tonnage' | 'flock' = 'flock') => {
    setCalculatorPreload({ productId, doseValue, mode });
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-[#4A154B] selection:text-white">
      {/* Header with Navigation and Species Filter */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSpecies={selectedSpecies}
        setSelectedSpecies={setSelectedSpecies}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'solver' && (
          <ProblemSolver
            selectedSpecies={selectedSpecies}
            onSelectForCalculation={handleSelectForCalculation}
          />
        )}

        {activeTab === 'calculator' && (
          <DoseCalculator
            initialProductId={calculatorPreload.productId}
            initialDose={calculatorPreload.doseValue}
            initialMode={calculatorPreload.mode}
            selectedSpecies={selectedSpecies}
          />
        )}

        {activeTab === 'database' && (
          <ProtocolDatabase
            selectedSpecies={selectedSpecies}
            onSelectForCalculation={handleSelectForCalculation}
          />
        )}

        {activeTab === 'products' && (
          <ProductCatalog
            selectedSpecies={selectedSpecies}
            onSelectForCalculation={handleSelectForCalculation}
          />
        )}

        {activeTab === 'manual' && (
          <ManualViewer />
        )}
      </main>

      {/* Official Footer with SAN Vet Signature */}
      <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-white">
                Celtz<sup className="text-amber-400">®</sup>
              </span>
              <span className="text-stone-600">|</span>
              <span className="font-bold text-amber-400 tracking-wider">SAN VET</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-300 font-medium">
                Conhecimento técnico e soluções para cada desafio da produção!
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('solver')}
                className="hover:text-amber-400 transition-colors"
              >
                Diagnóstico
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className="hover:text-amber-400 transition-colors"
              >
                Calculadora
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('database')}
                className="hover:text-amber-400 transition-colors"
              >
                Protocolos (25+)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('manual')}
                className="hover:text-amber-400 transition-colors"
              >
                Manual PDF
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-500 text-[11px]">
            <p>
              Material técnico baseado no Manual Técnico Oficial de Uso Celtz® (Avicultura & Suinocultura).
            </p>
            <p>
              Uso profissional exclusivo para Médicos Veterinários, Zootecnistas e Produtores Rurais.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
