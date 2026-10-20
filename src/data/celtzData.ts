export interface CeltzProduct {
  id: string;
  code: string;
  name: string;
  line: string;
  category: 'feed' | 'water';
  form: 'powder' | 'liquid' | 'effervescent';
  route: string;
  color: string;
  badge: string;
  standardDose: string;
  doseUnit: string;
  defaultDoseValue: number; // in g/t or mL/1000L or g/200L
  packaging: string[];
  description: string;
  keyBenefits: string[];
  targetPathogens: string[];
  modesOfAction: string[];
  species: ('avicultura' | 'suinocultura')[];
  recommendedDuration: string;
}

export interface TechnicalArgument {
  id: string;
  species: 'avicultura' | 'suinocultura';
  problem: string;
  solution: string;
  productId: string;
  standardDose: string;
  benefits: string[];
  icon: string;
}

export interface Protocol {
  id: string;
  species: 'avicultura' | 'suinocultura';
  speciesLabel: string;
  category: string; // e.g. "Reprodutora Pesada Frango - Recria"
  stage: string;    // "Recria", "Produção", "Iniciador", "Terminador", "Creche", "Matrizes"
  pillar: 'Desafio Fisiológico' | 'Saúde Intestinal' | 'Controle Sanitário' | 'Terapia de Suporte' | 'Transferência / Desafio Fisiológico';
  pillarType: 'fisiologico' | 'intestinal' | 'sanitario' | 'suporte';
  objective: string;
  suggestedProtocol: string;
  action: string[];
  primaryProductId: string;
  secondaryProductId?: string;
  route: 'Ração' | 'Água de bebida' | 'Ração e Água';
  specificChallenges?: string[];
  punctualUses?: string[];
  recommendedDoseText?: string;
  pageNumber: number;
}

export interface ProductionProblem {
  id: string;
  title: string;
  species: ('avicultura' | 'suinocultura')[];
  category: 'sanitario' | 'fisiologico' | 'estresse' | 'produtivo' | 'nutricional';
  categoryLabel: string;
  description: string;
  symptoms: string[];
  primaryProduct: string;
  secondaryProduct?: string;
  recommendedRoute: string;
  standardDosage: string;
  duration: string;
  technicalRationale: string;
  actionList: string[];
  applicableStages: string[];
}

export const CELTZ_PRODUCTS: CeltzProduct[] = [
  {
    id: 'celtz-gh-pwd',
    code: 'GH PWD',
    name: 'CELTZ GH PWD',
    line: 'Celtz® Gut Health Powder',
    category: 'feed',
    form: 'powder',
    route: 'Via ração (mistura homogênea)',
    color: '#5B1854',
    badge: 'Ração · Contínuo ou Desafio',
    standardDose: '750 g a 1.500 g por tonelada de ração',
    doseUnit: 'g/tonelada',
    defaultDoseValue: 1000,
    packaging: ['Sacos de 25 kg', 'Big bags sob encomenda'],
    description: 'Aditivo modulador da microbiota intestinal em pó de alta dispersão, formulado para reforçar a barreira entérica, equilibrar a flora comensal e suprimir bactérias patogênicas na avicultura e suinocultura.',
    keyBenefits: [
      'Reduz a colonização e excreção de patógenos entéricos (Salmonella, E. coli, Clostridium)',
      'Manutenção da integridade e morfologia intestinal (altura e área dos vilos)',
      'Melhoria no aproveitamento nutricional e na conversão alimentar',
      'Maior resistência da casca de ovos e integridade de carcaça e tripa no abate',
      'Auxílio direto na modulação e fortalecimento da resposta imunológica'
    ],
    targetPathogens: ['Salmonella spp.', 'Escherichia coli', 'Clostridium perfringens', 'Lawsonia intracellularis', 'Brachyspira hyodysenteriae'],
    modesOfAction: [
      'Manutenção da morfologia intestinal e barreira mucosa',
      'Estímulo seletivo à proliferação de microbiota comensal benéfica',
      'Exclusão competitiva e controle de patógenos oportunistas',
      'Modulação da resposta inflamatória entérica'
    ],
    species: ['avicultura', 'suinocultura'],
    recommendedDuration: 'Uso contínuo em todas as fases ou em janelas estratégicas de desafio (12-14 dias).'
  },
  {
    id: 'celtz-gh-lqd',
    code: 'GH LQD',
    name: 'CELTZ GH LQD',
    line: 'Celtz® Gut Health Liquid',
    category: 'water',
    form: 'liquid',
    route: 'Via água de bebida (sistema dosador ou caixa d\'água)',
    color: '#7A1C70',
    badge: 'Água · Ação Rápida & Flexível',
    standardDose: '1 Litro para cada 1.000 Litros de água (1 mL/L)',
    doseUnit: 'L/1.000 L',
    defaultDoseValue: 1,
    packaging: ['Frascos de 1 Litro', 'Bombonas de 5 Litros', 'Bombonas de 20 Litros'],
    description: 'Solução líquida ultra solúvel para fornecimento rápido via água de bebida. Ideal para intervenções pontuais, resposta imediata a desbalanços entéricos e recuperação acelerada de lotes sem depender do consumo de ração.',
    keyBenefits: [
      'Ação de suporte intestinal imediata e independente da ingestão de ração',
      'Restaura a consistência fecal em episódios de fezes aquosas ou com muco',
      'Excelente ferramenta para fases críticas de transição e alojamento/transferência',
      'Facilidade operacional de aplicação e alta solubilidade em dosadores',
      'Recuperação rápida do lote em episódios de enterites inespecíficas'
    ],
    targetPathogens: ['Patógenos entéricos oportunistas', 'Disbioses inespecíficas', 'Enterites bacterianas transitórias'],
    modesOfAction: [
      'Restauração ágil do ambiente entérico e eubiose',
      'Controle rápido de surtos de enterite inespecífica',
      'Modulação da microbiota durante transições de fase e estresse de transferência',
      'Proteção da mucosa contra agentes lesivos'
    ],
    species: ['avicultura', 'suinocultura'],
    recommendedDuration: 'Ciclos de 5 a 7 dias, 7 a 10 dias ou 6 a 14 dias conforme o desafio sanitário.'
  },
  {
    id: 'celtz-ef',
    code: 'EF Solúvel',
    name: 'CELTZ EF',
    line: 'Celtz® Energy & Fortify',
    category: 'water',
    form: 'effervescent',
    route: 'Via água de bebida',
    color: '#D97706',
    badge: 'Efervescente · Aporte Vitamínico & Anti-estresse',
    standardDose: '5 g para cada 200 Litros de água (25 g/1.000 L)',
    doseUnit: 'g/200 L',
    defaultDoseValue: 5,
    packaging: ['Sachês de 100 g', 'Potes de 1 kg'],
    description: 'Complexo hidrossolúvel efervescente de alta biodisponibilidade vitamínica e suporte antioxidante. Indicado para amortecer o estresse de manejos, recebimento de lotes, desmame precoce, debicagem e vacinações.',
    keyBenefits: [
      'Aporte vitamínico imediato em situações de baixo consumo de alimento',
      'Redução comprovada do estresse oxidativo e metabólico decorrente de vacinações e manejos',
      'Estímulo imediato ao consumo de água e manutenção da hidratação',
      'Melhor resposta imunológica pós-vacinal e menor impacto de transições',
      'Excelente palatabilidade e dissolução instantânea sem resíduos na tubulação'
    ],
    targetPathogens: ['Estresse térmico', 'Estresse vacinal', 'Períodos de baixo consumo alimentar', 'Manejos traumáticos'],
    modesOfAction: [
      'Suporte antioxidante celular de ação rápida',
      'Suplementação vitamínica em fases de alta demanda metabólica',
      'Mitigação de catecolaminas e corticoides endógenos provocados por estresse',
      'Favorecimento da rápida adaptação fisiológica'
    ],
    species: ['avicultura', 'suinocultura'],
    recommendedDuration: '3 a 5 dias no desmame, 1 a 7/10 dias no alojamento, ou 7 a 10 dias distribuídos antes, durante e após manejos estressantes.'
  }
];

