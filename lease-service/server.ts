import * as express from 'express';
import { calculateMonthlyPayment } from './calculations/calculateMonthlyPayment';
import * as cors from 'cors';
const app = express();
const port = 3001;

app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/monthlypayments', (req, res) => {
  const noOfMonths = req.query.noOfMonths;
  const amountFinanced = req.query.amountFinanced;

  const result = calculateMonthlyPayment(noOfMonths, amountFinanced)
  return res.json({ result });
});

app.listen(port, () => console.log(`Lease service listening on port ${port}!`));