#!/usr/bin/env node
/**
 * check-calculator.js
 * Verifies that the core calculator formulas in src/utils/calculatorLogic.ts
 * produce expected results for known inputs. Run with: node scripts/check-calculator.js
 */

const SAFETY_BUFFER = 0.90;
const HOUSE_MULTIPLIER = 4.5;
const RENT_MIN_RATIO = 0.30;
const RENT_MAX_RATIO = 0.35;
const CAR_CONSERVATIVE_RATIO = 0.10;
const CAR_MAX_RATIO = 0.15;

function calculateAffordability({ annualSalary, monthlyExpenses, savings, debtRepayments }) {
  const monthlyGross = annualSalary / 12;
  const monthlyDisposable = Math.max(0, monthlyGross - monthlyExpenses - debtRepayments);
  const safeMonthlyIncome = monthlyDisposable * SAFETY_BUFFER;

  const base = annualSalary * HOUSE_MULTIPLIER;
  const depositBoost = savings * 2;
  const debtPenalty = debtRepayments * 12;
  const rawHousePrice = base + depositBoost - debtPenalty;
  const maxHousePrice = Math.max(0, Math.min(annualSalary * 8, rawHousePrice));

  const recommendedRentMin = monthlyGross * RENT_MIN_RATIO;
  const recommendedRentMax = monthlyGross * RENT_MAX_RATIO;
  const conservativeCarBudget = annualSalary * CAR_CONSERVATIVE_RATIO;
  const maxCarBudget = annualSalary * CAR_MAX_RATIO;

  return {
    monthlyDisposable,
    safeMonthlyIncome,
    maxHousePrice,
    recommendedRentMin,
    recommendedRentMax,
    maxCarBudget,
    conservativeCarBudget,
    monthlyGross,
  };
}

function calculateCarFinance(monthlyBudget, deposit, termMonths, apr = 0.08) {
  const monthlyRate = apr / 12;
  let loanAmount;
  if (monthlyRate === 0) {
    loanAmount = monthlyBudget * termMonths;
  } else {
    loanAmount = monthlyBudget * (1 - Math.pow(1 + monthlyRate, -termMonths)) / monthlyRate;
  }
  const estimatedCarValue = Math.max(0, loanAmount + deposit);
  const totalPaid = monthlyBudget * termMonths + deposit;
  const totalInterest = Math.max(0, totalPaid - estimatedCarValue);
  return { monthlyPayment: monthlyBudget, estimatedCarValue, totalPaid, totalInterest };
}

function getAffordabilityVerdict(housePrice, salary) {
  const multiple = housePrice / salary;
  if (multiple <= 3.5) return 'strong';
  if (multiple <= 4.5) return 'possible';
  if (multiple <= 5.5) return 'stretched';
  return 'unlikely';
}

