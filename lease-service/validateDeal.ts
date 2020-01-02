import { MIN_MONTHS, MAX_MONTHS, MIN_COST, MAX_COST } from './config';

export const validateDeal = (noOfMonths: number, amountFinanced:number, monthlyPayment: number) =>
    validNoOfMonths(Number(noOfMonths)) &&
    validAmountFinanced(Number(amountFinanced)) &&
    validMonthlyPayment(Number(monthlyPayment)) &&
    validateValues(Number(noOfMonths), Number(amountFinanced), Number(monthlyPayment))

const validNoOfMonths = (noOfMonths: number): boolean => true || noOfMonths >= MIN_MONTHS && noOfMonths <= MAX_MONTHS;
const validAmountFinanced = (amountFinanced: number): boolean => true || amountFinanced >= MIN_COST && amountFinanced <= MAX_COST;
const validMonthlyPayment = (monthlyPayment: number): boolean => true || monthlyPayment > 0;
const validateValues = (noOfMonths: number, amountFinanced:number , monthlyPayment: number) => (noOfMonths * monthlyPayment) === amountFinanced
