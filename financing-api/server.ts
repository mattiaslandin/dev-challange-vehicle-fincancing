import * as express from 'express';
import * as bodyParser from 'body-parser';
import { calculateMonthlyPayment } from './calculations/calculateMonthlyPayment';
import { calculateNoOfPayments } from './calculations/calculateNoOfPayments';
import { calculateAmountFinanced } from './calculations/calculateAmountFinanced';
import { validateDeal } from './validateDeal';
import * as cors from 'cors';
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json())
app.get('/', (_req, res) => res.send('Hello and welcome to siemens vehicle financing service!'));

app.post('/calculation/monthlyPayment', (req, res) => {
  console.log('/monthlyPayment:', req.body);
  const noOfPayments = req.body.noOfPayments;
  const amountFinanced = req.body.amountFinanced;

  const result = calculateMonthlyPayment(noOfPayments, amountFinanced);
  return res.status(200).json({ result });
});
app.post('/calculation/noOfPayments', (req, res) => {
  console.log('/noOfPayments:', req.body);
  const monthlyPayment = req.body.monthlyPayment;
  const amountFinanced = req.body.amountFinanced;

  const result = calculateNoOfPayments(monthlyPayment, amountFinanced);
  return res.status(200).json({ result });
});
app.post('/calculation/amountFinanced', (req, res) => {
  console.log('/amountFinanced:', req.body);
  const noOfPayments = req.body.noOfPayments;
  const monthlyPayment = req.body.monthlyPayment;

  const result = calculateAmountFinanced(noOfPayments, monthlyPayment);
  return res.status(200).json({ result });
});
app.post('/deal', (req, res) => {
  console.log('/deal:', req.body);
  return validateDeal(req.body.noOfPayments, req.body.amountFinanced, req.body.monthlyPayment) ?
    res.status(200).json({
      msg:'Lease applied for successfully',
      noOfPayments: req.body.noOfPayments,
      amountFinanced: req.body.amountFinanced,
      monthlyPayment: req.body.monthlyPayment
    }) :
    res.status(400).json({msg: 'Invalid deal parameters!'});
});


app.listen(port, () => console.log(`financing service listening on port ${port}!`));