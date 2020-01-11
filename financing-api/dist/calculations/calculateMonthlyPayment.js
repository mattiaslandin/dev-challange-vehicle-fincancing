"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateMonthlyPayment(noOfPayments, amountFinanced) {
    if (!noOfPayments || isNaN(noOfPayments) || isNaN(amountFinanced)) {
        console.log('noOfPayments:', noOfPayments, ', amountFinanced:', amountFinanced);
        return null;
    }
    return Number(amountFinanced) / Number(noOfPayments);
}
exports.calculateMonthlyPayment = calculateMonthlyPayment;
