"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateMonthlyPayment(noOfMonths, amountFinanced) {
    if (!noOfMonths || isNaN(noOfMonths) || isNaN(amountFinanced)) {
        console.log('noOfMonths:', noOfMonths, ', amountFinanced:', amountFinanced);
        return null;
    }
    return Number(amountFinanced) / Number(noOfMonths);
}
exports.calculateMonthlyPayment = calculateMonthlyPayment;
