import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  BookOpen, 
  ChevronRight, 
  Search,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface ManualPageGuide {
  page: number;
  section: 'Avicultura' | 'Suinocultura' | 'Institucional';
  title: string;
  subtitle: string;
  highlights: string[];
}

const MANUAL_PAGES: ManualPageGuide[] = [
  {
    page: 1,
    section: 'Institucional',
    title: 'Celtz® Avicultura - Capa Oficial',
    subtitle: 'Soluções inteligentes para mais saúde, performance e resultados sustentáveis na produção avícola.',
    highlights: ['Saúde Intestinal', 'Controle Sanitário', 'Performance Produtiva', 'Suporte Nutricional']
  },
  {
    page: 2,
    section: 'Institucional',
    title: 'Manual Técnico de Uso CELTZ - Introdução',
    subtitle: 'Orientações para uma aplicação estratégica e eficiente na avicultura e suinocultura.',
    highlights: ['Suporte técnico para escolha de produtos', 'Foco no equilíbrio da microbiota', 'SAN Vet']
  },
  {
    page: 3,
    section: 'Avicultura',
    title: 'Argumentação Técnica Avicultura',
    subtitle: 'Matriz comparativa de problemas x soluções Celtz x benefícios.',
    highlights: ['Salmonella (CELTZ GH PWD 750 g/T)', 'Desafios Pontuais (CELTZ GH LQD 1 L/1000L)', 'Pico de Produção (CELTZ GH PWD 1000 g/T)', 'Vacinações e Estresse (CELTZ EF 5 g/200L)']
  },
  {
    page: 4,
    section: 'Avicultura',
    title: 'Reprodutora Pesada Frango - Recria (Parte 1)',
    subtitle: 'Desafio Fisiológico (recebimento de alojadas) e Saúde Intestinal.',
    highlights: ['Probiótico + CELTZ EF via água', 'CELTZ GH PWD ração pré-inicial', 'Manutenção da integridade morfológica']
  },
  {
    page: 5,
    section: 'Avicultura',
    title: 'Reprodutora Pesada Frango - Recria (Parte 2)',
    subtitle: 'Controle Sanitário e Terapias de Suporte (Desafios inespecíficos e aporte vitamínico).',
    highlights: ['Fitogênico + CELTZ GH PWD na ração', 'CELTZ GH LQD para qualidade de fezes/enterites', 'CELTZ EF para vacinações/pesagens/debicagem']
  },
  {
    page: 6,
    section: 'Avicultura',
    title: 'Reprodutora Pesada Frango - Produção (Parte 1)',
    subtitle: 'Transferência / Desafio Fisiológico, Saúde Intestinal e Controle Sanitário.',
    highlights: ['CELTZ GH LQD (6-14d pós-transferência)', 'CELTZ GH PWD em todas as rações', 'Fitogênico + CELTZ GH PWD']
  },
  {
    page: 7,
    section: 'Avicultura',
    title: 'Reprodutora Pesada Frango - Produção (Parte 2)',
    subtitle: 'Pico de produção, qualidade de casca de ovos e manejos.',
    highlights: ['CELTZ GH PWD em pré-postura e postura I', 'CELTZ GH PWD em postura II e III (qualidade da casca)', 'CELTZ EF para spiking/vacinações']
  },
  {
    page: 8,
    section: 'Avicultura',
    title: 'Frango de Corte - Protocolo Completo',
    subtitle: 'Ganho de peso aos 7 e 14 dias, saúde intestinal, desafios pontuais e aporte vitamínico.',
    highlights: ['Probiótico + CELTZ GH LQD (5-14d)', 'CELTZ GH PWD em rações iniciais e crescimento', 'CELTZ EF contra estresse térmico e jejum']
  },
  {
    page: 9,
    section: 'Avicultura',
    title: 'Reprodutora Pesada Peru - Recria (Parte 1)',
    subtitle: 'Desafio fisiológico de recebimento e integridade intestinal.',
    highlights: ['Recebimento de aves alojadas', 'Probiótico + CELTZ EF', 'CELTZ GH PWD nas rações']
  },
  {
    page: 10,
    section: 'Avicultura',
    title: 'Reprodutora Pesada Peru - Recria (Parte 2)',
    subtitle: 'Controle sanitário em desafios conhecidos e terapia de suporte.',
    highlights: ['Fitogênico + CELTZ GH PWD', 'CELTZ GH LQD (7-10d) para fezes anormais', 'CELTZ EF em debicagem e pesagens']
  },
  {
    page: 11,
    section: 'Avicultura',
    title: 'Reprodutora Pesada Peru - Produção (Parte 1)',
    subtitle: 'Transferência de lote, microbiota e resposta imune.',
    highlights: ['Probiótico + CELTZ GH LQD água', 'CELTZ GH PWD contínuo na ração']
  },
  {
    page: 12,
    section: 'Avicultura',
    title: 'Reprodutora Pesada Peru - Produção (Parte 2)',
    subtitle: 'Pico de postura, qualidade da casca e terapias de suporte.',
    highlights: ['CELTZ GH PWD postura I, II e III', 'CELTZ EF para spiking e manejos']
  },
  {
    page: 13,
    section: 'Avicultura',
    title: 'Peru de Corte - Iniciador',
    subtitle: 'Medida suplementar de arranque e integridade intestinal.',
    highlights: ['Probiótico + CELTZ GH LQD (5-14 dias)', 'CELTZ GH PWD rações pré-inicial e inicial', 'CELTZ EF contra falta de ração']
  },
  {
    page: 14,
    section: 'Avicultura',
    title: 'Peru de Corte - Terminador',
    subtitle: 'Recebimento de aves transferidas, crescimento e terminação.',
    highlights: ['CELTZ GH LQD pós-transferência', 'Fitogênico + CELTZ GH PWD crescimento I e II', 'CELTZ EF no pré-abate']
  },
  {
    page: 15,
    section: 'Avicultura',
    title: 'Poedeira Comercial Gaiola - Recria (Parte 1)',
    subtitle: 'Alojamento, integridade intestinal e suporte.',
    highlights: ['Probiótico + CELTZ EF (1-7/10d)', 'CELTZ GH PWD rações de recria', 'CELTZ GH LQD desafios pontuais']
  },
  {
    page: 16,
    section: 'Avicultura',
    title: 'Poedeira Comercial Gaiola - Recria & Pico',
    subtitle: 'Transferência para postura e suporte ao pico de postura.',
    highlights: ['CELTZ GH LQD pós-transferência', 'CELTZ GH PWD rações pré-pico, pico e pós-pico fase I']
  },
  {
    page: 17,
    section: 'Avicultura',
    title: 'Poedeira Comercial Gaiola - Produção Avançada',
    subtitle: 'Qualidade de casca de ovos e restrição nutricional.',
    highlights: ['CELTZ GH PWD postura II, III e IV', 'CELTZ EF pós-retorno de níveis nutricionais']
  },
  {
    page: 18,
    section: 'Avicultura',
    title: 'Poedeira Comercial Piso - Recria',
    subtitle: 'Protocolos de recria em sistema de piso.',
    highlights: ['Colonização precoce do TGI', 'Fitogênico + CELTZ GH PWD', 'CELTZ EF para manejos']
  },
  {
    page: 19,
    section: 'Avicultura',
    title: 'Poedeira Comercial Piso - Produção & Pico',
    subtitle: 'Transferência de lote e suporte ao pico em piso.',
    highlights: ['CELTZ GH LQD (6-14d)', 'CELTZ GH PWD rações pré-pico e pico']
  },
  {
    page: 20,
    section: 'Avicultura',
    title: 'Poedeira Comercial Piso - Produção Avançada',
    subtitle: 'Sustentação de casca e restrição nutricional em sistema de piso.',
    highlights: ['CELTZ GH PWD pós-pico', 'CELTZ EF na água após restrição alimentar']
  },
  {
    page: 21,
    section: 'Institucional',
    title: 'Celtz® Suinocultura - Capa da Seção',
    subtitle: 'Soluções inteligentes para mais saúde, performance e resultados sustentáveis na produção suinícola.',
    highlights: ['Saúde Intestinal', 'Controle Sanitário', 'Performance Produtiva', 'Suporte Nutricional']
  },
  {
    page: 22,
    section: 'Suinocultura',
    title: 'Argumentação Técnica Suinocultura',
    subtitle: 'Matriz técnica de soluções para a suinocultura moderna.',
    highlights: ['Pressão Sanitária (CELTZ GH PWD 1.500 g/T)', 'Desafios Pontuais (CELTZ GH LQD 1 L/1000L)', 'Modulação de Microbiota (CELTZ GH PWD 750 g/T)', 'Qualidade de Tripa/Carcaça (CELTZ GH PWD 1.000 g/T)', 'Desmame (CELTZ EF 5 g/200L)']
  },
  {
    page: 23,
    section: 'Suinocultura',
    title: 'Fase de Creche Suína',
    subtitle: 'Adaptação de leitões desmamados, desafios entéricos por E. coli e Salmonella.',
    highlights: ['CELTZ EF (1-5d) pós-desmame', 'CELTZ GH LQD (7-10d) + CELTZ GH PWD rações iniciais', 'Manutenção dos vilos contra atrofia de desmame']
  },
  {
    page: 24,
    section: 'Suinocultura',
    title: 'Fase de Terminação Suína',
    subtitle: 'Recuperação pós-antibióticos, controle de patógenos (Bh e LI) e qualidade de tripa.',
    highlights: ['CELTZ GH PWD nas janelas entre pulsos de antibióticos', 'Pulsos intervalados de 12-14 dias ou LQD 7-10 dias', 'Melhoria na integridade e rendimento de tripa no frigorífico']
  },
  {
    page: 25,
    section: 'Suinocultura',
    title: 'Matrizes Suínas - Gestação, Pré-Parto e Lactação',
    subtitle: 'Leitoas, matrizes gestantes, pré-parto e lactação.',
    highlights: ['CELTZ GH PWD contínuo em gestação', 'Aumento de imunoglobulinas no colostro', 'Redução do catabolismo severo na lactação', 'Qualidade do leite']
  }
];

