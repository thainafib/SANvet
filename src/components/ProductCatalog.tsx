import React, { useState } from 'react';
import { 
  CELTZ_PRODUCTS, 
  CeltzProduct, 
  PROTOCOLS_DATABASE 
} from '../data/celtzData.ts';
import { 
  ShieldCheck, 
  Droplet, 
  Wheat, 
  Sparkles, 
  CheckCircle, 
  Package, 
  Clock, 
  Calculator, 
  FileText, 
  Activity, 
  Layers, 
  ChevronRight 
} from 'lucide-react';
import { EffervescentTabletIcon } from './EffervescentTabletIcon.tsx';
import { GranulatedPowderIcon } from './GranulatedPowderIcon.tsx';

interface ProductCatalogProps {
  selectedSpecies: 'all' | 'avicultura' | 'suinocultura';
  onSelectForCalculation: (productId: string, doseValue: number, mode: 'tonnage' | 'flock') => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedSpecies,
  onSelectForCalculation,
}) => {
  const [activeProductId, setActiveProductId] = useState<string>('celtz-gh-pwd');

  const selectedProduct = CELTZ_PRODUCTS.find(p => p.id === activeProductId) || CELTZ_PRODUCTS[0];

  // Protocols referencing this product
  const associatedProtocols = PROTOCOLS_DATABASE.filter(p => 
    p.primaryProductId === selectedProduct.id || p.secondaryProductId === selectedProduct.id
  ).filter(p => selectedSpecies === 'all' || p.species === selectedSpecies);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#4A154B] text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Portfólio Oficial Celtz® (SAN Vet)</span>
          </div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Fichas Técnicas das Soluções Celtz®
          </h2>
          <p className="text-xs text-stone-500">
            Conheça as especificações, doses, diferenciais e modos de ação de cada produto da linha.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectForCalculation(selectedProduct.id, selectedProduct.defaultDoseValue, 'flock')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#4A154B] hover:bg-[#38103A] text-white text-xs font-bold rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Calcular Doses de {selectedProduct.code}</span>
        </button>
      </div>

      {/* Product Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {CELTZ_PRODUCTS.map((prod) => {
          const isSelected = prod.id === activeProductId;
          return (
            <button
              key={prod.id}
              type="button"
              onClick={() => setActiveProductId(prod.id)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-[#3B0E3C] to-[#591C5C] text-white border-transparent shadow-lg ring-2 ring-amber-400'
                  : 'bg-white text-stone-900 border-stone-200 hover:border-purple-200 hover:bg-stone-50/60 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-black px-2.5 py-1 rounded-md ${
                  isSelected ? 'bg-amber-400 text-stone-900' : 'bg-purple-100 text-[#4A154B]'
                }`}>
                  {prod.code}
                </span>
                <span className={isSelected ? 'text-amber-300' : 'text-stone-400'}>
                  {prod.form === 'effervescent' ? (
                    <EffervescentTabletIcon className="w-5 h-5" />
                  ) : prod.category === 'feed' ? (
                    <GranulatedPowderIcon className="w-5 h-5" />
                  ) : (
                    <Droplet className="w-5 h-5" />
                  )}
                </span>
              </div>

              <h3 className="text-lg font-black tracking-tight">{prod.name}</h3>
              <p className={`text-xs mt-1 ${isSelected ? 'text-purple-200' : 'text-stone-500'}`}>
                {prod.badge}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className={`font-semibold ${isSelected ? 'text-amber-300' : 'text-[#4A154B]'}`}>
                  {prod.standardDose}
                </span>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-stone-400'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Product Deep Dive View */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-8">
        {/* Top Product Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-stone-100 pb-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-100 text-[#4A154B] rounded-full text-xs font-bold">
                {selectedProduct.line}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {selectedProduct.route}
              </span>
            </div>

            <h3 className="text-3xl font-black text-stone-900 tracking-tight">
              {selectedProduct.name}
            </h3>

            <p className="text-sm text-stone-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 space-y-1">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Apresentações Comerciais:
                </span>
                <span className="text-xs font-semibold text-stone-800">
                  {selectedProduct.packaging.join(' • ')}
                </span>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 space-y-1">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Período Recomendado:
                </span>
                <span className="text-xs font-semibold text-stone-800">
                  {selectedProduct.recommendedDuration}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-purple-50 to-stone-50 p-6 rounded-2xl border border-purple-100 space-y-4">
            <h4 className="text-xs font-black text-[#4A154B] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Patógenos & Desafios Controlados</span>
            </h4>

            <div className="flex flex-wrap gap-1.5">
              {selectedProduct.targetPathogens.map((pathogen, i) => (
                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-purple-200/60 text-[#4A154B] shadow-2xs">
                  {pathogen}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-purple-100">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Espécies Indicadas:
              </span>
              <div className="flex items-center gap-3 text-xs font-bold text-stone-800">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                  <span>🐔</span> Avicultura Completa
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                  <span>🐷</span> Suinocultura Completa
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Modes of Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Benefits */}
          <div className="space-y-4">
            <h4 className="text-base font-black text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Principais Benefícios Comprovados</span>
            </h4>
            <ul className="space-y-2.5">
              {selectedProduct.keyBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50/80 border border-stone-100 text-xs text-stone-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Modes of Action */}
          <div className="space-y-4">
            <h4 className="text-base font-black text-stone-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-600" />
              <span>Modos de Ação Fisiológica & Entérica</span>
            </h4>
            <ul className="space-y-2.5">
              {selectedProduct.modesOfAction.map((mode, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/40 border border-purple-100/60 text-xs text-stone-700">
                  <span className="w-2 h-2 rounded-full bg-[#4A154B] mt-1.5 shrink-0"></span>
                  <span className="font-medium leading-relaxed">{mode}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Associated Protocols in the Manual */}
        <div className="pt-6 border-t border-stone-100 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-black text-stone-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Protocolos Recomendados com {selectedProduct.name} ({associatedProtocols.length})</span>
            </h4>
            <span className="text-xs text-stone-500">
              Conforme o manual técnico oficial SAN Vet
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {associatedProtocols.slice(0, 6).map((proto) => (
              <div 
                key={proto.id}
                className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 text-left"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-stone-500">
                  <span>{proto.category}</span>
                  <span>Pág. {proto.pageNumber}</span>
                </div>
                <h5 className="text-xs font-bold text-stone-900 line-clamp-1">
                  {proto.stage}: {proto.objective}
                </h5>
                <p className="text-[11px] text-[#4A154B] font-semibold line-clamp-2">
                  {proto.suggestedProtocol}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
