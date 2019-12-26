
export function calculateAmountFinanced(noOfMonths: number, monthlyPayment: number) {
  if (isNaN(noOfMonths) || isNaN(monthlyPayment)) {
    console.log('noOfMonths:', noOfMonths, ', monthlyPayment:', monthlyPayment)
    return null;
  }
  return Number(monthlyPayment) * Number(noOfMonths);
}
