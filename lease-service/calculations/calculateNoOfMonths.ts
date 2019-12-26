
export function calculateNoOfMonths(monthlyPayment: number, amountFinanced: number) {
  if (!amountFinanced || isNaN(amountFinanced) || isNaN(monthlyPayment)) {
    console.log('monthlyPayment:', monthlyPayment, ', amountFinanced:', amountFinanced)
    return null;
  }
  return Number(amountFinanced) / Number(monthlyPayment);
}
