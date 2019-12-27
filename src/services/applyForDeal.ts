
export async function applyForDeal(noOfMonths: number, amountFinanced:number, monthlyPayment: number) {
  const url = 'http://localhost:3001/deal';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      noOfMonths,
      amountFinanced,
      monthlyPayment
    }),
  });
  if (res.ok) {
    return await res.json();
  } else {
    console.log('Error getting calculation:', res.status);
    return {};
  }
}