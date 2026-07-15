export interface CalculatorInputs {
  annualSalary: number;
  monthlyExpenses: number;
  savings: number;
  debtRepayments: number;
}

export interface CalculatorResults {
  monthlyDisposable: number;
  safeMonthlyIncome: number;
  maxHousePrice: number;
  recommendedRentMin: number;
  recommendedRentMax: number;
  maxCarBudget: number;
  conservativeCarBudget: number;
  monthlyGross: number;
}

export interface DynamicPageParams {
  housePrice?: number;
  salary?: number;
  rentBudget?: number;
  carBudget?: number;
  type: 'house' | 'rent' | 'car' | 'general';
  rawTitle?: string;
}

export type Page = 'home' | 'calculators' | 'about' | 'dynamic';
