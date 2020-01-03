
export async function applyForDeal(noOfPayments: number | string, amountFinanced: number | string, monthlyPayment: number | string):
  Promise<{ok: boolean, data: { msg: string }}> {
  const url = 'http://localhost:3001/deal';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      noOfPayments,
      amountFinanced,
      monthlyPayment
    }),
  });
  if (res.ok) {
    const data = await res.json();
    return resp(true, data);
  } else if (res.status >= 400 && res.status < 500) {
    const data = await res.json();
    return resp(false, data);
  } else {
    console.log('Error getting calculation:', res.status);
    return resp(false, { msg: `Error getting calculation: ${res.status}` });
  }
}

function resp(ok: boolean, data: { msg: string }) {
  return {
    ok,
    data
  }
}