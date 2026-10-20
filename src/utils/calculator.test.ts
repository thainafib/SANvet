import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFeedByTonnage,
  calculateFeedByFlock,
  calculateWaterLqdByVolume,
  calculateWaterLqdByFlock,
  calculateWaterEfByVolume,
  calculateWaterEfByFlock,
  ANIMAL_PRESETS
} from './calculator.ts';

test('Feed dosage by tonnage calculates exact kg and 25kg bags', () => {
  // 50 tonnes of feed at 1000 g/t = 50 kg product = 2 bags of 25kg
  const res1 = calculateFeedByTonnage(50, 1000);
  assert.equal(res1.totalProductKg, 50);
  assert.equal(res1.bagsOf25kg, 2);

  // 10 tonnes at 750 g/t = 7.5 kg = 1 bag of 25kg
  const res2 = calculateFeedByTonnage(10, 750);
  assert.equal(res2.totalProductKg, 7.5);
  assert.equal(res2.bagsOf25kg, 1);

  // 20 tonnes at 1500 g/t = 30 kg = 2 bags of 25kg
  const res3 = calculateFeedByTonnage(20, 1500);
  assert.equal(res3.totalProductKg, 30);
  assert.equal(res3.bagsOf25kg, 2);
});

test('Feed dosage by flock simulates daily consumption and total kg', () => {
  // 30,000 broilers consuming 100g/day for 10 days = 30,000 kg feed = 30 tonnes
  // At 1000 g/t = 30 kg product = 2 bags
  const res = calculateFeedByFlock(30000, 100, 10, 1000);
  assert.equal(res.totalFeedTonnes, 30);
  assert.equal(res.totalProductKg, 30);
  assert.equal(res.dailyFeedTonnes, 3);
  assert.equal(res.dailyProductKg, 3);
  assert.equal(res.bagsOf25kg, 2);
});

test('Water LQD dosage by volume matches 1 L per 1,000 L', () => {
  // 5,000 liters water at 1 L / 1,000 L = 5 L product
  const res = calculateWaterLqdByVolume(5000, 1);
  assert.equal(res.totalProductLiters, 5);

  // 12,000 liters water = 12 L product
  const res2 = calculateWaterLqdByVolume(12000, 1);
  assert.equal(res2.totalProductLiters, 12);
});

test('Water LQD dosage by flock calculates daily and duration total', () => {
  // 20,000 birds drinking 0.25 L/day = 5,000 L/day
  // Over 7 days = 35,000 L total water
  // Product at 1 L / 1,000 L = 35 L total
  const res = calculateWaterLqdByFlock(20000, 0.25, 7, 1);
  assert.equal(res.dailyWaterLiters, 5000);
  assert.equal(res.totalWaterLiters, 35000);
  assert.equal(res.dailyProductLiters, 5);
  assert.equal(res.totalProductLiters, 35);
});

test('Water EF dosage matches 5 g per 200 L', () => {
  // 1,000 liters of water / 200 * 5 = 25 g
  const res = calculateWaterEfByVolume(1000, 5);
  assert.equal(res.totalProductGrams, 25);
  assert.equal(res.sachetsOf100g, 1);

  // 10,000 liters / 200 * 5 = 250 g
  const res2 = calculateWaterEfByVolume(10000, 5);
  assert.equal(res2.totalProductGrams, 250);
  assert.equal(res2.sachetsOf100g, 3);
  assert.equal(res2.potsOf1kg, 1);
});

test('Water EF dosage by flock calculates grams and packaging', () => {
  // 1,000 piglets consuming 2 L/day = 2,000 L/day for 5 days = 10,000 L
  // 10,000 L / 200 * 5 = 250 g product
  const res = calculateWaterEfByFlock(1000, 2.0, 5, 5);
  assert.equal(res.dailyWaterLiters, 2000);
  assert.equal(res.totalWaterLiters, 10000);
  assert.equal(res.dailyProductGrams, 50);
  assert.equal(res.totalProductGrams, 250);
  assert.equal(res.potsOf1kg, 1);
});

test('Animal presets are valid and non-empty', () => {
  assert.ok(ANIMAL_PRESETS.length >= 8);
  const broilers = ANIMAL_PRESETS.find(p => p.id === 'frango-corte-medio');
  assert.ok(broilers);
  assert.equal(broilers?.species, 'avicultura');
  assert.ok((broilers?.defaultCount ?? 0) > 0);
});
