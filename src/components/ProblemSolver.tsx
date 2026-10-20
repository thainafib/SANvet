import React, { useState } from 'react';
import { 
  PRODUCTION_PROBLEMS, 
  TECHNICAL_ARGUMENTS, 
  CELTZ_PRODUCTS, 
  ProductionProblem 
} from '../data/celtzData.ts';
import { 
  ShieldAlert, 
  Activity, 
  Egg, 
  Syringe, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Flame, 
  Check, 
  Droplet, 
  Wheat 
} from 'lucide-react';
import { EffervescentTabletIcon } from './EffervescentTabletIcon.tsx';
import { PigletIcon } from './PigletIcon.tsx';
import { GranulatedPowderIcon } from './GranulatedPowderIcon.tsx';

interface ProblemSolverProps {
  selectedSpecies: 'all' | 'avicultura' | 'suinocultura';
  onSelectForCalculation: (productId: string, doseValue: number, mode: 'tonnage' | 'flock') => void;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = ({
  selectedSpecies,
  onSelectForCalculation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProblem, setSelectedProblem] = useState<ProductionProblem | null>(PRODUCTION_PROBLEMS[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter problems based on species and category
  const filteredProblems = PRODUCTION_PROBLEMS.filter((prob) => {
    const matchesSpecies = selectedSpecies === 'all' || prob.species.includes(selectedSpecies);
    const matchesCategory = activeCategory === 'all' || prob.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      prob.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prob.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prob.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSpecies && matchesCategory && matchesSearch;
  });

  // Filter technical arguments for the quick banner
  const argumentsList = TECHNICAL_ARGUMENTS.filter(arg => 
    selectedSpecies === 'all' || arg.species === selectedSpecies
  );

  const getArgIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'Zap': return <Activity className="w-5 h-5 text-blue-500" />;
      case 'Egg': return <Egg className="w-5 h-5 text-amber-500" />;
      case 'Syringe': return <Syringe className="w-5 h-5 text-rose-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-purple-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-500" />;
      case 'Award': return <Award className="w-5 h-5 text-yellow-500" />;
      case 'Piglet':
      case 'Baby': 
        return <PigletIcon className="w-5 h-5 text-pink-600" />;
      default: return <ShieldCheck className="w-5 h-5 text-amber-500" />;
    }
  };

  const getProduct = (productId: string) => {
    return CELTZ_PRODUCTS.find(p => p.id === productId);
  };

  const handleCalculateForProblem = (problem: ProductionProblem) => {
    const prod = getProduct(problem.primaryProduct);
    if (!prod) return;
    
    // Determine default dose
    let doseVal = prod.defaultDoseValue;
    if (problem.primaryProduct === 'celtz-gh-pwd') {
      if (problem.title.includes('Salmonella') && selectedSpecies === 'avicultura') doseVal = 750;
      else if (problem.title.includes('Salmonella') || problem.title.includes('Pressão Sanitária')) doseVal = 1500;
      else if (problem.title.includes('Pico') || problem.title.includes('Casca') || problem.title.includes('Qualidade')) doseVal = 1000;
      else doseVal = 750;
    }
    
    onSelectForCalculation(problem.primaryProduct, doseVal, 'flock');
  };

  return (
    <div className="space-y-8">
      {/* Hero Guide Section */}
      <div className="bg-gradient-to-br from-white to-purple-50/40 rounded-2xl border border-purple-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#4A154B] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Matriz de Decisão Clínica & Produtiva</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#38103A] tracking-tight">
              Melhores Produtos & Utilizações para cada Desafio
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Identifique os sintomas clínicos ou objetivos zootécnicos do seu lote e receba a recomendação técnica exata das soluções <strong className="text-[#4A154B]">Celtz® (SAN Vet)</strong>, via ração ou água de bebida.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 items-center">
            <div className="bg-white px-4 py-3 rounded-xl border border-stone-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-[#4A154B] font-black text-sm">
                <GranulatedPowderIcon className="w-5 h-5 text-[#4A154B]" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-stone-900 block">CELTZ GH PWD</span>
                <span className="text-stone-500">Ração · 750 a 1.500 g/t</span>
              </div>
            </div>

            <div className="bg-white px-4 py-3 rounded-xl border border-stone-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-sm">
                <Droplet className="w-5 h-5 text-indigo-700" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-stone-900 block">CELTZ GH LQD</span>
                <span className="text-stone-500">Água · 1 L / 1.000 L</span>
              </div>
            </div>

            <div className="bg-white px-4 py-3 rounded-xl border border-stone-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-black text-sm">
                <EffervescentTabletIcon className="w-5 h-5 text-amber-700" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-stone-900 block">CELTZ EF</span>
                <span className="text-stone-500">Água · 5 g / 200 L</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Technical Arguments Quick Grid (From Page 3 and Page 22) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Argumentação Técnica Oficial (Destaques do Manual)</span>
          </h3>
          <span className="text-xs text-stone-500">
            {selectedSpecies === 'all' ? 'Avicultura & Suinocultura' : selectedSpecies === 'avicultura' ? 'Avicultura (pág. 3)' : 'Suinocultura (pág. 22)'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {argumentsList.map((arg) => (
            <div 
              key={arg.id} 
              className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-purple-50 text-[#4A154B]">
                    {getArgIcon(arg.icon)}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    {arg.species}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 leading-snug">
                  {arg.problem}
                </h4>
                <div className="bg-purple-50/80 rounded-lg px-2.5 py-1.5 border border-purple-100/60">
                  <span className="text-[11px] font-bold text-[#4A154B] block">
                    {arg.solution}
                  </span>
                </div>
                <ul className="space-y-1 text-[11px] text-stone-600 pt-1">
                  {arg.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  const prob = PRODUCTION_PROBLEMS.find(p => p.primaryProduct === arg.productId);
                  if (prob) setSelectedProblem(prob);
                  const doseNum = arg.standardDose.includes('1.500') ? 1500 : arg.standardDose.includes('1.000') ? 1000 : arg.standardDose.includes('750') ? 750 : 1;
                  onSelectForCalculation(arg.productId, doseNum, 'flock');
                }}
                className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-[#4A154B] bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-500" />
                <span>Calcular com esta dose</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Problem Explorer & Detailed Diagnostic View */}
      <div className="space-y-4">
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 pl-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Pilar:</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#4A154B] text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Todos ({filteredProblems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('sanitario')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'sanitario'
                  ? 'bg-[#4A154B] text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Sanitário
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('fisiologico')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'fisiologico'
                  ? 'bg-[#4A154B] text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Fisiológico & Arranque
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('estresse')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'estresse'
                  ? 'bg-[#4A154B] text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Estresse de Manejos
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('produtivo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'produtivo'
                  ? 'bg-[#4A154B] text-white font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Performance & Ovos / Matrizes
            </button>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar problema ou sintoma..."
              className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]/30 focus:border-[#4A154B]"
            />
          </div>
        </div>

        {/* Two-Column Problem Selector & Detailed Solution Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Problem List (Left Column) */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredProblems.map((problem) => {
              const isSelected = selectedProblem?.id === problem.id;
              const prod = getProduct(problem.primaryProduct);

              return (
                <div
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-50/70 border-[#4A154B] shadow-sm ring-1 ring-[#4A154B]'
                      : 'bg-white border-stone-200 hover:border-purple-200 hover:bg-stone-50/80'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedProblem(problem);
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                          {problem.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-stone-500">
                          {problem.species.includes('avicultura') && <span>🐔</span>}
                          {problem.species.includes('suinocultura') && <span>🐷</span>}
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900">
                        {problem.title}
                      </h4>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#4A154B] translate-x-1' : 'text-stone-300'}`} />
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 mt-2">
                    {problem.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#4A154B] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      {prod?.name}
                    </span>
                    <span className="text-stone-500 text-[11px]">
                      {problem.recommendedRoute}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredProblems.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-stone-500 text-xs">
                Nenhum desafio encontrado com estes filtros. Tente alterar o termo de busca.
              </div>
            )}
          </div>

          {/* Detailed Diagnosis & Recommendation Panel (Right Column) */}
          <div className="lg:col-span-7">
            {selectedProblem ? (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-7 space-y-6 sticky top-28">
                {/* Header */}
                <div className="space-y-2 border-b border-stone-100 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-[#4A154B]">
                        {selectedProblem.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
                        {selectedProblem.species.includes('avicultura') && <span>🐔 Avicultura</span>}
                        {selectedProblem.species.includes('avicultura') && selectedProblem.species.includes('suinocultura') && <span> & </span>}
                        {selectedProblem.species.includes('suinocultura') && <span>🐷 Suinocultura</span>}
                      </div>
                    </div>
                    <span className="text-xs text-stone-400 font-mono">
                      Código: {selectedProblem.id}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {selectedProblem.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {selectedProblem.description}
                  </p>
                </div>

                {/* Symptoms / Clinical Presentation */}
                <div className="space-y-2.5 bg-stone-50/70 p-4 rounded-xl border border-stone-100">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Sinais Clínicos & Fatores de Reconhecimento</span>
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-stone-700">
                    {selectedProblem.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution Recommendation Box */}
                <div className="bg-gradient-to-br from-[#3B0E3C] to-[#591C5C] text-white p-5 rounded-xl space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Solução Recomendada Celtz®
                    </span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md text-white font-medium">
                      {selectedProblem.recommendedRoute}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] text-purple-200 block">Produto Principal:</span>
                      <span className="text-lg font-black text-white">
                        {getProduct(selectedProblem.primaryProduct)?.name}
                      </span>
                      {selectedProblem.secondaryProduct && (
                        <span className="text-xs text-amber-300 block mt-0.5">
                          + {getProduct(selectedProblem.secondaryProduct)?.name} (Sinergia)
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[11px] text-purple-200 block">Posologia / Dosagem:</span>
                      <span className="text-sm font-bold text-amber-300">
                        {selectedProblem.standardDosage}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 text-xs text-purple-100">
                    <span className="font-semibold text-white">Período / Duração: </span>
                    {selectedProblem.duration}
                  </div>
                </div>

                {/* Rationale & Mechanism */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mecanismo de Ação & Resultados Esperados</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {selectedProblem.technicalRationale}
                  </p>

                  <ul className="space-y-2">
                    {selectedProblem.actionList.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-800 bg-purple-50/50 p-2.5 rounded-lg border border-purple-100/50">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stages & Direct Action */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-stone-500">
                    <span className="font-medium text-stone-700">Fases aplicáveis: </span>
                    {selectedProblem.applicableStages.join(', ')}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCalculateForProblem(selectedProblem)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#4A154B] hover:bg-[#38103A] text-white text-xs font-bold rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95"
                  >
                    <Calculator className="w-4 h-4 text-amber-400" />
                    <span>Calcular Doses deste Caso</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500">
                Selecione um desafio na coluna ao lado para visualizar a recomendação técnica completa.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
