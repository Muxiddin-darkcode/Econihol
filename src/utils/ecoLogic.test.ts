import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCompositeEcoIndex,
  getRubricLevel,
  validateWasteSorting,
  calculateMean,
  calculateStdDev,
  calculateCohenD,
  sanitizeChildAiPrompt,
  calculateBadgePercentage,
  getStudentMilestoneRank
} from './ecoLogic.ts';

test('calculateCompositeEcoIndex computes correct average across 4 dimensions', () => {
  const score = calculateCompositeEcoIndex({
    knowledge: 80,
    attitude: 90,
    skill: 70,
    behavior: 80
  });
  assert.equal(score, 80);
});

test('calculateCompositeEcoIndex clamps bounds between 0 and 100', () => {
  const minScore = calculateCompositeEcoIndex({
    knowledge: -10,
    attitude: -5,
    skill: 0,
    behavior: 0
  });
  assert.equal(minScore, 0);

  const maxScore = calculateCompositeEcoIndex({
    knowledge: 120,
    attitude: 110,
    skill: 100,
    behavior: 100
  });
  assert.equal(maxScore, 100);
});

test('getRubricLevel matches 0-3 criteria according to specification Section 6.1', () => {
  assert.equal(getRubricLevel(0).labelUz, "Hali namoyon bo'lmadi");
  assert.equal(getRubricLevel(1).labelUz, "Yordam bilan");
  assert.equal(getRubricLevel(2).labelUz, "Mustaqil bajaradi");
  assert.equal(getRubricLevel(3).labelUz, "Qo'llaydi va izohlaydi");
});

test('validateWasteSorting properly validates waste categorization', () => {
  const correctCheck = validateWasteSorting('plastic', 'plastic');
  assert.equal(correctCheck.isCorrect, true);

  const incorrectCheck = validateWasteSorting('hazardous', 'paper');
  assert.equal(incorrectCheck.isCorrect, false);
  assert.match(incorrectCheck.messageUz, /Xavfli chiqindi/);
});

test('statistical calculations compute accurate mean, standard deviation, and Cohen d', () => {
  const experimentalScores = [70, 75, 80, 85, 90];
  const controlScores = [50, 55, 60, 65, 70];

  const expMean = calculateMean(experimentalScores);
  assert.equal(expMean, 80);

  const ctrlMean = calculateMean(controlScores);
  assert.equal(ctrlMean, 60);

  const std = calculateStdDev(experimentalScores);
  assert.equal(std, 7.91);

  const d = calculateCohenD(experimentalScores, controlScores);
  // Difference = 20, pooled std dev = 7.91, d should be approx 2.53
  assert.ok(d > 2.0, 'Cohen d should reflect a large effect size');
});

test('sanitizeChildAiPrompt blocks phone numbers and personal data for child protection', () => {
  const phoneAttempt = sanitizeChildAiPrompt("Salom mening nomerim +998901234567, menga qo'ng'iroq qil");
  assert.equal(phoneAttempt.isSafe, false);
  assert.match(phoneAttempt.warningUz || '', /telefon raqamingiz/i);

  const addressAttempt = sanitizeChildAiPrompt("Mening uyimning manzili qayerda?");
  assert.equal(addressAttempt.isSafe, false);

  const validEcoQuestion = sanitizeChildAiPrompt("Nega kuzda daraxtlarning barglari sarg'ayadi?");
  assert.equal(validEcoQuestion.isSafe, true);
  assert.equal(validEcoQuestion.sanitizedText, "Nega kuzda daraxtlarning barglari sarg'ayadi?");
});

test('calculateBadgePercentage computes clamped integer progress', () => {
  const half = calculateBadgePercentage(1, 2);
  assert.equal(half, 50);

  const overflow = calculateBadgePercentage(5, 3);
  assert.equal(overflow, 100);

  const zeroTarget = calculateBadgePercentage(0, 0);
  assert.equal(zeroTarget, 100);
});

test('getStudentMilestoneRank assigns proper rank and diploma based on badge count', () => {
  const level1 = getStudentMilestoneRank(2, 12);
  assert.equal(level1.rankLevel, 1);
  assert.match(level1.rankTitleUz, /Yosh Tabiat Do‘sti/);

  const level2 = getStudentMilestoneRank(5, 12);
  assert.equal(level2.rankLevel, 2);
  assert.match(level2.rankTitleUz, /Izquvar/);

  const level3 = getStudentMilestoneRank(8, 12);
  assert.equal(level3.rankLevel, 3);
  assert.match(level3.rankTitleUz, /Posboni/);

  const level4 = getStudentMilestoneRank(11, 12);
  assert.equal(level4.rankLevel, 4);
  assert.match(level4.rankTitleUz, /Sayyora Qahramoni/);
});