export const TECHNICAL_ARGUMENTS: TechnicalArgument[] = [
  // Avicultura (página 3)
  {
    id: 'arg-avi-1',
    species: 'avicultura',
    problem: 'Salmonella & Pressão Sanitária',
    solution: 'CELTZ GH PWD (750 g/T de ração)',
    productId: 'celtz-gh-pwd',
    standardDose: '750 g/t',
    benefits: [
      'Reduz a pressão de patógenos',
      'Equilibra a microbiota intestinal',
      'Mais segurança e estabilidade produtiva'
    ],
    icon: 'ShieldAlert'
  },
  {
    id: 'arg-avi-2',
    species: 'avicultura',
    problem: 'Desafios Pontuais & Recuperação de Lote',
    solution: 'CELTZ GH LQD (1 L / 1.000 L água · 7–10 dias)',
    productId: 'celtz-gh-lqd',
    standardDose: '1 L / 1.000 L',
    benefits: [
      'Ação rápida e flexível na água',
      'Suporte intestinal imediato',
      'Recuperação mais rápida do lote'
    ],
    icon: 'Zap'
  },
  {
    id: 'arg-avi-3',
    species: 'avicultura',
    problem: 'Pico de Produção & Qualidade dos Ovos',
    solution: 'CELTZ GH PWD (1.000 g/T de ração)',
    productId: 'celtz-gh-pwd',
    standardDose: '1.000 g/t',
    benefits: [
      'Suporte à alta demanda metabólica da ave',
      'Melhor qualidade de casca e ovos comerciais',
      'Equilíbrio microbiológico persistente'
    ],
    icon: 'Egg'
  },
  {
    id: 'arg-avi-4',
    species: 'avicultura',
    problem: 'Vacinações, Transferências & Estresse de Manejo',
    solution: 'CELTZ EF (5 g / 200 L água · 6–10 dias)',
    productId: 'celtz-ef',
    standardDose: '5 g / 200 L',
    benefits: [
      'Potente suporte antioxidante celular',
      'Melhor recuperação fisiológica do lote',
      'Menor impacto negativo do estresse sobre a produção'
    ],
    icon: 'Syringe'
  },
  // Suinocultura (página 22)
  {
    id: 'arg-sui-1',
    species: 'suinocultura',
    problem: 'Pressão Sanitária, Desafios Pontuais & Recuperação de Lote',
    solution: 'CELTZ GH PWD (1.500 g/T de ração)',
    productId: 'celtz-gh-pwd',
    standardDose: '1.500 g/t',
    benefits: [
      'Reduz a pressão de patógenos entéricos',
      'Equilibra a microbiota do trato digestivo',
      'Controle de desafios específicos (colibacilose, salmonelose)',
      'Melhor adaptação do leitão pela manutenção da estrutura intestinal'
    ],
    icon: 'ShieldCheck'
  },
  {
    id: 'arg-sui-2',
    species: 'suinocultura',
    problem: 'Desafios Pontuais & Recuperação Imediata do Lote',
    solution: 'CELTZ GH LQD (1 L / 1.000 L água · 7–10 dias)',
    productId: 'celtz-gh-lqd',
    standardDose: '1 L / 1.000 L',
    benefits: [
      'Ação rápida e intervenção flexível via hidratação',
      'Suporte intestinal imediato',
      'Recuperação acelerada do lote pós-intervenção'
    ],
    icon: 'Activity'
  },
  {
    id: 'arg-sui-3',
    species: 'suinocultura',
    problem: 'Modulação de Microbiota & Saúde Intestinal Contínua',
    solution: 'CELTZ GH PWD (750 g/T de ração)',
    productId: 'celtz-gh-pwd',
    standardDose: '750 g/t',
    benefits: [
      'Equilíbrio sanitário e imunidade de barreira',
      'Recuperação da microbiota pós-uso de antimicrobianos',
      'Interação sistêmica positiva com o metabolismo do suíno'
    ],
    icon: 'Sparkles'
  },
  {
    id: 'arg-sui-4',
    species: 'suinocultura',
    problem: 'Qualidade do Produto Final & Rendimento de Carcaça',
    solution: 'CELTZ GH PWD (1.000 g/T de ração)',
    productId: 'celtz-gh-pwd',
    standardDose: '1.000 g/t',
    benefits: [
      'Melhor qualidade e aproveitamento de tripa para o frigorífico',
      'Redução da contaminação de carcaça na evisceração',
      'Garantia de segurança alimentar (redução de Salmonella)'
    ],
    icon: 'Award'
  },
  {
    id: 'arg-sui-5',
    species: 'suinocultura',
    problem: 'Desmame & Período de Transição Crítica',
    solution: 'CELTZ EF (5 g / 200 L água · 3–5 dias)',
    productId: 'celtz-ef',
    standardDose: '5 g / 200 L',
    benefits: [
      'Suplementação vitamínica rápida em períodos de baixo consumo de ração',
      'Menor impacto do estresse da separação e mistura de lotes',
      'Estímulo ao consumo de água e atratividade para hidratação'
    ],
    icon: 'Piglet'
  }
];

