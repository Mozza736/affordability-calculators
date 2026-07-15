import { useState, useMemo } from 'react';
import { CalculatorInputs, CalculatorResults } from '../types';
import { calculateAffordability } from '../utils/calculatorLogic';

const DEFAULT_INPUTS: CalculatorInputs = {
  annualSalary: 45000,
  monthlyExpenses: 800,
  savings: 20000,
  debtRepayments: 200,
};

export function useCalculator(initialInputs?: Partial<CalculatorInputs>) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...DEFAULT_INPUTS,
    ...initialInputs,
  });

  const results: CalculatorResults = useMemo(
    () => calculateAffordability(inputs),
    [inputs]
  );

  const updateInput = (field: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  return { inputs, results, updateInput, setInputs };
}