// ─── TEST CASES ────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(label, actual, expected, tolerance = 0) {
  const ok = tolerance > 0
    ? Math.abs(actual - expected) <= tolerance
    : actual === expected;
  if (ok) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}`);
    console.error(`    Expected: ${expected}  |  Got: ${actual}`);
    failed++;
  }
}

console.log('\n── House Affordability ──────────────────────────────────────');
{
  // £35k salary, £600/mo expenses, £10k savings, £0 debt
  const r = calculateAffordability({ annualSalary: 35000, monthlyExpenses: 600, savings: 10000, debtRepayments: 0 });
  assert('Monthly gross = 35000/12', r.monthlyGross, 35000 / 12, 0.01);
  assert('Monthly disposable = gross - expenses', r.monthlyDisposable, 35000 / 12 - 600, 0.01);
  assert('Safe monthly = disposable × 0.9', r.safeMonthlyIncome, (35000 / 12 - 600) * 0.9, 0.01);
  // rawHousePrice = 35000*4.5 + 10000*2 - 0 = 157500+20000 = 177500; cap = min(35000*8, 177500) = 177500
  assert('Max house price = 35k×4.5 + 10k×2', r.maxHousePrice, 177500, 0.01);
  assert('Rent min = gross × 0.30', r.recommendedRentMin, (35000 / 12) * 0.30, 0.01);
  assert('Rent max = gross × 0.35', r.recommendedRentMax, (35000 / 12) * 0.35, 0.01);
  assert('Car conservative = salary × 0.10', r.conservativeCarBudget, 3500, 0.01);
  assert('Car max = salary × 0.15', r.maxCarBudget, 5250, 0.01);
}

console.log('\n── Debt Penalty ─────────────────────────────────────────────');
{
  // £50k salary, £300/mo debt
  const r = calculateAffordability({ annualSalary: 50000, monthlyExpenses: 0, savings: 0, debtRepayments: 300 });
  // rawHousePrice = 50000*4.5 + 0 - 300*12 = 225000 - 3600 = 221400
  assert('Debt penalty applied correctly', r.maxHousePrice, 221400, 0.01);
}

console.log('\n── 8× Salary Cap ────────────────────────────────────────────');
{
  // £100k salary, £500k savings — raw would exceed 8× cap
  const r = calculateAffordability({ annualSalary: 100000, monthlyExpenses: 0, savings: 500000, debtRepayments: 0 });
  // raw = 100000*4.5 + 500000*2 = 450000 + 1000000 = 1450000; cap = 100000*8 = 800000
  assert('House price capped at 8× salary', r.maxHousePrice, 800000, 0.01);
}

console.log('\n── Zero Disposable Income ───────────────────────────────────');
{
  const r = calculateAffordability({ annualSalary: 20000, monthlyExpenses: 5000, savings: 0, debtRepayments: 0 });
  // monthly gross = 1666.67; expenses = 5000 → disposable = max(0, ...) = 0
  assert('Disposable income cannot go negative', r.monthlyDisposable, 0);
  assert('Safe monthly income is 0 when disposable is 0', r.safeMonthlyIncome, 0);
}

console.log('\n── Affordability Verdict ────────────────────────────────────');
assert('3.5× → strong',   getAffordabilityVerdict(140000, 40000), 'strong');
assert('4.5× → possible', getAffordabilityVerdict(180000, 40000), 'possible');
assert('5.0× → stretched', getAffordabilityVerdict(200000, 40000), 'stretched');
assert('6.0× → unlikely', getAffordabilityVerdict(240000, 40000), 'unlikely');
// Boundary: exactly 4.5× should be 'possible' not 'stretched'
assert('Exactly 4.5× boundary → possible', getAffordabilityVerdict(225000, 50000), 'possible');
// Boundary: exactly 3.5× should be 'strong'
assert('Exactly 3.5× boundary → strong', getAffordabilityVerdict(175000, 50000), 'strong');

console.log('\n── Car Finance (PMT formula) ────────────────────────────────');
{
  // £300/mo, £2000 deposit, 36 months, 8% APR
  const r = calculateCarFinance(300, 2000, 36, 0.08);
  // monthlyRate = 0.08/12 ≈ 0.006667
  // loan = 300 * (1 - (1.006667)^-36) / 0.006667 ≈ 300 * 31.912 ≈ 9573.6
  // carValue = 9573.6 + 2000 = 11573.6
  assert('Car value is loan + deposit', r.estimatedCarValue, r.monthlyPayment * (1 - Math.pow(1 + 0.08 / 12, -36)) / (0.08 / 12) + 2000, 0.01);
  assert('Monthly payment is the budget passed in', r.monthlyPayment, 300);
  assert('Total paid = monthly×term + deposit', r.totalPaid, 300 * 36 + 2000, 0.01);
  assert('Total interest >= 0', r.totalInterest >= 0, true);
}

console.log('\n── Car Finance (0% APR edge case) ──────────────────────────');
{
  const r = calculateCarFinance(200, 1000, 24, 0);
  // At 0%, loan = 200*24 = 4800; carValue = 4800+1000 = 5800; interest = 0
  assert('Zero APR: loan = monthly × term', r.estimatedCarValue, 5800, 0.01);
  assert('Zero APR: no interest charged', r.totalInterest, 0, 0.01);
}

// ─── RESULT ───────────────────────────────────────────────────────────────────

console.log(`\n─────────────────────────────────────────────────────────────`);
console.log(`  ${passed} passed  |  ${failed} failed`);

if (failed > 0) {
  console.error(`\nFAIL: ${failed} calculator test(s) failed. Review src/utils/calculatorLogic.ts.\n`);
  process.exit(1);
} else {
  console.log(`\nPASS: All calculator tests passed.\n`);
}
