export { fetchMonthlyPaymentCalculation } from './fetchMonthlyPaymentCalculation';
export { fetchNoOfPaymentsCalculation } from './fetchNoOfPaymentsCalculation';
export { fetchAmountFinancedCalculation } from './fetchAmountFinancedCalculation';
export { applyForDeal } from './applyForDeal';

export interface ServiceResponse {
  ok: boolean,
  data: string,
}