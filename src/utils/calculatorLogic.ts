import { CalculatorInputs, CalculatorResults } from '../types';

const SAFETY_BUFFER = 0.90;
const HOUSE_MULTIPLIER = 4.5;
const RENT_MIN_RATIO = 0.30;
const RENT_MAX_RATIO = 0.35;
const CAR_CONSERVATIVE_RATIO = 0.10;
const CAR_MAX_RATIO = 0.15;
const UK_MEDIAN_SALARY = 35000;

export function calculateAffordability(inputs: CalculatorInputs): CalculatorResults {
  const { annualSalary, monthlyExpenses, savings, debtRepayments } = inputs;

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

export function formatCurrency(value: number, compact = false): string {
  if (compact && value >= 1000) {
    if (value >= 1_000_000) {
      return `£${(value / 1_000_000).toFixed(2)}m`;
    }
    if (value >= 100_000) {
      return `£${Math.round(value / 1000)}k`;
    }
    return `£${(value / 1000).toFixed(1)}k`;
  }
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export type AffordabilityTier = 'strong' | 'average' | 'below';

export interface AffordabilityTierResult {
  tier: AffordabilityTier;
  headline: string;
  detail: string;
}

export function getAffordabilityTier(
  inputs: CalculatorInputs,
  results: CalculatorResults
): AffordabilityTierResult {
  const { annualSalary } = inputs;
  const { safeMonthlyIncome } = results;

  if (annualSalary >= UK_MEDIAN_SALARY * 1.4 && safeMonthlyIncome >= 1200) {
    return {
      tier: 'strong',
      headline: 'You are in a strong affordability position compared to the UK average',
      detail: 'Your income and disposable income are both above typical levels for UK buyers, giving you solid flexibility on housing, rent, and car choices.',
    };
  }

  if (annualSalary >= UK_MEDIAN_SALARY * 0.85 && safeMonthlyIncome >= 500) {
    return {
      tier: 'average',
      headline: 'Your affordability is broadly in line with the UK average',
      detail: 'You are well-positioned to afford a home, rent, or car within the typical UK range. Small improvements to expenses or savings will open up more options.',
    };
  }

  return {
    tier: 'below',
    headline: 'Your affordability is slightly below average for UK buyers',
    detail: 'Reducing monthly expenses or growing your savings will have a meaningful impact on what you can afford. Even modest changes can shift your position significantly.',
  };
}

export interface CarFinanceResult {
  monthlyPayment: number;
  estimatedCarValue: number;
  totalPaid: number;
  totalInterest: number;
}

export function calculateCarFinance(
  monthlyBudget: number,
  deposit: number,
  termMonths: number,
  apr = 0.08
): CarFinanceResult {
  const monthlyRate = apr / 12;

  // Work backwards from monthly budget to find the loan amount that produces that payment
  // PMT formula: P = PMT * (1 - (1+r)^-n) / r
  let loanAmount: number;
  if (monthlyRate === 0) {
    loanAmount = monthlyBudget * termMonths;
  } else {
    loanAmount = monthlyBudget * (1 - Math.pow(1 + monthlyRate, -termMonths)) / monthlyRate;
  }

  const estimatedCarValue = Math.max(0, loanAmount + deposit);
  const totalPaid = monthlyBudget * termMonths + deposit;
  const totalInterest = Math.max(0, totalPaid - estimatedCarValue);

  return {
    monthlyPayment: monthlyBudget,
    estimatedCarValue,
    totalPaid,
    totalInterest,
  };
}

export function getAffordabilityVerdict(housePrice: number, salary: number): {
  canAfford: boolean;
  confidence: 'strong' | 'possible' | 'stretched' | 'unlikely';
  summary: string;
  shortAnswer: string;
} {
  const multiple = housePrice / salary;

  if (multiple <= 3.5) {
    return {
      canAfford: true,
      confidence: 'strong',
      summary: 'This looks very affordable based on standard lending criteria. Most lenders should be comfortable with this mortgage.',
      shortAnswer: `Buying a ${formatCurrency(housePrice, true)} home on a ${formatCurrency(salary, true)} salary looks very achievable. This falls well within standard UK lending limits, and most high-street lenders should consider your application favourably.`,
    };
  }
  if (multiple <= 4.5) {
    return {
      canAfford: true,
      confidence: 'possible',
      summary: 'This is within typical lending limits. You should be able to get a mortgage, though affordability checks will apply.',
      shortAnswer: `Buying a ${formatCurrency(housePrice, true)} home on a ${formatCurrency(salary, true)} salary is likely possible. It sits within standard UK lending multiples, though lenders will look closely at your expenses, credit history, and deposit size.`,
    };
  }
  if (multiple <= 5.5) {
    return {
      canAfford: false,
      confidence: 'stretched',
      summary: 'This is above standard lending limits. You may need a larger deposit or to look at specialist mortgages.',
      shortAnswer: `Buying a ${formatCurrency(housePrice, true)} home on a ${formatCurrency(salary, true)} salary may be challenging, but it could be possible depending on your deposit and monthly expenses. You may need a specialist lender or a larger deposit to bridge the gap.`,
    };
  }
  return {
    canAfford: false,
    confidence: 'unlikely',
    summary: 'This is significantly above standard lending criteria. Consider a lower price or increasing your salary.',
    shortAnswer: `Buying a ${formatCurrency(housePrice, true)} home on a ${formatCurrency(salary, true)} salary would be very difficult under standard UK lending rules. This is significantly above the typical 4.5× salary multiple. A much larger deposit or a higher income would be required.`,
  };
}
