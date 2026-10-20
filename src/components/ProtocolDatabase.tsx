import React, { useState, useMemo } from 'react';
import { 
  PROTOCOLS_DATABASE, 
  CELTZ_PRODUCTS, 
  Protocol 
} from '../data/celtzData.ts';
import { 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight, 
  Calculator, 
  ExternalLink, 
  Wheat, 
  Droplet, 
  X,
  FileText,
  Sparkles,
  Check
} from 'lucide-react';

interface ProtocolDatabaseProps {
  selectedSpecies: 'all' | 'avicultura' | 'suinocultura';
  onSelectForCalculation: (productId: string, doseValue: number, mode: 'tonnage' | 'flock') => void;
}

export const ProtocolDatabase: React.FC<ProtocolDatabaseProps> = ({
  selectedSpecies,
  onSelectForCalculation,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedRoute, setSelectedRoute] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProtocol, setActiveModalProtocol] = useState<Protocol | null>(null);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('celtz_favorite_protocols') || '[]');
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('celtz_favorite_protocols', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Extract unique categories based on species
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    PROTOCOLS_DATABASE.forEach(p => {
      if (selectedSpecies === 'all' || p.species === selectedSpecies) {
        set.add(p.category);
      }
    });
    return Array.from(set);
  }, [selectedSpecies]);

  // Filtered protocols
  const filteredProtocols = useMemo(() => {
    return PROTOCOLS_DATABASE.filter(proto => {
      const matchSpecies = selectedSpecies === 'all' || proto.species === selectedSpecies;
      const matchPillar = selectedPillar === 'all' || proto.pillarType === selectedPillar;
      const matchRoute = selectedRoute === 'all' || 
        (selectedRoute === 'Ração' && proto.route.includes('Ração')) ||
        (selectedRoute === 'Água' && proto.route.includes('Água'));
      const matchCategory = selectedCategory === 'all' || proto.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch = q === '' ||
        proto.category.toLowerCase().includes(q) ||
        proto.stage.toLowerCase().includes(q) ||
        proto.objective.toLowerCase().includes(q) ||
        proto.suggestedProtocol.toLowerCase().includes(q) ||
        proto.pillar.toLowerCase().includes(q) ||
        proto.action.some(a => a.toLowerCase().includes(q)) ||
        (proto.specificChallenges && proto.specificChallenges.some(c => c.toLowerCase().includes(q))) ||
        (proto.punctualUses && proto.punctualUses.some(u => u.toLowerCase().includes(q)));

      return matchSpecies && matchPillar && matchRoute && matchCategory && matchSearch;
    });
  }, [selectedSpecies, selectedPillar, selectedRoute, selectedCategory, searchQuery]);

  const getPillarBadge = (pillarType: string, label: string) => {
    switch (pillarType) {
      case 'fisiologico':
        return <span className="bg-purple-100 text-[#4A154B] text-[10px] font-bold px-2 py-0.5 rounded-full">{label}</span>;
      case 'intestinal':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{label}</span>;
      case 'sanitario':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{label}</span>;
      case 'suporte':
        return <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">{label}</span>;
      default:
        return <span className="bg-stone-100 text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{label}</span>;
    }
  };

  const getProduct = (productId: string) => {
    return CELTZ_PRODUCTS.find(p => p.id === productId);
  };

  const handleLaunchCalc = (protocol: Protocol, e: React.MouseEvent) => {
    e.stopPropagation();
    const prod = getProduct(protocol.primaryProductId);
    if (!prod) return;
    let dose = prod.defaultDoseValue;
    if (protocol.suggestedProtocol.includes('750 g')) dose = 750;
    else if (protocol.suggestedProtocol.includes('1.000 g') || protocol.suggestedProtocol.includes('1000 g')) dose = 1000;
    else if (protocol.suggestedProtocol.includes('1.500 g') || protocol.suggestedProtocol.includes('1500 g')) dose = 1500;
    onSelectForCalculation(protocol.primaryProductId, dose, 'flock');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Search and Filters */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-500" />
              <span>Banco de Protocolos Técnicos Celtz®</span>
            </h2>
            <p className="text-xs text-stone-500">
              Consulta rápida e filtrada de todos os 25 protocolos oficiais extraídos do Manual de Uso SAN Vet.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl">
            <span>{filteredProtocols.length} protocolos encontrados</span>
            {savedFavorites.length > 0 && (
              <span className="text-amber-600">({savedFavorites.length} salvos)</span>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por categoria, objetivo, desafio (ex: Salmonella, desmame, casca, vacinação, ração)..."
            className="w-full text-xs font-medium pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A154B]/30 focus:border-[#4A154B] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Pillar Filter */}
          <div>
            <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
              Pilar de Aplicação:
            </label>
            <select
              value={selectedPillar}
              onChange={(e) => setSelectedPillar(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]/30"
            >
              <option value="all">Todos os Pilares</option>
              <option value="fisiologico">Desafio Fisiológico / Transição</option>
              <option value="intestinal">Saúde Intestinal Contínua</option>
              <option value="sanitario">Controle Sanitário & Patógenos</option>
              <option value="suporte">Terapia de Suporte & Estresse</option>
            </select>
          </div>

          {/* Route Filter */}
          <div>
            <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
              Via de Aplicação:
            </label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]/30"
            >
              <option value="all">Todas as Vias (Ração & Água)</option>
              <option value="Ração">Via Ração</option>
              <option value="Água">Via Água de Bebida</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
              Segmento / Categoria:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]/30"
            >
              <option value="all">Todas as Categorias</option>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Protocol Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProtocols.map((proto) => {
          const isFav = savedFavorites.includes(proto.id);
          const primaryProd = getProduct(proto.primaryProductId);
          const secondaryProd = proto.secondaryProductId ? getProduct(proto.secondaryProductId) : null;

          return (
            <div
              key={proto.id}
              onClick={() => setActiveModalProtocol(proto)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveModalProtocol(proto);
                }
              }}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-[#4A154B]/40 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {getPillarBadge(proto.pillarType, proto.pillar)}
                    <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                      Pág. {proto.pageNumber}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(proto.id, e)}
                    className="text-stone-300 hover:text-amber-500 transition-colors p-1"
                    title={isFav ? 'Remover dos favoritos' : 'Salvar como favorito'}
                  >
                    {isFav ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Category & Stage */}
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    {proto.speciesLabel} · {proto.category}
                  </span>
                  <h3 className="text-sm font-black text-stone-900 group-hover:text-[#4A154B] transition-colors line-clamp-2 mt-0.5">
                    {proto.stage}: {proto.objective}
                  </h3>
                </div>

                {/* Suggested Protocol Box */}
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">
                    Protocolo Recomendado:
                  </span>
                  <p className="text-xs font-semibold text-[#4A154B] leading-snug">
                    {proto.suggestedProtocol}
                  </p>
                </div>

                {/* Actions Highlights */}
                <ul className="space-y-1 text-xs text-stone-600">
                  {proto.action.slice(0, 2).map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span className="line-clamp-1">{act}</span>
                    </li>
                  ))}
                  {proto.action.length > 2 && (
                    <li className="text-[11px] text-stone-400 font-medium pl-3">
                      +{proto.action.length - 2} ações adicionais...
                    </li>
                  )}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  {proto.route.includes('Ração') && <Wheat className="w-3.5 h-3.5 text-amber-600" />}
                  {proto.route.includes('Água') && <Droplet className="w-3.5 h-3.5 text-blue-500" />}
                  <span className="text-[11px]">{proto.route}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleLaunchCalc(proto, e)}
                    className="p-1.5 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-[11px] font-bold flex items-center gap-1"
                    title="Calcular Doses deste Protocolo"
                  >
                    <Calculator className="w-3.5 h-3.5 text-amber-600" />
                    <span>Calcular</span>
                  </button>
                  <span className="text-stone-300">
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProtocols.length === 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-2">
          <p className="text-sm font-semibold text-stone-700">Nenhum protocolo encontrado com os filtros selecionados.</p>
          <p className="text-xs text-stone-400">Tente limpar os termos de busca ou selecionar "Todos os Pilares".</p>
        </div>
      )}

      {/* Detail Modal */}
      {activeModalProtocol && (
        <div 
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveModalProtocol(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-6 shadow-2xl border border-stone-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getPillarBadge(activeModalProtocol.pillarType, activeModalProtocol.pillar)}
                  <span className="text-xs text-stone-500 font-semibold">
                    {activeModalProtocol.category} · {activeModalProtocol.stage}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">
                  {activeModalProtocol.objective}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProtocol(null)}
                className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Protocol Full Text */}
            <div className="bg-gradient-to-r from-purple-50 to-amber-50/50 p-4 rounded-xl border border-purple-100/80 space-y-2">
              <span className="text-xs font-bold text-[#4A154B] uppercase tracking-wider block">
                Protocolo Sugerido:
              </span>
              <p className="text-sm font-bold text-stone-900 leading-snug">
                {activeModalProtocol.suggestedProtocol}
              </p>
              <div className="text-xs text-stone-500 pt-1 flex items-center gap-2">
                <span>Via: <strong>{activeModalProtocol.route}</strong></span>
                <span>•</span>
                <span>Manual Celtz: <strong>Página {activeModalProtocol.pageNumber}</strong></span>
              </div>
            </div>

            {/* Ações Técnicas */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Ações & Mecanismos do Protocolo:
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {activeModalProtocol.action.map((act, i) => (
                  <li key={i} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specific challenges or punctual uses if any */}
            {activeModalProtocol.specificChallenges && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Desafios Pontuais Tratados:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProtocol.specificChallenges.map((ch, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeModalProtocol.punctualUses && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Usos Pontuais Indicados:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProtocol.punctualUses.map((u, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200/50">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
              <span className="text-xs text-stone-400">
                Fonte: Manual Técnico de Uso Celtz® SAN Vet
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalProtocol(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    handleLaunchCalc(activeModalProtocol, e);
                    setActiveModalProtocol(null);
                  }}
                  className="px-5 py-2.5 bg-[#4A154B] hover:bg-[#38103A] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5 text-amber-400" />
                  <span>Calcular com este Protocolo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
