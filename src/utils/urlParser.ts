import { DynamicPageParams } from '../types';

function parseAmount(str: string): number {
  const lower = str.toLowerCase();
  if (lower.endsWith('k')) {
    return parseFloat(lower) * 1000;
  }
  if (lower.endsWith('m')) {
    return parseFloat(lower) * 1_000_000;
  }
  return parseFloat(lower);
}

export function parseDynamicUrl(pathname: string): DynamicPageParams | null {
  const clean = pathname.replace(/^\//, '').toLowerCase();

  const housePattern = /^can-i-afford-(?:a-)?([\d.]+[km]?)-house-on-([\d.]+[km]?)-salary/i;
  const houseMatch = clean.match(housePattern);
  if (houseMatch) {
    return {
      housePrice: parseAmount(houseMatch[1]),
      salary: parseAmount(houseMatch[2]),
      type: 'house',
      rawTitle: pathname.replace(/^\//, ''),
    };
  }

  const rentPattern = /^can-i-afford-([\d.]+[km]?)-rent-on-([\d.]+[km]?)-salary/i;
  const rentMatch = clean.match(rentPattern);
  if (rentMatch) {
    return {
      rentBudget: parseAmount(rentMatch[1]),
      salary: parseAmount(rentMatch[2]),
      type: 'rent',
      rawTitle: pathname.replace(/^\//, ''),
    };
  }

  const carPattern = /^can-i-afford-a-([\d.]+[km]?)-car-on-([\d.]+[km]?)-salary/i;
  const carMatch = clean.match(carPattern);
  if (carMatch) {
    return {
      carBudget: parseAmount(carMatch[1]),
      salary: parseAmount(carMatch[2]),
      type: 'car',
      rawTitle: pathname.replace(/^\//, ''),
    };
  }

  return null;
}

export function buildDynamicUrl(type: 'house' | 'rent' | 'car', price: number, salary: number): string {
  const formatK = (n: number) => {
    if (n % 1000 === 0) return `${n / 1000}k`;
    return `${n}`;
  };
  if (type === 'house') {
    return `/can-i-afford-a-${formatK(price)}-house-on-${formatK(salary)}-salary-uk`;
  }
  if (type === 'rent') {
    return `/can-i-afford-${formatK(price)}-rent-on-${formatK(salary)}-salary-uk`;
  }
  return `/can-i-afford-a-${formatK(price)}-car-on-${formatK(salary)}-salary-uk`;
}
