
export function calculateAmountFinanced(noOfPayments: number, monthlyPayment: number) {
  if (isNaN(noOfPayments) || isNaN(monthlyPayment)) {
    console.log('noOfPayments:', noOfPayments, ', monthlyPayment:', monthlyPayment)
    return null;
  }
  return Number(monthlyPayment) * Number(noOfPayments);
}
