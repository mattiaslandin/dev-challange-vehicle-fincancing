"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateAmountFinanced(noOfPayments, monthlyPayment) {
    if (isNaN(noOfPayments) || isNaN(monthlyPayment)) {
        console.log('noOfPayments:', noOfPayments, ', monthlyPayment:', monthlyPayment);
        return null;
    }
    return Number(monthlyPayment) * Number(noOfPayments);
}
exports.calculateAmountFinanced = calculateAmountFinanced;
