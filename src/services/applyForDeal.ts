import { ServiceResponse } from './index';

export async function applyForDeal(noOfPayments: number | string, amountFinanced: number | string, monthlyPayment: number | string):
  Promise<ServiceResponse> {
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
    const respJson = await res.json();
    return {
      ok: true,
      data: respJson.msg
    };
  } else if (res.status >= 400 && res.status < 500) {
    const respJson = await res.json();
    return {
      ok: false,
      data: respJson.msg
    };
  } else {
    console.log('Error applying for deal:', res.status);
    return {
      ok: false,
      data: 'Error applying for deal'
    };
  }
}
