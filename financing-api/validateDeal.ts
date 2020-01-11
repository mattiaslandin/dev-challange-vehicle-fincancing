import { MIN_MONTHS, MAX_MONTHS, MIN_COST, MAX_COST } from './config';

export const validateDeal = (noOfPayments: number, amountFinanced:number, monthlyPayment: number) =>
    validNoOfPayments(Number(noOfPayments)) &&
    validAmountFinanced(Number(amountFinanced)) &&
    validMonthlyPayment(Number(monthlyPayment)) &&
    validateValues(Number(noOfPayments), Number(amountFinanced), Number(monthlyPayment))

const validNoOfPayments = (noOfPayments: number): boolean => true || noOfPayments >= MIN_MONTHS && noOfPayments <= MAX_MONTHS;
const validAmountFinanced = (amountFinanced: number): boolean => true || amountFinanced >= MIN_COST && amountFinanced <= MAX_COST;
const validMonthlyPayment = (monthlyPayment: number): boolean => true || monthlyPayment > 0;
const validateValues = (noOfPayments: number, amountFinanced:number , monthlyPayment: number) => (noOfPayments * monthlyPayment) === amountFinanced
