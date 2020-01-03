
export async function fetchAmountFinancedCalculation(monthlyPayment: number, noOfPayments: number) {
  const url = 'http://localhost:3001/amountFinanced?monthlyPayment=' + monthlyPayment + '&noOfPayments=' + noOfPayments;
  const res = await fetch(url);
  if (res.ok) {
    return await res.json();
  } else {
    console.log('Error getting calculation:', res.status);
    return {};
  }
}