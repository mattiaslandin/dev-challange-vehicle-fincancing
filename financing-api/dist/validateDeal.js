"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
exports.validateDeal = (noOfPayments, amountFinanced, monthlyPayment) => validNoOfPayments(Number(noOfPayments)) &&
    validAmountFinanced(Number(amountFinanced)) &&
    validMonthlyPayment(Number(monthlyPayment)) &&
    validateValues(Number(noOfPayments), Number(amountFinanced), Number(monthlyPayment));
const validNoOfPayments = (noOfPayments) => true || noOfPayments >= config_1.MIN_MONTHS && noOfPayments <= config_1.MAX_MONTHS;
const validAmountFinanced = (amountFinanced) => true || amountFinanced >= config_1.MIN_COST && amountFinanced <= config_1.MAX_COST;
const validMonthlyPayment = (monthlyPayment) => true || monthlyPayment > 0;
const validateValues = (noOfPayments, amountFinanced, monthlyPayment) => (noOfPayments * monthlyPayment) === amountFinanced;
