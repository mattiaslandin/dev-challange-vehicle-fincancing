
import React, { useState } from 'react';
import { Header } from './Header';
import { Tab } from './Tab';
import { CalculationForm, CalculationFormProps } from './CalculationForm';
import { NoOfPaymentsForm } from './NoOfPaymentsForm';
import * as services from '../services'

const MIN_MONTHS = 6;
const MAX_MONTHS = 36;
const MIN_COST = 10000;
const MAX_COST = 100000;

enum CalculationType {
  noOfPayments,
  amountFinanced,
  monthlyPayment
}

const initialRestultState = {
  resultA: undefined,
  resultB: undefined,
  resultC: undefined
}

interface ResultState {
  resultA: number | undefined,
  resultB: number | undefined,
  resultC: number | undefined
}

export const Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState(CalculationType.noOfPayments);
  const [results, setResults] = useState<ResultState>(initialRestultState);

  const styleFlexCenterHorizontal = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const noOfPaymentsArg: CalculationFormProps = {
    fieldAName: 'Monthly payment',
    fieldBName: 'Car cost',
    resultName: 'Monthly payment',
    onSubmit: (a: number, b: number) => {
      services.fetchNoOfPaymentsCalculation(a, b).then(data => setResults({ ...results, resultA: data.result}))
    }
  }

  const amountFinancedArg: CalculationFormProps = {
    fieldAName: 'Number of months (6-36)',
    fieldBName: 'Monthly payment',
    resultName: 'Car cost',
    onSubmit: (a: number, b: number) => {
      services.fetchAmountFinancedCalculation(a, b).then(data => setResults({ ...results, resultB: data.result}))
    }
  }

  const monthlyPaymentArg: CalculationFormProps = {
    fieldAName: 'Number of months (6-36)',
    fieldBName: 'Car cost',
    resultName: 'Number of months (6-36)',
    onSubmit: (a: number, b: number) => {
      services.fetchMonthlyPaymentCalculation(a, b).then(data => setResults({ ...results, resultC: data.result}))
    }
  }

  return (
    <div className="Calculator">
      <Header />
      <div style={ styleFlexCenterHorizontal }>
        <Tab
          text="No of Payments"
          setActive={ () => setActiveTab(CalculationType.noOfPayments) }
          active={ activeTab === CalculationType.noOfPayments }
        />
        <Tab
          text="Amount Financed"
          setActive={ () => setActiveTab(CalculationType.amountFinanced) }
          active={ activeTab === CalculationType.amountFinanced }
        />
        <Tab
          text="Monthly Payment"
          setActive={ () => setActiveTab(CalculationType.monthlyPayment) }
          active={ activeTab === CalculationType.monthlyPayment }
        />
      </div>
      { activeTab === CalculationType.noOfPayments && <NoOfPaymentsForm /> }
      { activeTab === CalculationType.amountFinanced && (
        <>
          <CalculationForm {...amountFinancedArg} />
          Resultat: {results.resultB}
          { displayAmountFinancedError(results.resultB) }
        </>
      )}
      { activeTab === CalculationType.monthlyPayment && (
        <>
          <CalculationForm {...monthlyPaymentArg} />
          Resultat: {results.resultC}
          {/* { displayMonthlyPaymentError(results.resultC) } */}
        </>
      )}
    </div>
  );
}

const displayNoOfPaymentsError = (result: number | undefined) => {
  if(!result || result >= MIN_MONTHS && result <= MAX_MONTHS) {
    return null; // No error
  }
  const errorMsg = result < MIN_MONTHS ? `No of payments below ${MIN_MONTHS} is not allowed` : `No of payments above ${MAX_MONTHS} is not allowed`;
  return (
    <div>
      ERROR: {errorMsg}
    </div>
  )
}

const displayAmountFinancedError = (result: number | undefined) => {
  if(!result || result >= 10000 && result <= 100000) {
    return null; // No error
  }
  const errorMsg = result < MIN_COST ? `Total cost below ${MIN_COST} is not allowed` : `Total cost above ${MAX_COST} is not allowed`;
  return (
    <div>
      ERROR: {errorMsg}
    </div>
  )
}

// const displayMonthlyPaymentError = (result: number | undefined) => {
//   if(!result || result >= 6 && result <= 36) {
//     return null; // No error
//   }
//   const errorMsg = result < 6 ? "No of payments below 6 is not allowed" : "No of payments above 36 is not allowed"
//   return (
//     <div>
//       ERROR: {errorMsg}
//     </div>
//   )
// }

// const renderCalculationForm = (type: CalculationType) => {
//   switch (type) {
//     case CalculationType.noOfPayments:
//       return CalculationForm(noOfPaymentsArg);
//     case CalculationType.amountFinanced:
//       return CalculationForm(amountFinancedArg);
//     case CalculationType.monthlyPayment:
//       return CalculationForm(monthlyPaymentArg);
//   }
// }
