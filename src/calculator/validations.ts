import { MIN_MONTHS, MAX_MONTHS, MIN_COST, MAX_COST } from '../config'

export enum ValidationResult {
  TOO_SMALL,
  TOO_BIG,
  OK,
  EMPTY
}

export const checkAmountFinanced = (amountFinanced: string): ValidationResult => {
  if(!amountFinanced) {
    return ValidationResult.EMPTY
  }
  const amountFinancedNr = Number(amountFinanced)
  if(amountFinancedNr >= MIN_COST  && amountFinancedNr <= MAX_COST) {
    return ValidationResult.OK;
  }

  return amountFinancedNr < MIN_COST ?  ValidationResult.TOO_SMALL : ValidationResult.TOO_BIG;
}

export const checkNoOfPayments = (noOfPayments: string): ValidationResult => {
  if(!noOfPayments) {
    return ValidationResult.EMPTY
  }
  const noOfPaymentsNr = Number(noOfPayments);
  if(noOfPaymentsNr >= MIN_MONTHS  && noOfPaymentsNr <= MAX_MONTHS) {
    return ValidationResult.OK;
  }

  return noOfPaymentsNr < MIN_MONTHS ?  ValidationResult.TOO_SMALL : ValidationResult.TOO_BIG;
}

export const checkMonthlyPayment = (monthlyPayment: string): ValidationResult => {
  if(!monthlyPayment) {
    return ValidationResult.EMPTY
  }
  const monthlyPaymentNr = Number(monthlyPayment);
  return monthlyPaymentNr < 0 ?  ValidationResult.TOO_SMALL : ValidationResult.OK;
}

export const getNoOfPaymentsStatusText = (noOfMonths: string): string => {
  const result = checkNoOfPayments(noOfMonths);

  switch (result) {
    case ValidationResult.OK:
      return "";
    case ValidationResult.EMPTY:
      return "";
    case ValidationResult.TOO_SMALL:
      return `No of months is too low, must be a number between ${MIN_MONTHS} and ${MAX_MONTHS}`;
    case ValidationResult.TOO_BIG:
       return `No of months is too high, must be a number between ${MIN_MONTHS} and ${MAX_MONTHS}`;
  }
}

export const getAmountFinancedStatusText = (amountFinanced: string): string => {
  const result = checkAmountFinanced(amountFinanced);

  console.log('result:', result);

  switch (result) {
    case ValidationResult.OK:
      return "";
    case ValidationResult.EMPTY:
      return "";
    case ValidationResult.TOO_SMALL:
      return `Amount financed too low, must be a number between ${MIN_COST} and ${MAX_COST}`;
    case ValidationResult.TOO_BIG:
      return `Amount financed too hight, must be a number between ${MIN_COST} and ${MAX_COST}`;
  }
}

export const getMonthlyPaymentStatusText = (monthlyPayment: string): string => {
  const result = checkMonthlyPayment(monthlyPayment);

  switch (result) {
    case ValidationResult.OK:
      return "";
    case ValidationResult.EMPTY:
      return "";
    case ValidationResult.TOO_SMALL:
      return "Monthly payment must be a positive number";
    case ValidationResult.TOO_BIG:
      return "Monthly payment must be a positive number";
  }
}
