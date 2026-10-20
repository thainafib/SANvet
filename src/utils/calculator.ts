export interface AnimalPreset {
  id: string;
  name: string;
  species: 'avicultura' | 'suinocultura';
  defaultCount: number;
  dailyFeedGramsPerAnimal: number;
  dailyWaterLitersPerAnimal: number;
  defaultDays: number;
}

export const ANIMAL_PRESETS: AnimalPreset[] = [
  {
    id: 'frango-corte-medio',
    name: 'Frango de Corte (Galpão Padrão)',
    species: 'avicultura',
    defaultCount: 30000,
    dailyFeedGramsPerAnimal: 110,
    dailyWaterLitersPerAnimal: 0.22,
    defaultDays: 7
  },
  {
    id: 'frango-corte-inicial',
    name: 'Frango de Corte (Fase Inicial 1-14 dias)',
    species: 'avicultura',
    defaultCount: 30000,
    dailyFeedGramsPerAnimal: 35,
    dailyWaterLitersPerAnimal: 0.08,
    defaultDays: 10
  },
  {
    id: 'poedeira-comercial',
    name: 'Poedeiras Comerciais em Produção',
    species: 'avicultura',
    defaultCount: 50000,
    dailyFeedGramsPerAnimal: 115,
    dailyWaterLitersPerAnimal: 0.23,
    defaultDays: 14
  },
  {
    id: 'reprodutora-pesada',
    name: 'Reprodutora Pesada (Matriz Frango)',
    species: 'avicultura',
    defaultCount: 10000,
    dailyFeedGramsPerAnimal: 155,
    dailyWaterLitersPerAnimal: 0.32,
    defaultDays: 7
  },
  {
    id: 'peru-corte',
    name: 'Peru de Corte (Engorda)',
    species: 'avicultura',
    defaultCount: 12000,
    dailyFeedGramsPerAnimal: 240,
    dailyWaterLitersPerAnimal: 0.50,
    defaultDays: 7
  },
  {
    id: 'suino-creche',
    name: 'Suinocultura - Fase de Creche (Leitões)',
    species: 'suinocultura',
    defaultCount: 1200,
    dailyFeedGramsPerAnimal: 850,
    dailyWaterLitersPerAnimal: 2.2,
    defaultDays: 5
  },
  {
    id: 'suino-terminacao',
    name: 'Suinocultura - Fase de Terminação (Engorda)',
    species: 'suinocultura',
    defaultCount: 800,
    dailyFeedGramsPerAnimal: 2700,
    dailyWaterLitersPerAnimal: 6.5,
    defaultDays: 10
  },
  {
    id: 'suino-matriz-gestacao',
    name: 'Suinocultura - Matrizes Gestantes',
    species: 'suinocultura',
    defaultCount: 400,
    dailyFeedGramsPerAnimal: 2500,
    dailyWaterLitersPerAnimal: 15.0,
    defaultDays: 14
  },
  {
    id: 'suino-matriz-lactacao',
    name: 'Suinocultura - Matrizes em Lactação',
    species: 'suinocultura',
    defaultCount: 150,
    dailyFeedGramsPerAnimal: 6500,
    dailyWaterLitersPerAnimal: 25.0,
    defaultDays: 7
  }
];

// 1. Feed calculations for CELTZ GH PWD
export function calculateFeedByTonnage(totalFeedTonnes: number, doseGramsPerTon: number) {
  if (totalFeedTonnes <= 0 || doseGramsPerTon <= 0) {
    return { totalProductKg: 0, bagsOf25kg: 0, doseGramsPerTon };
  }
  const totalGrams = totalFeedTonnes * doseGramsPerTon;
  const totalProductKg = Number((totalGrams / 1000).toFixed(2));
  const bagsOf25kg = Math.ceil(totalProductKg / 25);
  return {
    totalFeedTonnes,
    doseGramsPerTon,
    totalProductKg,
    bagsOf25kg
  };
}

export function calculateFeedByFlock(
  animalCount: number,
  dailyGramsPerAnimal: number,
  durationDays: number,
  doseGramsPerTon: number
) {
  if (animalCount <= 0 || dailyGramsPerAnimal <= 0 || durationDays <= 0 || doseGramsPerTon <= 0) {
    return {
      dailyFeedTonnes: 0,
      totalFeedTonnes: 0,
      dailyProductKg: 0,
      totalProductKg: 0,
      bagsOf25kg: 0
    };
  }

  const dailyFeedKg = (animalCount * dailyGramsPerAnimal) / 1000;
  const dailyFeedTonnes = Number((dailyFeedKg / 1000).toFixed(3));
  const totalFeedTonnes = Number((dailyFeedTonnes * durationDays).toFixed(3));

  const dailyProductKg = Number((dailyFeedTonnes * (doseGramsPerTon / 1000)).toFixed(3));
  const totalProductKg = Number((totalFeedTonnes * (doseGramsPerTon / 1000)).toFixed(2));
  const bagsOf25kg = Math.ceil(totalProductKg / 25);

  return {
    animalCount,
    dailyGramsPerAnimal,
    durationDays,
    doseGramsPerTon,
    dailyFeedTonnes,
    totalFeedTonnes,
    dailyProductKg,
    totalProductKg,
    bagsOf25kg
  };
}

