import * as express from 'express';
import * as bodyParser from 'body-parser';
import { calculateMonthlyPayment } from './calculations/calculateMonthlyPayment';
import { calculateNoOfMonths } from './calculations/calculateNoOfMonths';
import { calculateAmountFinanced } from './calculations/calculateAmountFinanced';
import { validateDeal } from './validateDeal';
import * as cors from 'cors';
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello and welcome to siemens vehicle leasing service!'));

app.get('/monthlyPayment', (req, res) => {
  const noOfMonths = req.query.noOfMonths;
  const amountFinanced = req.query.amountFinanced;

  const result = calculateMonthlyPayment(noOfMonths, amountFinanced)
  return res.status(200).json({ result });
});
app.get('/noOfMonths', (req, res) => {
  const monthlyPayment = req.query.monthlyPayment;
  const amountFinanced = req.query.amountFinanced;

  const result = calculateNoOfMonths(monthlyPayment, amountFinanced)
  return res.status(200).json({ result });
});
app.get('/amountFinanced', (req, res) => {
  const noOfMonths = req.query.noOfMonths;
  const monthlyPayment = req.query.monthlyPayment;

  const result = calculateAmountFinanced(noOfMonths, monthlyPayment)
  return res.status(200).json({ result });
});
app.post('/deal', (req, res) => {
  console.log('/deal:', req.body);
  console.log('/validateDeal(req.body.noOfMonths, req.body.amountFinanced, req.body.monthlyPayment):', validateDeal(req.body.noOfMonths, req.body.amountFinanced, req.body.monthlyPayment));
  return validateDeal(req.body.noOfMonths, req.body.amountFinanced, req.body.monthlyPayment) ?
    res.status(200).send('Lease applied for successfully') :
    res.status(400).send('Invalid lease parameters!')
});


app.listen(port, () => console.log(`Leasing service listening on port ${port}!`));