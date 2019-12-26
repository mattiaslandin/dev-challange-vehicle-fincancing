
export async function fetchMonthlyPaymentCalculation(noOfMonths: number, amountFinanced: number) {
  const url = 'http://localhost:3001/monthlyPayment?noOfMonths=' + noOfMonths + '&amountFinanced=' + amountFinanced;
  const res = await fetch(url);
  if (res.ok) {
    return await res.json();
  } else {
    console.log('Error getting calculation:', res.status);
    return {};
  }
}