export const PROTOCOLS_DATABASE: Protocol[] = [
  // Reprodutora Pesada Frango - Recria (página 4)
  {
    id: 'proto-avi-rp-recria-1',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Recria',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Medida suplementar para recebimento das aves alojadas.',
    suggestedProtocol: 'Probiótico via água de bebida (1–7/10 dias de idade) e/ou via ração (ração pré-inicial) + CELTZ EF via água de bebida (1–7/10 dias de idade).',
    action: [
      'Colonização precoce do TGI (trato gastrintestinal)',
      'Suplementação vitamínica em fase crucial'
    ],
    primaryProductId: 'celtz-ef',
    route: 'Água de bebida',
    pageNumber: 4
  },
  {
    id: 'proto-avi-rp-recria-2',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Recria',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Medida suplementar para recebimento das aves alojadas, em situações de desafio conhecido (início de produção, positividade, final de produção...).',
    suggestedProtocol: 'Probiótico via água de bebida (1–7/10 dias de idade) e/ou via ração (ração pré-inicial) + CELTZ GH PWD via ração (ração pré-inicial) + CELTZ EF via água de bebida (1–7/10 dias de idade).',
    action: [
      'Colonização precoce do TGI',
      'Promoção da microbiota comensal',
      'Controle de patógenos oportunistas',
      'Suplementação vitamínica de suporte'
    ],
    primaryProductId: 'celtz-gh-pwd',
    secondaryProductId: 'celtz-ef',
    route: 'Ração e Água',
    pageNumber: 4
  },
  {
    id: 'proto-avi-rp-recria-3',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Recria',
    pillar: 'Saúde Intestinal',
    pillarType: 'intestinal',
    objective: 'Fortalecer a integridade intestinal, equilibrar a microbiota e modular a resposta imune.',
    suggestedProtocol: 'CELTZ GH PWD via ração (todas as rações).',
    action: [
      'Manutenção da morfologia intestinal (vilos e criptas)',
      'Promoção da microbiota comensal benéfica',
      'Auxílio protetor ao sistema imunológico'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 4
  },
  // Reprodutora Pesada Frango - Recria (página 5)
  {
    id: 'proto-avi-rp-recria-4',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Recria',
    pillar: 'Controle Sanitário',
    pillarType: 'sanitario',
    objective: 'Reduzir a pressão de infecção microbiológica em desafios conhecidos.',
    suggestedProtocol: 'Fitogênico via ração (todas as rações ou nas fases de desafio) + CELTZ GH PWD via ração (todas as rações ou nas fases de desafio).',
    action: [
      'Controle eficiente do processo inflamatório entérico',
      'Amplo espectro de ação no controle de patógenos',
      'Manutenção contínua da morfologia intestinal'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 5
  },
  {
    id: 'proto-avi-rp-recria-5',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Recria',
    pillar: 'Terapia de Suporte',
    pillarType: 'suporte',
    objective: 'Auxiliar no controle de desafios inespecíficos.',
    suggestedProtocol: 'CELTZ GH LQD via água de bebida (7 a 10 dias de uso, independentemente da idade).',
    action: [
      'Recuperação da qualidade e consistência de fezes (elimina água, muco, descamação)',
      'Manejo de enterites inespecíficas',
      'Atenuação de sinais clínicos não patognomônicos'
    ],
    specificChallenges: ['Qualidade de fezes (água, muco, descamação)', 'Enterites inespecíficas', 'Sinais clínicos não patognomônicos'],
    primaryProductId: 'celtz-gh-lqd',
    route: 'Água de bebida',
    pageNumber: 5
  },
  {
    id: 'proto-avi-rp-recria-6',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Recria',
    pillar: 'Terapia de Suporte',
    pillarType: 'suporte',
    objective: 'Aporte vitamínico para conter estresse de manejo.',
    suggestedProtocol: 'CELTZ EF via água de bebida (7 a 10 dias de uso, independentemente da idade). Distribuir os dias de fornecimento antes, durante e depois dos manejos estressantes.',
    action: [
      'Aporte vitamínico rápido',
      'Ação antioxidante contra estresse oxidativo',
      'Aceleração da recuperação das aves'
    ],
    punctualUses: ['Vacinação', 'Seleção / Pesagens', 'Debicagem'],
    primaryProductId: 'celtz-ef',
    route: 'Água de bebida',
    pageNumber: 5
  },

  // Reprodutora Pesada Frango - Produção (páginas 6 e 7)
  {
    id: 'proto-avi-rp-prod-1',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Produção',
    pillar: 'Transferência / Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Medida suplementar para recebimento das aves transferidas.',
    suggestedProtocol: 'Probiótico via água de bebida (1–5 dias pós-transferência) + CELTZ GH LQD via água de bebida (6–14 dias pós-transferência).',
    action: [
      'Manutenção da diversidade da microbiota',
      'Promoção da microbiota comensal benéfica',
      'Controle efetivo de patógenos oportunistas durante a transição'
    ],
    primaryProductId: 'celtz-gh-lqd',
    route: 'Água de bebida',
    pageNumber: 6
  },
  {
    id: 'proto-avi-rp-prod-2',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Produção',
    pillar: 'Saúde Intestinal',
    pillarType: 'intestinal',
    objective: 'Fortalecer a integridade intestinal, equilibrar a microbiota e modular a resposta imune.',
    suggestedProtocol: 'CELTZ GH PWD via ração (todas as rações).',
    action: [
      'Manutenção da integridade morfológica intestinal',
      'Promoção de eubiose e flora favorável',
      'Auxílio sustentado ao sistema imunológico'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 6
  },
  {
    id: 'proto-avi-rp-prod-3',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Produção',
    pillar: 'Controle Sanitário',
    pillarType: 'sanitario',
    objective: 'Reduzir a pressão de infecção microbiológica em desafios conhecidos.',
    suggestedProtocol: 'Fitogênico via ração (todas as rações ou nas fases de desafio) + CELTZ GH PWD via ração (todas as rações ou nas fases de desafio).',
    action: [
      'Controle do processo inflamatório entérico',
      'Amplo espectro de ação antimicrobiana natural',
      'Manutenção da morfologia dos enterócitos'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 6
  },
  {
    id: 'proto-avi-rp-prod-4',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Produção',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suportar a fase de alta demanda metabólica e a janela imunológica relacionadas ao pico de produção.',
    suggestedProtocol: 'CELTZ GH PWD via ração (rações de pré-postura e postura I).',
    action: [
      'Incrementar disponibilidade energética para produção',
      'Controle de patógenos oportunistas',
      'Suporte vital à janela imunológica do pico'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 7
  },
  {
    id: 'proto-avi-rp-prod-5',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Produção',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suportar a qualidade da casca dos ovos e a janela imunológica.',
    suggestedProtocol: 'CELTZ GH PWD via ração (rações postura II e postura III).',
    action: [
      'Sustentação da resistência e qualidade da casca',
      'Controle de bactérias entéricas oportunistas',
      'Suporte contínuo à janela imunológica'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 7
  },
  {
    id: 'proto-avi-rp-prod-6',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Frango',
    stage: 'Produção',
    pillar: 'Terapia de Suporte',
    pillarType: 'suporte',
    objective: 'Aporte vitamínico para eventos de estresse em produção.',
    suggestedProtocol: 'CELTZ EF via água de bebida (7 a 10 dias de uso, independentemente da idade). Distribuir os dias de fornecimento antes, durante e depois dos manejos estressantes.',
    action: [
      'Combate ao estresse de intervenções',
      'Aporte vitamínico completo',
      'Minimização da queda de postura'
    ],
    punctualUses: ['Vacinação', 'Pesagens', 'Spiking', 'Jejum pré-abate'],
    primaryProductId: 'celtz-ef',
    route: 'Água de bebida',
    pageNumber: 7
  },

  // Frango de Corte (página 8)
  {
    id: 'proto-avi-fc-1',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Frango de Corte',
    stage: 'Início & Crescimento',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suportar o atendimento do fator de ganho de peso (7 e 14 dias).',
    suggestedProtocol: 'Probiótico via água de bebida (1–4 dias de idade) + CELTZ GH LQD via água de bebida (5–14 dias de idade).',
    action: [
      'Colonização precoce do TGI',
      'Promoção da microbiota comensal benéfica',
      'Controle de patógenos oportunistas',
      'Melhor arranque inicial do lote e ganho de peso aos 7 e 14 dias'
    ],
    primaryProductId: 'celtz-gh-lqd',
    route: 'Água de bebida',
    pageNumber: 8
  },
  {
    id: 'proto-avi-fc-2',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Frango de Corte',
    stage: 'Todas as fases',
    pillar: 'Saúde Intestinal',
    pillarType: 'intestinal',
    objective: 'Fortalecer a integridade intestinal, equilibrar a microbiota e modular a resposta imune.',
    suggestedProtocol: 'CELTZ GH PWD via ração (todas as rações).',
    action: [
      'Manutenção da morfologia dos enterócitos e vilosidades',
      'Promoção sustentada da microbiota comensal',
      'Auxílio ao sistema imunológico da ave'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 8
  },
  {
    id: 'proto-avi-fc-3',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Frango de Corte',
    stage: 'Fases Iniciais e Crescimento',
    pillar: 'Controle Sanitário',
    pillarType: 'sanitario',
    objective: 'Reduzir a pressão de infecção microbiológica em desafios conhecidos.',
    suggestedProtocol: 'Fitogênico via ração (todas as rações) + CELTZ GH PWD via ração (rações pré-inicial, inicial e crescimento).',
    action: [
      'Controle do processo inflamatório subclínico',
      'Amplo espectro de ação no controle de patógenos (SH - Salmonella spp.)',
      'Manutenção da morfologia intestinal e taxa de absorção de nutrientes'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 8
  },
  {
    id: 'proto-avi-fc-4',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Frango de Corte',
    stage: 'Desafios Pontuais',
    pillar: 'Terapia de Suporte',
    pillarType: 'suporte',
    objective: 'Auxiliar no controle de desafios inespecíficos.',
    suggestedProtocol: 'CELTZ GH LQD via água de bebida (5 a 7 dias de uso, independentemente da idade).',
    action: [
      'Correção de fezes líquidas, mucosas e com descamação',
      'Controle de enterites inespecíficas',
      'Recuperação de lotes com uniformidade comprometida'
    ],
    specificChallenges: ['Qualidade de fezes (água, muco, descamação)', 'Enterites inespecíficas', 'Sinais clínicos não patognomônicos'],
    primaryProductId: 'celtz-gh-lqd',
    route: 'Água de bebida',
    pageNumber: 8
  },
  {
    id: 'proto-avi-fc-5',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Frango de Corte',
    stage: 'Estresse & Manejos',
    pillar: 'Terapia de Suporte',
    pillarType: 'suporte',
    objective: 'Aporte vitamínico para desafios e manejos de frango de corte.',
    suggestedProtocol: 'CELTZ EF via água de bebida (7 a 10 dias de uso, independentemente da idade). Distribuir os dias de fornecimento antes, durante e depois dos manejos estressantes.',
    action: [
      'Proteção contra estresse térmico severo',
      'Aporte vitamínico de emergência em falta de ração',
      'Suporte pré-abate para redução de perdas por desidratação'
    ],
    punctualUses: ['Vacinação', 'Falta de ração', 'Estresse térmico', 'Jejum pré-abate'],
    primaryProductId: 'celtz-ef',
    route: 'Água de bebida',
    pageNumber: 8
  },

  // Reprodutora Pesada Peru - Recria & Produção (páginas 9 a 12)
  {
    id: 'proto-avi-peru-recria-1',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Peru',
    stage: 'Recria',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Medida suplementar para recebimento das aves alojadas.',
    suggestedProtocol: 'Probiótico via água de bebida (1–7/10 dias de idade) e/ou via ração (ração pré-inicial) + CELTZ EF via água de bebida (1–7/10 dias de idade).',
    action: [
      'Colonização precoce do TGI',
      'Suplementação vitamínica e hidratação'
    ],
    primaryProductId: 'celtz-ef',
    route: 'Água de bebida',
    pageNumber: 9
  },
  {
    id: 'proto-avi-peru-recria-2',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Peru',
    stage: 'Recria',
    pillar: 'Saúde Intestinal',
    pillarType: 'intestinal',
    objective: 'Fortalecer a integridade intestinal, equilibrar a microbiota e modular a resposta imune.',
    suggestedProtocol: 'CELTZ GH PWD via ração (todas as rações).',
    action: [
      'Manutenção da integridade morfológica',
      'Estímulo de microbiota comensal benéfica',
      'Auxílio imunológico'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 9
  },
  {
    id: 'proto-avi-peru-prod-1',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Reprodutora Pesada Peru',
    stage: 'Produção',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suportar a fase de alta demanda metabólica e a janela imunológica relacionadas ao pico de produção.',
    suggestedProtocol: 'CELTZ GH PWD via ração (rações pré-postura e postura I).',
    action: [
      'Incrementar disponibilidade energética',
      'Controle de patógenos oportunistas',
      'Suporte à janela imunológica'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 12
  },

  // Peru de Corte - Iniciador e Terminador (páginas 13 e 14)
  {
    id: 'proto-avi-peru-corte-ini',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Peru de Corte',
    stage: 'Iniciador',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Medida suplementar para recebimento das aves alojadas.',
    suggestedProtocol: 'Probiótico via água de bebida (1–4 dias de idade) + CELTZ GH LQD via água de bebida (5–14 dias de idade).',
    action: [
      'Colonização precoce do TGI',
      'Promoção da microbiota comensal',
      'Controle de patógenos oportunistas',
      'Melhor arranque e uniformidade inicial do lote'
    ],
    primaryProductId: 'celtz-gh-lqd',
    route: 'Água de bebida',
    pageNumber: 13
  },
  {
    id: 'proto-avi-peru-corte-term',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Peru de Corte',
    stage: 'Terminador',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Medida suplementar para recebimento das aves transferidas.',
    suggestedProtocol: 'Probiótico via água de bebida (1–4 dias de idade) + CELTZ GH LQD via água de bebida (5–14 dias de idade).',
    action: [
      'Manutenção da diversidade da microbiota',
      'Promoção da microbiota comensal benéfica',
      'Controle de patógenos oportunistas'
    ],
    primaryProductId: 'celtz-gh-lqd',
    route: 'Água de bebida',
    pageNumber: 14
  },

  // Poedeira Comercial Gaiola e Piso (páginas 15 a 20)
  {
    id: 'proto-avi-poed-gaiola-recria',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Poedeira Comercial (Gaiola)',
    stage: 'Recria',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Medida suplementar para recebimento das aves alojadas.',
    suggestedProtocol: 'Probiótico via água de bebida (1–7/10 dias de idade) + CELTZ EF via água de bebida (1–7/10 dias de idade).',
    action: [
      'Colonização precoce do TGI',
      'Suplementação vitamínica instantânea'
    ],
    primaryProductId: 'celtz-ef',
    route: 'Água de bebida',
    pageNumber: 15
  },
  {
    id: 'proto-avi-poed-pico',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Poedeira Comercial (Gaiola & Piso)',
    stage: 'Produção',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suportar a fase de alta demanda metabólica e a janela imunológica relacionadas ao pico de produção.',
    suggestedProtocol: 'CELTZ GH PWD via ração (rações pré-pico, pico e pós-pico fase I).',
    action: [
      'Incrementar a disponibilidade energética para postura máxima',
      'Controle preventivo de patógenos entéricos',
      'Proteção contra a queda de imunidade pós-pico'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 16
  },
  {
    id: 'proto-avi-poed-casca',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Poedeira Comercial (Gaiola & Piso)',
    stage: 'Produção',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suportar a qualidade de casca dos ovos e a janela imunológica.',
    suggestedProtocol: 'CELTZ GH PWD via ração (rações pós-pico fase II, fase III e fase IV).',
    action: [
      'Sustentação da resistência e integridade da casca',
      'Redução do índice de ovos trincados e desclassificados',
      'Controle contínuo de patógenos oportunistas'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 17
  },
  {
    id: 'proto-avi-poed-restricao',
    species: 'avicultura',
    speciesLabel: 'Avicultura',
    category: 'Poedeira Comercial (Gaiola & Piso)',
    stage: 'Produção',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suportar a fase de restrição nutricional e a janela imunológica, auxiliando na manutenção da integridade intestinal.',
    suggestedProtocol: 'CELTZ GH PWD via ração (rações pós-pico fase III e IV) + CELTZ EF via água de bebida (após o retorno dos níveis nutricionais da dieta).',
    action: [
      'Manutenção da morfologia intestinal e taxa absortiva',
      'Controle de patógenos oportunistas',
      'Suporte à janela imunológica e aporte vitamínico'
    ],
    primaryProductId: 'celtz-gh-pwd',
    secondaryProductId: 'celtz-ef',
    route: 'Ração e Água',
    pageNumber: 17
  },

  // SUINOCULTURA: Fase de Creche (página 23)
  {
    id: 'proto-sui-creche-1',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Fase de Creche',
    stage: 'Desmame',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suporte para adaptação de leitões desmamados.',
    suggestedProtocol: 'CELTZ EF via água de bebida (1–5 dias).',
    action: [
      'Suplementação vitamínica em um período crítico de baixo consumo de ração e alta demanda metabólica',
      'Estímulo ao consumo de água e à manutenção da hidratação'
    ],
    primaryProductId: 'celtz-ef',
    route: 'Água de bebida',
    pageNumber: 23
  },
  {
    id: 'proto-sui-creche-2',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Fase de Creche',
    stage: 'Desmame sob Desafio',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suporte no desmame de leitões em situações de desafio sanitário entérico (E. coli e Salmonella).',
    suggestedProtocol: 'CELTZ GH LQD via água de bebida (7–10 dias) + CELTZ GH PWD via ração (rações iniciais).',
    action: [
      'Controle efetivo de patógenos entéricos de alta importância (E. coli e Salmonella)',
      'Promoção rápida da microbiota comensal protetora'
    ],
    primaryProductId: 'celtz-gh-lqd',
    secondaryProductId: 'celtz-gh-pwd',
    route: 'Ração e Água',
    pageNumber: 23
  },
  {
    id: 'proto-sui-creche-3',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Fase de Creche',
    stage: 'Creche Geral',
    pillar: 'Saúde Intestinal',
    pillarType: 'intestinal',
    objective: 'Fortalecer a integridade intestinal, equilibrar a microbiota e modular a resposta imune.',
    suggestedProtocol: 'CELTZ GH PWD via ração (todas as rações).',
    action: [
      'Manutenção da morfologia dos vilos intestinais contra atrofia de desmame',
      'Promoção da microbiota comensal benéfica',
      'Auxílio ao sistema imunológico local e sistêmico'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 23
  },

  // SUINOCULTURA: Fase de Terminação (página 24)
  {
    id: 'proto-sui-term-1',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Fase de Terminação',
    stage: 'Pós-Antibiótico',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suporte para a recuperação da microbiota após tratamento com antibioticoterapia de amplo espectro.',
    suggestedProtocol: 'CELTZ GH PWD via ração durante o período de janelas entre os pulsos de antibioticoterapia.',
    action: [
      'Recuperação da microbiota eudérmica/entérica',
      'Melhoria acelerada da diversidade bacteriana benéfica'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 24
  },
  {
    id: 'proto-sui-term-2',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Fase de Terminação',
    stage: 'Controle Sanitário Entérico',
    pillar: 'Controle Sanitário',
    pillarType: 'sanitario',
    objective: 'Suporte no controle de patógenos entéricos de importância na fase de terminação (Bh - Brachyspira hyodysenteriae e LI - Lawsonia intracellularis).',
    suggestedProtocol: 'CELTZ GH LQD via água em períodos intervalados de 7 a 10 dias OU CELTZ GH PWD via ração em períodos intervalados de 12 a 14 dias.',
    action: [
      'Controle de patógenos importantes (Bh / LI / Cp - Clostridium perfringens)',
      'Atuação na modulação da microbiota, buscando condição de eubiose',
      'Manutenção da integridade da morfologia intestinal'
    ],
    primaryProductId: 'celtz-gh-pwd',
    secondaryProductId: 'celtz-gh-lqd',
    route: 'Ração e Água',
    pageNumber: 24
  },
  {
    id: 'proto-sui-term-3',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Fase de Terminação',
    stage: 'Terminação & Frigorífico',
    pillar: 'Saúde Intestinal',
    pillarType: 'intestinal',
    objective: 'Fortalecer a integridade intestinal, equilibrar a microbiota e modular a resposta imunológica.',
    suggestedProtocol: 'CELTZ GH PWD via ração (todas as rações).',
    action: [
      'Manutenção da morfologia intestinal de alta integridade',
      'Promoção da microbiota comensal',
      'Auxílio protetor ao sistema imunológico',
      'Melhoria da qualidade e resistência de tripa para o frigorífico'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 24
  },

  // SUINOCULTURA: Matrizes (página 25)
  {
    id: 'proto-sui-matriz-1',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Matrizes Suínas',
    stage: 'Leitoas',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suporte para o recebimento e adaptação das leitoas na granja (desafio fisiológico / sanitário).',
    suggestedProtocol: 'CELTZ GH PWD via ração.',
    action: [
      'Auxiliar no controle de patógenos primários',
      'Manutenção da diversidade da microbiota',
      'Promoção da microbiota benéfica'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 25
  },
  {
    id: 'proto-sui-matriz-2',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Matrizes Suínas',
    stage: 'Matrizes Gestantes',
    pillar: 'Saúde Intestinal',
    pillarType: 'intestinal',
    objective: 'Fortalecer a integridade intestinal, equilibrar a microbiota e modular a resposta imunológica.',
    suggestedProtocol: 'CELTZ GH PWD via ração (toda a fase de gestação).',
    action: [
      'Manutenção da integridade morfológica intestinal da matriz',
      'Promoção da microbiota benéfica',
      'Auxílio ao sistema imunológico',
      'Melhoria substancial na qualidade do colostro para a leitegada'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 25
  },
  {
    id: 'proto-sui-matriz-3',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Matrizes Suínas',
    stage: 'Matriz Pré-Parto',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Otimização da demanda metabólica da microbiota durante o período pré-parto, suporte no estresse e condição da matriz.',
    suggestedProtocol: 'CELTZ GH PWD via ração (ração pré-parto).',
    action: [
      'Controle de patógenos oportunistas',
      'Otimização da microbiota intestinal',
      'Suporte preventivo à janela imunológica',
      'Melhoria comprovada da qualidade do colostro'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 25
  },
  {
    id: 'proto-sui-matriz-4',
    species: 'suinocultura',
    speciesLabel: 'Suinocultura',
    category: 'Matrizes Suínas',
    stage: 'Matriz Lactação',
    pillar: 'Desafio Fisiológico',
    pillarType: 'fisiologico',
    objective: 'Suportar a fase de altíssima demanda metabólica da lactação.',
    suggestedProtocol: 'CELTZ GH PWD via ração (ração lactação).',
    action: [
      'Controle de patógenos oportunistas',
      'Redução do catabolismo severo durante a lactação',
      'Melhoria do volume e qualidade nutricional do leite para os leitões'
    ],
    primaryProductId: 'celtz-gh-pwd',
    route: 'Ração',
    pageNumber: 25
  }
];

export const PRODUCTION_PROBLEMS: ProductionProblem[] = [
  {
    id: 'prob-salmonella',
    title: 'Salmonella & Alta Pressão Sanitária',
    species: ['avicultura', 'suinocultura'],
    category: 'sanitario',
    categoryLabel: 'Controle Sanitário',
    description: 'Pressão bacteriana por patógenos de importância sanitária e segurança dos alimentos (Salmonella spp., E. coli), com risco de condenação e contaminação cruzada.',
    symptoms: [
      'Positividade em monitorias microbiológicas de fezes e ambiente',
      'Queda subclínica de desempenho e uniformidade',
      'Risco de contaminação cruzada no frigorífico / abatedouro'
    ],
    primaryProduct: 'celtz-gh-pwd',
    secondaryProduct: 'celtz-gh-lqd',
    recommendedRoute: 'Ração contínua ou Água em surtos',
    standardDosage: 'Avicultura: 750 g/T | Suinocultura: 1.500 g/T (ou 1 L/1.000 L de água por 7–10 dias)',
    duration: 'Uso profilático contínuo na ração ou 7 a 10 dias via água.',
    technicalRationale: 'O CELTZ GH atua fortalecendo a barreira intestinal, modulando a microbiota benéfica e exercendo controle direto sobre a proliferação e colonização de Salmonella.',
    actionList: [
      'Reduz significativamente a pressão de patógenos no trato digestivo',
      'Equilibra a microbiota comensal benéfica',
      'Mais segurança e tranquilidade produtiva'
    ],
    applicableStages: ['Frango de Corte', 'Reprodutoras', 'Poedeiras', 'Creche', 'Terminação']
  },
  {
    id: 'prob-fezes-liquidas',
    title: 'Fezes Aquosas, Muco & Enterites Inespecíficas',
    species: ['avicultura', 'suinocultura'],
    category: 'sanitario',
    categoryLabel: 'Saúde Intestinal',
    description: 'Episódios agudos de consistência fecal anormal, camas úmidas, presença de muco e descamação do epitélio entérico por disbiose transitória.',
    symptoms: [
      'Cama úmida e fezes com excesso de água ou muco',
      'Sinais clínicos não patognomônicos de desconforto entérico',
      'Queda de absorção de ração e fezes mal digeridas'
    ],
    primaryProduct: 'celtz-gh-lqd',
    recommendedRoute: 'Via água de bebida',
    standardDosage: '1 L para cada 1.000 Litros de água (1 mL/L)',
    duration: '5 a 7 dias (corte/perus) ou 7 a 10 dias (reprodutoras/suínos)',
    technicalRationale: 'Apresenta ação rápida e flexível através da água de bebida, garantindo suporte intestinal imediato mesmo quando a ave ou suíno reduz o consumo de ração.',
    actionList: [
      'Ação rápida e flexível na água de bebida',
      'Suporte intestinal imediato aos enterócitos lesados',
      'Recuperação rápida e restabelecimento da uniformidade do lote'
    ],
    applicableStages: ['Frango de Corte', 'Reprodutoras', 'Poedeiras', 'Perus', 'Creche', 'Terminação']
  },
  {
    id: 'prob-estresse-manejos',
    title: 'Estresse de Vacinação, Debicagem & Pesagens',
    species: ['avicultura', 'suinocultura'],
    category: 'estresse',
    categoryLabel: 'Manejo & Estresse',
    description: 'Estresse agudo decorrente de intervenções de manejo, vacinações de campo, transferências de galpão, debicagem e pesagens de rotina.',
    symptoms: [
      'Apatia transitória pós-vacinal ou pós-manejo',
      'Redução brusca e passageira no consumo de água e ração',
      'Elevação de radicais livres e estresse oxidativo celular'
    ],
    primaryProduct: 'celtz-ef',
    recommendedRoute: 'Via água de bebida',
    standardDosage: '5 g para cada 200 Litros de água (25 g/1.000 L)',
    duration: '6 a 10 dias (avicultura) ou 3 a 5 dias (suínos no desmame), distribuídos antes, durante e após os manejos.',
    technicalRationale: 'O CELTZ EF fornece suporte antioxidante celular de alta biodisponibilidade e aporte vitamínico para neutralizar o impacto metabólico do estresse.',
    actionList: [
      'Potente suporte antioxidante celular',
      'Rápida recuperação pós-vacinal e pós-manejo',
      'Menor impacto do estresse no ganho de peso e uniformidade'
    ],
    applicableStages: ['Recria', 'Frango de Corte', 'Poedeiras', 'Creche Suína', 'Perus']
  },
  {
    id: 'prob-pico-postura',
    title: 'Alta Demanda Metabólica no Pico de Produção',
    species: ['avicultura'],
    category: 'produtivo',
    categoryLabel: 'Performance Produtiva',
    description: 'Janela crítica de pico de postura e produção de ovos, onde a demanda energética e a suscetibilidade imunológica atingem seu ápice.',
    symptoms: [
      'Dificuldade em manter a curva esperada de postura',
      'Oscilação na janela imunológica com risco de quedas pós-pico',
      'Desgaste nutricional precoce das matrizes ou poedeiras'
    ],
    primaryProduct: 'celtz-gh-pwd',
    recommendedRoute: 'Via ração',
    standardDosage: '1.000 g/T de ração (pré-postura, pico e postura I)',
    duration: 'Fase de pré-pico até consolidação da postura I.',
    technicalRationale: 'Aumenta a disponibilidade energética funcional através da melhoria da morfologia de absorção intestinal e modula a imunidade de barreira.',
    actionList: [
      'Suporte essencial à elevada demanda metabólica',
      'Sustentação do pico de produção por período mais longo',
      'Equilíbrio microbiológico que protege a janela imunológica'
    ],
    applicableStages: ['Reprodutora Pesada Produção', 'Poedeira Comercial Gaiola', 'Poedeira Comercial Piso']
  },
  {
    id: 'prob-qualidade-casca',
    title: 'Fragilidade de Casca & Qualidade de Ovos Comerciais',
    species: ['avicultura'],
    category: 'produtivo',
    categoryLabel: 'Qualidade de Produto',
    description: 'Queda na espessura, firmeza e textura da casca, aumento de ovos trincados, quebrados ou sujos em lotes com mais de 45-50 semanas de vida.',
    symptoms: [
      'Aumento do percentual de ovos trincados na coleta',
      'Casca fina ou quebradiça no manuseio',
      'Presença de ovos sujos por desequilíbrio na consistência fecal'
    ],
    primaryProduct: 'celtz-gh-pwd',
    secondaryProduct: 'celtz-ef',
    recommendedRoute: 'Via ração (e suporte EF em água)',
    standardDosage: '1.000 g/T nas rações Postura II e III (mais CELTZ EF após restrições)',
    duration: 'Contínuo em fases pós-pico avançadas.',
    technicalRationale: 'Garante eficiência máxima de absorção intestinal de minerais e cálcio pelos enterócitos saudáveis, fortalecendo a matriz cristalina da casca.',
    actionList: [
      'Sustentação contínua da rigidez e integridade da casca',
      'Redução comprovada de descartes e perdas econômicas',
      'Controle de patógenos e melhora na microbiota'
    ],
    applicableStages: ['Poedeiras Comerciais', 'Reprodutoras Pesadas']
  },
  {
    id: 'prob-arranque-corte',
    title: 'Arranque Inicial & Ganho de Peso aos 7 e 14 Dias',
    species: ['avicultura'],
    category: 'fisiologico',
    categoryLabel: 'Desenvolvimento Inicial',
    description: 'Necessidade de maximizar o ganho de peso inicial do pintinho de corte, acelerando a maturidade intestinal nos primeiros 14 dias de vida.',
    symptoms: [
      'Arranque lento do lote no primeiro alojamento',
      'Heterogeneidade de peso corporal nos primeiros 7 dias',
      'Dificuldade de atingir a meta zootécnica de 7 e 14 dias'
    ],
    primaryProduct: 'celtz-gh-lqd',
    secondaryProduct: 'celtz-gh-pwd',
    recommendedRoute: 'Água de bebida (com probiótico) + Ração inicial',
    standardDosage: 'Probiótico (1–4d) + CELTZ GH LQD (5–14 dias via água 1 L/1.000 L) + CELTZ GH PWD na ração',
    duration: 'Primeiros 14 dias de alojamento do lote.',
    technicalRationale: 'A colonização precoce associada à ação do CELTZ GH acelera a taxa de multiplicação celular dos enterócitos e o desenvolvimento das criptas.',
    actionList: [
      'Colonização precoce do TGI por cepas eudérmicas',
      'Promoção rápida da microbiota comensal benéfica',
      'Melhor aproveitamento de nutrientes e arranque de lote imbatível'
    ],
    applicableStages: ['Frango de Corte', 'Peru de Corte Iniciador']
  },
  {
    id: 'prob-desmame-leitoes',
    title: 'Desmame Crítico & Adaptação de Leitões na Creche',
    species: ['suinocultura'],
    category: 'fisiologico',
    categoryLabel: 'Transição & Desmame',
    description: 'Período imediato após o desmame em que os leitões sofrem estresse de separação, mudança de dieta líquida para sólida e queda de ingestão.',
    symptoms: [
      'Queda severa no consumo de ração nas primeiras 48-72 horas pós-desmame',
      'Risco de atrofia das vilosidades intestinais por jejum',
      'Desidratação e perda de peso inicial'
    ],
    primaryProduct: 'celtz-ef',
    secondaryProduct: 'celtz-gh-lqd',
    recommendedRoute: 'Via água de bebida',
    standardDosage: '5 g para cada 200 Litros de água (25 g/1.000 L) por 3 a 5 dias',
    duration: 'Primeiros 1 a 5 dias após o desmame.',
    technicalRationale: 'Estimula ativamente o consumo voluntário de água e mantém a hidratação e o aporte de micronutrientes essenciais enquanto a ingestão de ração não se normaliza.',
    actionList: [
      'Suplementação vitamínica em período de baixo consumo de ração',
      'Estímulo ao consumo de água pela alta atratividade e solubilidade',
      'Redução do choque de desmame e da agressão metabólica'
    ],
    applicableStages: ['Fase de Creche - Leitões Desmamados']
  },
  {
    id: 'prob-patogenos-terminacao',
    title: 'Desafios Entéricos na Terminação (Bh, LI & Clostridium)',
    species: ['suinocultura'],
    category: 'sanitario',
    categoryLabel: 'Controle Sanitário',
    description: 'Ocorrência de patógenos entéricos como Brachyspira hyodysenteriae (disenteria suína), Lawsonia intracellularis (ileíte) e Clostridium perfringens em suínos de engorda.',
    symptoms: [
      'Fezes com aspecto mucoso, escuro ou sanguinolento (disenteria/ileíte)',
      'Atraso acentuado de ganho de peso no terço final da engorda',
      'Piora na conversão alimentar e aumento de lotes refugos'
    ],
    primaryProduct: 'celtz-gh-pwd',
    secondaryProduct: 'celtz-gh-lqd',
    recommendedRoute: 'Ração em pulsos intervalados OU Água intervalada',
    standardDosage: 'CELTZ GH PWD 1.000 a 1.500 g/t em intervalos de 12–14 dias OU CELTZ GH LQD (1 L/1.000 L) por 7–10 dias',
    duration: 'Pulsos estratégicos durante a fase de crescimento e terminação.',
    technicalRationale: 'A combinação de ativos do CELTZ GH atua na membrana dos patógenos entéricos, mantendo a eubiose e suprimindo Lawsonia e Brachyspira.',
    actionList: [
      'Controle efetivo dos patógenos mais onerosos da terminação',
      'Atuação na modulação da microbiota buscando condição de eubiose',
      'Melhoria da qualidade de tripa para o processamento industrial'
    ],
    applicableStages: ['Fase de Terminação Suína']
  },
  {
    id: 'prob-recuperacao-pos-antibiotico',
    title: 'Recuperação de Microbiota Pós-Antibioticoterapia',
    species: ['suinocultura'],
    category: 'sanitario',
    categoryLabel: 'Recuperação de Flora',
    description: 'Esgotamento da microbiota e destruição da flora comensal protetora após tratamentos curativos com antibióticos de amplo espectro.',
    symptoms: [
      'Janela de vulnerabilidade com recolonização por patógenos secundários',
      'Instabilidade entérica após cessar os medicamentos',
      'Atraso na recuperação do apetite e digestibilidade'
    ],
    primaryProduct: 'celtz-gh-pwd',
    recommendedRoute: 'Via ração nas janelas entre pulsos',
    standardDosage: '750 g a 1.000 g/T de ração',
    duration: 'Durante todo o intervalo entre os ciclos de antibióticos.',
    technicalRationale: 'Promove a regeneração seletiva de microrganismos produtores de ácidos graxos de cadeia curta e reconstitui a barreira epitelial.',
    actionList: [
      'Rápida restauração da eubiose intestinal',
      'Aumento da diversidade da microbiota comensal benéfica',
      'Prevenção de recidivas de patógenos resistentes'
    ],
    applicableStages: ['Fase de Terminação', 'Creche', 'Matrizes']
  },
  {
    id: 'prob-matrizes-colostro',
    title: 'Imunidade Neonatal, Colostro & Desgaste de Lactação',
    species: ['suinocultura'],
    category: 'produtivo',
    categoryLabel: 'Reprodução & Matrizes',
    description: 'Necessidade de maximizar o teor imunológico de imunoglobulinas no colostro da porca e atenuar o catabolismo corporal severo durante a lactação.',
    symptoms: [
      'Mortalidade pré-desmame por colostro com baixa concentração de anticorpos',
      'Leitoas com dificuldade de adaptação à granja',
      'Perda de condição corporal excessiva na porca lactante'
    ],
    primaryProduct: 'celtz-gh-pwd',
    recommendedRoute: 'Via ração (Gestação, Pré-parto e Lactação)',
    standardDosage: '750 a 1.000 g/T continuamente nas rações gestação, pré-parto e lactação',
    duration: 'Todo o ciclo reprodutivo da matriz.',
    technicalRationale: 'O equilíbrio da microbiota da matriz regula a translocação de metabólitos imunoprotetores para as glândulas mamárias, enriquecendo o colostro.',
    actionList: [
      'Melhoria comprovada na densidade imunológica do colostro',
      'Redução do desgaste e do catabolismo severo na lactação',
      'Aumento na qualidade e volume de leite produzido'
    ],
    applicableStages: ['Leitoas', 'Matrizes Gestantes', 'Matrizes Pré-Parto', 'Matrizes em Lactação']
  }
];

export interface DoseCalculationResult {
  product: CeltzProduct;
  doseRateString: string;
  totalProductNeeded: number; // in kg or L or g
  unit: 'kg' | 'L' | 'g';
  commercialPackagesNeeded: string;
  dailyRequirement: number;
  dailyUnit: 'kg/dia' | 'L/dia' | 'g/dia';
  costEstimationHelp?: string;
  totalWaterOrFeed: number;
  waterOrFeedUnit: 'toneladas de ração' | 'litros de água';
}
