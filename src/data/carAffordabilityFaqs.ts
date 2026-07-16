export interface FaqItem {
  question: string;
  answer: string;
}

export const CAR_AFFORDABILITY_FAQS: FaqItem[] = [
  {
    question: 'How much car can I afford based on my salary in the UK?',
    answer:
      'A general budgeting guide is to keep your car finance payment at around 10–12% of your net (take-home) monthly income. On a £30k salary (take-home ~£2,050/month), that suggests a budget of roughly £200–£250/month. On a £40k salary (~£2,550/month), around £255–£310/month. On a £50k salary (~£3,150/month), roughly £315–£380/month. These are illustrative planning figures, not lending criteria. Use the calculator above to see the car value that budget unlocks based on your deposit, APR, and term length.',
  },
  {
    question: 'What factors affect how much car I can afford?',
    answer:
      'The key factors are: your monthly disposable income after housing costs and other commitments; the deposit you can put down (a larger deposit reduces your loan and lowers monthly payments); the APR on your finance deal; and the term length (longer terms lower monthly payments but increase total interest paid). Your total monthly motoring costs — finance, insurance, fuel or charging, and servicing — will typically run £150–£400 more than the finance payment alone.',
  },
  {
    question: 'What is the difference between PCP and HP car finance?',
    answer:
      "PCP (Personal Contract Purchase) finances only part of the car's value. You pay a deposit, fixed monthly payments, then choose to return the car, pay a balloon payment to own it, or part-exchange. Monthly costs are lower. HP (Hire Purchase) finances the full car value — higher monthly payments but you own the car outright at the end, with no balloon payment and no mileage limits.",
  },
  {
    question: 'What APR will I pay on UK car finance?',
    answer:
      'This calculator uses 8% APR as an illustrative starting value for planning purposes — not a guaranteed, average or expected rate. Actual APRs vary by lender, your credit profile, the vehicle, and the type of agreement. Always compare the representative APR and total amount payable stated in any finance offer before signing. If you have a strong credit history you may qualify for a lower rate; a weaker profile or older vehicle typically means a higher rate.',
  },
  {
    question: 'What should I budget for total monthly motoring costs?',
    answer:
      'Beyond the finance payment, budget for car insurance (cost varies widely by age, location, and vehicle), fuel or charging (depends on mileage and vehicle type), road tax (£0–£30/month for most cars), and maintenance including tyres (allow for periodic costs averaged over the year). Total monthly motoring costs can easily exceed the finance payment alone — factor these in before committing to a deal.',
  },
];
