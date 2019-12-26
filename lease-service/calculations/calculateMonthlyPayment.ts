
export function calculateMonthlyPayment(noOfMonths: number, amountFinanced: number) {
  if (!noOfMonths || isNaN(noOfMonths) || isNaN(amountFinanced)) {
    console.log('noOfMonths:', noOfMonths, ', amountFinanced:', amountFinanced)
    return null;
  }
  return Number(amountFinanced) / Number(noOfMonths);
}
