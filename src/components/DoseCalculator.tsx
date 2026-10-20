import React, { useState, useEffect } from 'react';
import { 
  CELTZ_PRODUCTS, 
  CeltzProduct 
} from '../data/celtzData.ts';
import { 
  ANIMAL_PRESETS,
  calculateFeedByTonnage,
  calculateFeedByFlock,
  calculateWaterLqdByVolume,
  calculateWaterLqdByFlock,
  calculateWaterEfByVolume,
  calculateWaterEfByFlock,
  AnimalPreset
} from '../utils/calculator.ts';
import { 
  Calculator, 
  Package, 
  Copy, 
  Check, 
  Printer, 
  RefreshCw, 
  Info, 
  Sparkles, 
  Droplet, 
  Wheat, 
  Calendar,
  Users
} from 'lucide-react';
import { EffervescentTabletIcon } from './EffervescentTabletIcon.tsx';
import { GranulatedPowderIcon } from './GranulatedPowderIcon.tsx';

interface DoseCalculatorProps {
  initialProductId?: string;
  initialDose?: number;
  initialMode?: 'tonnage' | 'flock';
  selectedSpecies: 'all' | 'avicultura' | 'suinocultura';
}

export const DoseCalculator: React.FC<DoseCalculatorProps> = ({
  initialProductId = 'celtz-gh-pwd',
  initialDose,
  initialMode = 'flock',
  selectedSpecies,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProductId);
  const [calcMethod, setCalcMethod] = useState<'tonnage' | 'flock'>(initialMode);
  
  // Feed inputs
  const [feedTonnage, setFeedTonnage] = useState<number>(20);
  const [feedDoseGPerTon, setFeedDoseGPerTon] = useState<number>(initialDose || 1000);
  
  // Water LQD inputs
  const [waterVolumeLiters, setWaterVolumeLiters] = useState<number>(10000);
  const [waterLqdDoseRate, setWaterLqdDoseRate] = useState<number>(1); // L/1000L
  
  // Water EF inputs
  const [waterEfDoseRate, setWaterEfDoseRate] = useState<number>(5); // g/200L

  // Flock / Animal inputs
  const [animalCount, setAnimalCount] = useState<number>(30000);
  const [dailyFeedPerAnimalG, setDailyFeedPerAnimalG] = useState<number>(110);
  const [dailyWaterPerAnimalL, setDailyWaterPerAnimalL] = useState<number>(0.22);
  const [treatmentDays, setTreatmentDays] = useState<number>(7);

  // Copy feedback state
  const [copied, setCopied] = useState<boolean>(false);

  // Sync when initial props change
  useEffect(() => {
    if (initialProductId) {
      setSelectedProductId(initialProductId);
    }
    if (initialDose) {
      if (initialProductId === 'celtz-gh-pwd') setFeedDoseGPerTon(initialDose);
      else if (initialProductId === 'celtz-gh-lqd') setWaterLqdDoseRate(initialDose);
      else if (initialProductId === 'celtz-ef') setWaterEfDoseRate(initialDose);
    }
    if (initialMode) {
      setCalcMethod(initialMode);
    }
  }, [initialProductId, initialDose, initialMode]);

  const currentProduct = CELTZ_PRODUCTS.find(p => p.id === selectedProductId) || CELTZ_PRODUCTS[0];

  // Filter presets by selected species
  const availablePresets = ANIMAL_PRESETS.filter(p => 
    selectedSpecies === 'all' || p.species === selectedSpecies
  );

  const applyPreset = (preset: AnimalPreset) => {
    setAnimalCount(preset.defaultCount);
    setDailyFeedPerAnimalG(preset.dailyFeedGramsPerAnimal);
    setDailyWaterPerAnimalL(preset.dailyWaterLitersPerAnimal);
    setTreatmentDays(preset.defaultDays);
    setCalcMethod('flock');
  };

  // Compute results dynamically based on product & method
  let calculationSummary = {
    totalProductDisplay: '',
    totalProductRaw: 0,
    unit: '',
    dailyProductDisplay: '',
    packagingDisplay: '',
    mediumVolumeDisplay: '',
    applicationTip: ''
  };

  if (currentProduct.id === 'celtz-gh-pwd') {
    if (calcMethod === 'tonnage') {
      const res = calculateFeedByTonnage(feedTonnage, feedDoseGPerTon);
      calculationSummary = {
        totalProductDisplay: `${res.totalProductKg.toLocaleString('pt-BR')} kg`,
        totalProductRaw: res.totalProductKg,
        unit: 'kg',
        dailyProductDisplay: 'Conforme bateladas produzidas',
        packagingDisplay: `${res.bagsOf25kg} saco(s) de 25 kg`,
        mediumVolumeDisplay: `${res.totalFeedTonnes} toneladas de ração`,
        applicationTip: 'Realizar pré-mistura de 1:10 em ingrediente carreador (milho moído ou farelo) antes de adicionar ao misturador principal para garantir dispersão 100% homogênea.'
      };
    } else {
      const res = calculateFeedByFlock(animalCount, dailyFeedPerAnimalG, treatmentDays, feedDoseGPerTon);
      calculationSummary = {
        totalProductDisplay: `${res.totalProductKg.toLocaleString('pt-BR')} kg`,
        totalProductRaw: res.totalProductKg,
        unit: 'kg',
        dailyProductDisplay: `${res.dailyProductKg.toLocaleString('pt-BR')} kg / dia`,
        packagingDisplay: `${res.bagsOf25kg} saco(s) de 25 kg`,
        mediumVolumeDisplay: `${res.totalFeedTonnes} t de ração no período (${res.dailyFeedTonnes} t/dia)`,
        applicationTip: `Lote de ${animalCount.toLocaleString('pt-BR')} animais consumindo ${res.dailyFeedTonnes} t/dia durante ${treatmentDays} dias. Incorporar à ração da fase.`
      };
    }
  } else if (currentProduct.id === 'celtz-gh-lqd') {
    if (calcMethod === 'tonnage') {
      const res = calculateWaterLqdByVolume(waterVolumeLiters, waterLqdDoseRate);
      calculationSummary = {
        totalProductDisplay: `${res.totalProductLiters.toLocaleString('pt-BR')} Litros`,
        totalProductRaw: res.totalProductLiters,
        unit: 'L',
        dailyProductDisplay: 'Dosagem direta por reabastecimento de caixa',
        packagingDisplay: res.packagingRecommendation,
        mediumVolumeDisplay: `${res.waterVolumeLiters.toLocaleString('pt-BR')} Litros de água`,
        applicationTip: 'Homogeneizar diretamente na caixa d\'água ou ajustar bomba dosadora para 1:1.000 (0,1%). Diluição instantânea sem retenção de sedimentos.'
      };
    } else {
      const res = calculateWaterLqdByFlock(animalCount, dailyWaterPerAnimalL, treatmentDays, waterLqdDoseRate);
      calculationSummary = {
        totalProductDisplay: `${res.totalProductLiters.toLocaleString('pt-BR')} Litros`,
        totalProductRaw: res.totalProductLiters,
        unit: 'L',
        dailyProductDisplay: `${res.dailyProductLiters.toLocaleString('pt-BR')} Litros / dia`,
        packagingDisplay: res.packagingRecommendation,
        mediumVolumeDisplay: `${res.totalWaterLiters.toLocaleString('pt-BR')} L de água (${res.dailyWaterLiters.toLocaleString('pt-BR')} L/dia)`,
        applicationTip: `Aporte diário de ${res.dailyProductLiters} L de CELTZ GH LQD para os ${res.dailyWaterLiters.toLocaleString('pt-BR')} L de consumo diário das aves/suínos.`
      };
    }
  } else {
    // CELTZ EF
    if (calcMethod === 'tonnage') {
      const res = calculateWaterEfByVolume(waterVolumeLiters, waterEfDoseRate);
      calculationSummary = {
        totalProductDisplay: `${res.totalProductGrams.toLocaleString('pt-BR')} g (${res.totalProductKg} kg)`,
        totalProductRaw: res.totalProductGrams,
        unit: 'g',
        dailyProductDisplay: 'Por caixa ou batelada de água',
        packagingDisplay: `${res.sachetsOf100g} sachê(s) de 100g (ou ${res.potsOf1kg} pote de 1kg)`,
        mediumVolumeDisplay: `${res.waterVolumeLiters.toLocaleString('pt-BR')} Litros de água`,
        applicationTip: 'Dissolver os sachês efervescentes no balde pré-mistura ou caixa d\'água. Liberação acelerada de vitaminas com excelente solubilidade.'
      };
    } else {
      const res = calculateWaterEfByFlock(animalCount, dailyWaterPerAnimalL, treatmentDays, waterEfDoseRate);
      calculationSummary = {
        totalProductDisplay: `${res.totalProductGrams.toLocaleString('pt-BR')} g (${res.totalProductKg} kg)`,
        totalProductRaw: res.totalProductGrams,
        unit: 'g',
        dailyProductDisplay: `${res.dailyProductGrams.toLocaleString('pt-BR')} g / dia`,
        packagingDisplay: `${res.sachetsOf100g} sachê(s) de 100g (ou ${res.potsOf1kg} pote(s) de 1kg)`,
        mediumVolumeDisplay: `${res.totalWaterLiters.toLocaleString('pt-BR')} L de água no período (${res.dailyWaterLiters.toLocaleString('pt-BR')} L/dia)`,
        applicationTip: `Fornecer ${res.dailyProductGrams} g por dia distribuídos na água de bebida durante os ${treatmentDays} dias do manejo estressante.`
      };
    }
  }

  const handleCopyReport = () => {
    const text = `📋 *PRESCRIÇÃO & DOSAGEM TÉCNICA CELTZ® (SAN VET)*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Produto: ${currentProduct.name} (${currentProduct.line})
Via: ${currentProduct.route}
Modo de Cálculo: ${calcMethod === 'tonnage' ? 'Volume Direto' : 'Por Lote & Animais'}
${calcMethod === 'flock' ? `Animais no Lote: ${animalCount.toLocaleString('pt-BR')}
Período de Tratamento: ${treatmentDays} dias
Consumo Total Estimado: ${calculationSummary.mediumVolumeDisplay}` : `Volume a Tratar: ${calculationSummary.mediumVolumeDisplay}`}

*RESULTADO DA DOSAGEM:*
• Total de Produto Necessário: ${calculationSummary.totalProductDisplay}
• Consumo Diário: ${calculationSummary.dailyProductDisplay}
• Embalagens Recomendadas: ${calculationSummary.packagingDisplay}

*ORIENTAÇÃO TÉCNICA:*
${calculationSummary.applicationTip}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gerado via Aplicativo Técnico Celtz® SAN Vet`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Calculadora Oficial de Dosagem e Tratamento</span>
          </div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Calculadora de Doses Celtz®
          </h2>
          <p className="text-xs text-stone-500">
            Dimensione com precisão lotes, bateladas de ração e consumo de água para Avicultura e Suinocultura.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyReport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-600" />}
            <span>{copied ? 'Copiado p/ WhatsApp!' : 'Copiar Prescrição'}</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span className="hidden sm:inline">Imprimir Ficha</span>
          </button>
        </div>
      </div>

      {/* Step 1: Product Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {CELTZ_PRODUCTS.map((prod) => {
          const isSelected = selectedProductId === prod.id;
          return (
            <div
              key={prod.id}
              onClick={() => {
                setSelectedProductId(prod.id);
                if (prod.id === 'celtz-gh-pwd') setFeedDoseGPerTon(prod.defaultDoseValue);
                else if (prod.id === 'celtz-gh-lqd') setWaterLqdDoseRate(prod.defaultDoseValue);
                else if (prod.id === 'celtz-ef') setWaterEfDoseRate(prod.defaultDoseValue);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedProductId(prod.id);
                }
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-purple-900 text-white border-purple-900 shadow-md ring-2 ring-amber-400'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-amber-400 text-stone-900' : 'bg-purple-100 text-[#4A154B]'
                }`}>
                  {prod.code}
                </span>
                <span className={`text-xs ${isSelected ? 'text-purple-200' : 'text-stone-400'}`}>
                  {prod.form === 'effervescent' ? (
                    <EffervescentTabletIcon className="w-4 h-4 inline" />
                  ) : prod.category === 'feed' ? (
                    <GranulatedPowderIcon className="w-4 h-4 inline" />
                  ) : (
                    <Droplet className="w-4 h-4 inline" />
                  )}
                </span>
              </div>
              <h3 className="font-extrabold text-sm mb-1">{prod.name}</h3>
              <p className={`text-xs ${isSelected ? 'text-purple-100' : 'text-stone-500'} line-clamp-1`}>
                {prod.standardDose}
              </p>
            </div>
          );
        })}
      </div>

      {/* Preset Quick Loader Buttons */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Carregar Parâmetros Padrão do Setor (Presets Zootécnicos)</span>
          </span>
          <span className="text-[11px] text-stone-500">Clique para preencher automaticamente</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {availablePresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-purple-300 hover:bg-purple-50 text-stone-700 transition-colors flex items-center gap-1.5"
            >
              <span>{preset.species === 'avicultura' ? '🐔' : '🐷'}</span>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculation Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (Left) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 space-y-6 shadow-xs">
          {/* Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Método de Dimensionamento
            </label>
            <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setCalcMethod('flock')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  calcMethod === 'flock'
                    ? 'bg-[#4A154B] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Por Lote & Animais</span>
              </button>
              <button
                type="button"
                onClick={() => setCalcMethod('tonnage')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  calcMethod === 'tonnage'
                    ? 'bg-[#4A154B] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {currentProduct.form === 'effervescent' ? (
                  <EffervescentTabletIcon className="w-4 h-4 text-amber-400" />
                ) : currentProduct.category === 'feed' ? (
                  <GranulatedPowderIcon className="w-4 h-4 text-amber-400" />
                ) : (
                  <Droplet className="w-4 h-4 text-amber-400" />
                )}
                <span>Volume Direto ({currentProduct.category === 'feed' ? 'Silo/Misturador' : 'Caixa D\'água'})</span>
              </button>
            </div>
          </div>

          {/* Conditional Inputs */}
          {calcMethod === 'flock' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Número de Animais no Lote:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={animalCount}
                    onChange={(e) => setAnimalCount(Math.max(1, Number(e.target.value)))}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#4A154B]/30 focus:border-[#4A154B] outline-none"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Ex: 30.000 aves ou 1.200 suínos</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Duração do Protocolo (dias):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={treatmentDays}
                    onChange={(e) => setTreatmentDays(Math.max(1, Number(e.target.value)))}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#4A154B]/30 focus:border-[#4A154B] outline-none"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Conforme bula (ex: 5, 7, 10 ou 14 dias)</span>
                </div>
              </div>

              {currentProduct.category === 'feed' ? (
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Consumo Diário Estimado de Ração por Animal (gramas/animal/dia):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={dailyFeedPerAnimalG}
                    onChange={(e) => setDailyFeedPerAnimalG(Math.max(1, Number(e.target.value)))}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#4A154B]/30 focus:border-[#4A154B] outline-none"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Ex: 110 g para frango de corte; 2.500 g para porca gestante</span>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Consumo Diário Estimado de Água por Animal (Litros/animal/dia):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={dailyWaterPerAnimalL}
                    onChange={(e) => setDailyWaterPerAnimalL(Math.max(0.01, Number(e.target.value)))}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#4A154B]/30 focus:border-[#4A154B] outline-none"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Ex: 0,22 L para frango médio; 2,5 L para leitão de creche</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {currentProduct.category === 'feed' ? (
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Quantidade Total de Ração a Produzir / Abastecer (Toneladas):
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.1"
                    value={feedTonnage}
                    onChange={(e) => setFeedTonnage(Math.max(0.1, Number(e.target.value)))}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#4A154B]/30 focus:border-[#4A154B] outline-none"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Capacidade da batelada da fábrica ou capacidade do silo da granja</span>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Capacidade / Volume da Caixa d'Água (Litros):
                  </label>
                  <input
                    type="number"
                    step="100"
                    min="100"
                    value={waterVolumeLiters}
                    onChange={(e) => setWaterVolumeLiters(Math.max(1, Number(e.target.value)))}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#4A154B]/30 focus:border-[#4A154B] outline-none"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">Ex: 5.000 L, 10.000 L ou 20.000 L</span>
                </div>
              )}
            </div>
          )}

          {/* Dosage Selector based on Product */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Dosagem Recomendada
              </label>
              <span className="text-xs text-[#4A154B] font-semibold">
                {currentProduct.name}
              </span>
            </div>

            {currentProduct.id === 'celtz-gh-pwd' && (
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedDoseGPerTon(750)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      feedDoseGPerTon === 750
                        ? 'bg-[#4A154B] text-white border-[#4A154B] shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-purple-300'
                    }`}
                  >
                    750 g / T
                    <span className="text-[10px] block font-normal opacity-80">Modulação / Salmonella</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedDoseGPerTon(1000)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      feedDoseGPerTon === 1000
                        ? 'bg-[#4A154B] text-white border-[#4A154B] shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-purple-300'
                    }`}
                  >
                    1.000 g / T
                    <span className="text-[10px] block font-normal opacity-80">Pico / Ovos / Carcaça</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedDoseGPerTon(1500)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      feedDoseGPerTon === 1500
                        ? 'bg-[#4A154B] text-white border-[#4A154B] shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-purple-300'
                    }`}
                  >
                    1.500 g / T
                    <span className="text-[10px] block font-normal opacity-80">Pressão Sanitária Alta</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-stone-500">Dose personalizada (g/T):</span>
                  <input
                    type="number"
                    value={feedDoseGPerTon}
                    onChange={(e) => setFeedDoseGPerTon(Math.max(100, Number(e.target.value)))}
                    className="w-24 text-xs font-bold px-2 py-1 bg-stone-50 border border-stone-300 rounded-lg text-center"
                  />
                  <span className="text-xs text-stone-500">g/tonelada</span>
                </div>
              </div>
            )}

            {currentProduct.id === 'celtz-gh-lqd' && (
              <div className="bg-purple-50/70 p-3.5 rounded-xl border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#4A154B] block">
                    Dose Padrão Oficial: 1 Litro para cada 1.000 Litros de água
                  </span>
                  <span className="text-[11px] text-stone-600">
                    Equivalente a 1 mL por litro (diluição 1:1.000 ou 0,1%)
                  </span>
                </div>
                <span className="px-3 py-1 bg-amber-400 text-stone-900 text-xs font-bold rounded-lg shadow-xs">
                  1 L / 1.000 L
                </span>
              </div>
            )}

            {currentProduct.id === 'celtz-ef' && (
              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-900 block">
                    Dose Padrão Oficial: 5 g para cada 200 Litros de água
                  </span>
                  <span className="text-[11px] text-stone-600">
                    Equivalente a 25 g para cada 1.000 Litros de água de bebida
                  </span>
                </div>
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-xs">
                  5 g / 200 L
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Results Card (Right) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#3B0E3C] via-[#4A154B] to-[#591C5C] text-white p-7 rounded-2xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-bold block">
                Resultado do Dimensionamento
              </span>
              <h3 className="text-lg font-black text-white">
                {currentProduct.name}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-400 text-stone-900">
              {currentProduct.code}
            </span>
          </div>

          {/* Big Number Total */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/15 text-center space-y-1">
            <span className="text-xs text-purple-200 uppercase tracking-wider font-medium">
              Total de Produto Necessário
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
              {calculationSummary.totalProductDisplay}
            </div>
            <span className="text-xs text-white/80 block pt-1">
              {calculationSummary.mediumVolumeDisplay}
            </span>
          </div>

          {/* Grid Breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-purple-200 block text-[11px] mb-1">Consumo Diário:</span>
              <span className="font-bold text-white text-sm">
                {calculationSummary.dailyProductDisplay}
              </span>
            </div>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-purple-200 block text-[11px] mb-1">Embalagens Sugeridas:</span>
              <span className="font-bold text-amber-300 text-sm">
                {calculationSummary.packagingDisplay}
              </span>
            </div>
          </div>

          {/* Preparation & Application Guide */}
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Instrução de Aplicação & Boas Práticas:</span>
            </div>
            <p className="text-xs text-purple-100 leading-relaxed">
              {calculationSummary.applicationTip}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyReport}
              className="flex-1 py-3 px-4 bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-stone-900" /> : <Copy className="w-4 h-4 text-stone-900" />}
              <span>{copied ? 'Copiado!' : 'Copiar para Enviar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
