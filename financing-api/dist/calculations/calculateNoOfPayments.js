"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateNoOfPayments(monthlyPayment, amountFinanced) {
    if (!amountFinanced || isNaN(amountFinanced) || isNaN(monthlyPayment)) {
        console.log('monthlyPayment:', monthlyPayment, ', amountFinanced:', amountFinanced);
        return null;
    }
    return Number(amountFinanced) / Number(monthlyPayment);
}
exports.calculateNoOfPayments = calculateNoOfPayments;
