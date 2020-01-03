
export function calculateMonthlyPayment(noOfPayments: number, amountFinanced: number) {
  if (!noOfPayments || isNaN(noOfPayments) || isNaN(amountFinanced)) {
    console.log('noOfPayments:', noOfPayments, ', amountFinanced:', amountFinanced)
    return null;
  }
  return Number(amountFinanced) / Number(noOfPayments);
}
