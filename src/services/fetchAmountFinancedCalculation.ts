
import { ServiceResponse } from './index';

export async function fetchAmountFinancedCalculation(monthlyPayment: number, noOfPayments: number): Promise<ServiceResponse> {
  const url = 'http://localhost:3001/calculation/amountFinanced';
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      noOfPayments,
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