// 2. Water calculations for CELTZ GH LQD (Standard 1 L / 1.000 L)
export function calculateWaterLqdByVolume(waterVolumeLiters: number, doseLPer1000L: number = 1) {
  if (waterVolumeLiters <= 0 || doseLPer1000L <= 0) {
    return {
      waterVolumeLiters: 0,
      doseLPer1000L,
      totalProductLiters: 0,
      packagingRecommendation: '0 L'
    };
  }
  const totalProductLiters = Number(((waterVolumeLiters / 1000) * doseLPer1000L).toFixed(2));
  const packagingRecommendation = formatLiquidPackaging(totalProductLiters);

  return {
    waterVolumeLiters,
    doseLPer1000L,
    totalProductLiters,
    packagingRecommendation
  };
}

export function calculateWaterLqdByFlock(
  animalCount: number,
  dailyLitersPerAnimal: number,
  durationDays: number,
  doseLPer1000L: number = 1
) {
  if (animalCount <= 0 || dailyLitersPerAnimal <= 0 || durationDays <= 0 || doseLPer1000L <= 0) {
    return {
      dailyWaterLiters: 0,
      totalWaterLiters: 0,
      dailyProductLiters: 0,
      totalProductLiters: 0,
      packagingRecommendation: '0 L'
    };
  }

  const dailyWaterLiters = Number((animalCount * dailyLitersPerAnimal).toFixed(1));
  const totalWaterLiters = Number((dailyWaterLiters * durationDays).toFixed(1));

  const dailyProductLiters = Number(((dailyWaterLiters / 1000) * doseLPer1000L).toFixed(2));
  const totalProductLiters = Number(((totalWaterLiters / 1000) * doseLPer1000L).toFixed(2));
  const packagingRecommendation = formatLiquidPackaging(totalProductLiters);

  return {
    animalCount,
    dailyLitersPerAnimal,
    durationDays,
    doseLPer1000L,
    dailyWaterLiters,
    totalWaterLiters,
    dailyProductLiters,
    totalProductLiters,
    packagingRecommendation
  };
}

// 3. Water calculations for CELTZ EF (Standard 5 g / 200 L)
export function calculateWaterEfByVolume(waterVolumeLiters: number, doseGPer200L: number = 5) {
  if (waterVolumeLiters <= 0 || doseGPer200L <= 0) {
    return {
      waterVolumeLiters: 0,
      doseGPer200L,
      totalProductGrams: 0,
      totalProductKg: 0,
      sachetsOf100g: 0,
      potsOf1kg: 0
    };
  }
  const totalProductGrams = Number(((waterVolumeLiters / 200) * doseGPer200L).toFixed(1));
  const totalProductKg = Number((totalProductGrams / 1000).toFixed(2));
  const sachetsOf100g = Math.ceil(totalProductGrams / 100);
  const potsOf1kg = Math.ceil(totalProductGrams / 1000);

  return {
    waterVolumeLiters,
    doseGPer200L,
    totalProductGrams,
    totalProductKg,
    sachetsOf100g,
    potsOf1kg
  };
}

export function calculateWaterEfByFlock(
  animalCount: number,
  dailyLitersPerAnimal: number,
  durationDays: number,
  doseGPer200L: number = 5
) {
  if (animalCount <= 0 || dailyLitersPerAnimal <= 0 || durationDays <= 0 || doseGPer200L <= 0) {
    return {
      dailyWaterLiters: 0,
      totalWaterLiters: 0,
      dailyProductGrams: 0,
      totalProductGrams: 0,
      totalProductKg: 0,
      sachetsOf100g: 0,
      potsOf1kg: 0
    };
  }

  const dailyWaterLiters = Number((animalCount * dailyLitersPerAnimal).toFixed(1));
  const totalWaterLiters = Number((dailyWaterLiters * durationDays).toFixed(1));

  const dailyProductGrams = Number(((dailyWaterLiters / 200) * doseGPer200L).toFixed(1));
  const totalProductGrams = Number(((totalWaterLiters / 200) * doseGPer200L).toFixed(1));
  const totalProductKg = Number((totalProductGrams / 1000).toFixed(2));
  const sachetsOf100g = Math.ceil(totalProductGrams / 100);
  const potsOf1kg = Math.ceil(totalProductGrams / 1000);

  return {
    animalCount,
    dailyLitersPerAnimal,
    durationDays,
    doseGPer200L,
    dailyWaterLiters,
    totalWaterLiters,
    dailyProductGrams,
    totalProductGrams,
    totalProductKg,
    sachetsOf100g,
    potsOf1kg
  };
}

function formatLiquidPackaging(liters: number): string {
  if (liters <= 0) return 'Nenhum frasco';
  if (liters < 5) {
    return `${Math.ceil(liters)} frascos de 1L`;
  }
  const bombonas20L = Math.floor(liters / 20);
  const remainderAfter20 = liters % 20;
  const bombonas5L = Math.floor(remainderAfter20 / 5);
  const remainderAfter5 = remainderAfter20 % 5;
  const frascos1L = Math.ceil(remainderAfter5);

  const parts: string[] = [];
  if (bombonas20L > 0) parts.push(`${bombonas20L}x 20L`);
  if (bombonas5L > 0) parts.push(`${bombonas5L}x 5L`);
  if (frascos1L > 0) parts.push(`${frascos1L}x 1L`);

  return parts.length > 0 ? parts.join(' + ') : `${Math.ceil(liters)}L`;
}
