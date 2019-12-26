
export async function fetchNoOfMontsCalculation(monthlyPayment: number, amountFinanced: number) {
  const url = 'http://localhost:3001/noOfMonths?monthlyPayment=' + monthlyPayment + '&amountFinanced=' + amountFinanced;
  const res = await fetch(url);
  if (res.ok) {
    return await res.json();
  } else {
    console.log('Error getting calculation:', res.status);
    return {};
  }
}