export const ManualViewer: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<'all' | 'Avicultura' | 'Suinocultura'>('all');
  const [searchWord, setSearchWord] = useState<string>('');

  const filteredPages = MANUAL_PAGES.filter(p => {
    const matchSec = selectedSection === 'all' || p.section === selectedSection;
    const q = searchWord.toLowerCase().trim();
    const matchSearch = q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.highlights.some(h => h.toLowerCase().includes(q));
    return matchSec && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Direct PDF Link */}
      <div className="bg-gradient-to-r from-[#3B0E3C] via-[#4A154B] to-[#591C5C] text-white p-7 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-stone-900 text-xs font-bold px-2.5 py-0.5 rounded-md">
              PDF Original Integrado
            </span>
            <span className="text-xs text-purple-200">25 Páginas Técnicas</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Manual Técnico de Uso CELTZ® (SAN Vet)
          </h2>
          <p className="text-xs text-purple-200 max-w-2xl leading-relaxed">
            Consulte o sumário estruturado de cada página abaixo ou abra o documento original em alta resolução para download, visualização offline e compartilhamento.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/assets/aistudio/15396_-_SAN_Manual_Uso_Celtz-Final_b7a104e7.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-black rounded-xl shadow-md transition-all active:scale-95"
          >
            <Download className="w-4 h-4 text-stone-900" />
            <span>Abrir / Baixar PDF Oficial</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-800" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-500">Filtrar:</span>
          <button
            type="button"
            onClick={() => setSelectedSection('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedSection === 'all'
                ? 'bg-[#4A154B] text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Todas as 25 Páginas
          </button>
          <button
            type="button"
            onClick={() => setSelectedSection('Avicultura')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedSection === 'Avicultura'
                ? 'bg-[#4A154B] text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            🐔 Avicultura (Págs. 1-20)
          </button>
          <button
            type="button"
            onClick={() => setSelectedSection('Suinocultura')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedSection === 'Suinocultura'
                ? 'bg-[#4A154B] text-white font-bold'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            🐷 Suinocultura (Págs. 21-25)
          </button>
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Pesquisar tópico ou página..."
            className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B]/30"
          />
        </div>
      </div>

      {/* Table of Contents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPages.map((pageInfo) => (
          <div
            key={pageInfo.page}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-[#4A154B]/30 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-purple-100 text-[#4A154B] font-black text-xs flex items-center justify-center">
                  #{pageInfo.page}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 uppercase">
                  {pageInfo.section}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-black text-stone-900 line-clamp-1">
                  {pageInfo.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-snug">
                  {pageInfo.subtitle}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Pontos-chave:
                </span>
                <ul className="space-y-1">
                  {pageInfo.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-stone-700 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                      <span className="line-clamp-1">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">
                Pág. {pageInfo.page} de 25
              </span>
              <a
                href="/assets/aistudio/15396_-_SAN_Manual_Uso_Celtz-Final_b7a104e7.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A154B] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Ver no PDF</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
