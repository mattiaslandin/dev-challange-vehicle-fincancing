import { MIN_MONTHS, MAX_MONTHS, MIN_COST, MAX_COST } from '../config/config'

export enum ValidationResult {
  TOO_SMALL,
  TOO_BIG,
  OK,
  EMPTY
}

export const checkAmountFinanced = (amountFinanced: number): ValidationResult => {
  if(amountFinanced === null || amountFinanced === undefined) {
    return ValidationResult.EMPTY
  }
  if(amountFinanced >= MIN_COST  && amountFinanced <= MAX_COST) {
    return ValidationResult.OK;
  }

  return amountFinanced < MIN_COST ?  ValidationResult.TOO_SMALL : ValidationResult.TOO_BIG;
}

export const checkNoOfPayments = (noOfPayments: number): ValidationResult => {
  if(noOfPayments === null || noOfPayments === undefined) {
    return ValidationResult.EMPTY
  }
  if(noOfPayments >= MIN_MONTHS  && noOfPayments <= MAX_MONTHS) {
    return ValidationResult.OK;
  }

  return noOfPayments < MIN_MONTHS ?  ValidationResult.TOO_SMALL : ValidationResult.TOO_BIG;
}

export const checkMonthlyPayment = (monthlyPayment: number): ValidationResult => {
  if(monthlyPayment === null || monthlyPayment === undefined) {
    return ValidationResult.EMPTY
  }

  return monthlyPayment < 0 ?  ValidationResult.TOO_SMALL : ValidationResult.OK;
}

export const getNoOfPaymentsStatusText = (noOfMonths: string | number): string => {
  const result = checkNoOfPayments(Number(noOfMonths));

  switch (result) {
    case ValidationResult.OK:
      return "";
    case ValidationResult.EMPTY:
      return ``;
    case ValidationResult.TOO_SMALL:
      return `No of months is too low, must be a number between ${MIN_MONTHS} and ${MAX_MONTHS}`;
    case ValidationResult.TOO_BIG:
       return `No of months is too high, must be a number between ${MIN_MONTHS} and ${MAX_MONTHS}`;
  }
}

export const getAmountFinancedStatusText = (amountFinanced: string | number): string => {
  const result = checkAmountFinanced(Number(amountFinanced));

  switch (result) {
    case ValidationResult.OK:
      return "";
    case ValidationResult.EMPTY:
      return ``;
    case ValidationResult.TOO_SMALL:
      return `Amount financed too low, must be a number between ${MIN_COST} and ${MAX_COST}`;
    case ValidationResult.TOO_BIG:
      return `Amount financed too hight, must be a number between ${MIN_COST} and ${MAX_COST}`;
  }
}

export const getMonthlyPaymentStatusText = (monthlyPayment: string | number): string => {
  const result = checkMonthlyPayment(Number(monthlyPayment));

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
