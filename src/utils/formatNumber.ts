export function formatNumber(number: number | any): string {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(number);
}
