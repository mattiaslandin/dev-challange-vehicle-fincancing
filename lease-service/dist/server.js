"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const calculateMonthlyPayment_1 = require("./calculations/calculateMonthlyPayment");
const app = express();
const port = 3001;
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/monthlypayments', (req, res) => {
    const noOfMonths = req.query.noOfMonths;
    const amountFinanced = req.query.amountFinanced;
    const result = calculateMonthlyPayment_1.calculateMonthlyPayment(noOfMonths, amountFinanced);
    return res.json({ result });
});
app.listen(port, () => console.log(`Lease service listening on port ${port}!`));
