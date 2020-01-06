
import { ServiceResponse } from './index';

export async function fetchNoOfPaymentsCalculation(monthlyPayment: number, amountFinanced: number): Promise<ServiceResponse> {
  const url = 'http://localhost:3001/calculation/noOfPayments';
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amountFinanced,
      monthlyPayment
    }),
  });
  if (resp.ok) {
    const respJson = await resp.json();
    return {
      ok: true,
      data: respJson.result
    };
  } else {
    return {
      ok: false,
      data: 'Error getting calculation!'
    };
  }
}