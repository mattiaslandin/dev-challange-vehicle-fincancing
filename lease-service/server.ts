import * as express from 'express';
import { calculateMonthlyPayment } from './calculations/calculateMonthlyPayment';
import { calculateNoOfMonths } from './calculations/calculateNoOfMonths';
import { calculateAmountFinanced } from './calculations/calculateAmountFinanced';
import * as cors from 'cors';
const app = express();
const port = 3001;

app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/monthlyPayment', (req, res) => {
  const noOfMonths = req.query.noOfMonths;
  const amountFinanced = req.query.amountFinanced;

  const result = calculateMonthlyPayment(noOfMonths, amountFinanced)
  return res.json({ result });
});
app.get('/noOfMonths', (req, res) => {
  const monthlyPayment = req.query.monthlyPayment;
  const amountFinanced = req.query.amountFinanced;

  const result = calculateNoOfMonths(monthlyPayment, amountFinanced)
  return res.json({ result });
});
app.get('/amountFinanced', (req, res) => {
  const noOfMonths = req.query.noOfMonths;
  const monthlyPayment = req.query.monthlyPayment;

  const result = calculateAmountFinanced(noOfMonths, monthlyPayment)
  return res.json({ result });
});

app.listen(port, () => console.log(`Lease service listening on port ${port}!`));