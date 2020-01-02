import React from "react";
import { fetchNoOfPaymentsCalculation } from '../services';
import { applyForDeal } from '../services/applyForDeal'
import {
  getAmountFinancedStatusText,
  getMonthlyPaymentStatusText,
  getNoOfPaymentsStatusText,
  checkAmountFinanced,
  checkMonthlyPayment,
  checkNoOfPayments,
  ValidationResult
} from './validations';

export interface CalculationFormState {
  monthlyPayment: string
  amountFinanced: string
  noOfPaymentsResult: string
}

export class NoOfPaymentsForm extends React.Component<{}, CalculationFormState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      monthlyPayment: "",
      amountFinanced: "",
      noOfPaymentsResult: ""
    };
  }

  renderInputError = () => {
    const amountFinancedErrorTxt = getAmountFinancedStatusText(this.state.amountFinanced);
    const monthlyPaymentErrorTxt = getMonthlyPaymentStatusText(this.state.monthlyPayment);

    if (!amountFinancedErrorTxt && !monthlyPaymentErrorTxt) {
      return null
    }
    return (
      <div>
        ERROR:
        {amountFinancedErrorTxt && amountFinancedErrorTxt}
        {monthlyPaymentErrorTxt && monthlyPaymentErrorTxt}
      </div>
    )
  }

  displayNoOfPaymentsError = () => {
    const noOfPaymentsErrorTxt = getNoOfPaymentsStatusText(this.state.noOfPaymentsResult);
    if (!noOfPaymentsErrorTxt) {
      return null
    }
    return (
      <div>
        ERROR: {noOfPaymentsErrorTxt}
      </div>
    )
  }

  allValuesValid = () => {
    const { amountFinanced, monthlyPayment, noOfPaymentsResult } = this.state;
    const amountFinancedState = checkAmountFinanced(amountFinanced);
    const monthlyPaymentState = checkMonthlyPayment(monthlyPayment);
    const noOfPaymentsState = checkNoOfPayments(noOfPaymentsResult);
    return amountFinancedState === ValidationResult.OK &&
           monthlyPaymentState === ValidationResult.OK &&
           noOfPaymentsState   === ValidationResult.OK
  }

  renderApplicationArea = () => {
    return (
      <div>
        <button onClick={applyForDeal()} >
          Apply for deal
        </button>
      </div>
    )
  }

  render = () => {
    const { monthlyPayment: fieldA, amountFinanced: fieldB, noOfPaymentsResult: result } = this.state;
    const setNoOfPaymentsResult = (noOfPaymentsResult: string) => this.setState({ noOfPaymentsResult })
    const setMonthlyPayment = (monthlyPayment: string) => this.setState({ monthlyPayment })
    const setAmountFinanced = (amountFinanced: string) => this.setState({ amountFinanced })

    return (
      <div>
        <form
          onSubmit={ event => {
            if (event) {
              event.preventDefault();
            }
            fetchNoOfPaymentsCalculation(Number(fieldA), Number(fieldB)).then(data => setNoOfPaymentsResult(data.result));
          }
        }>
          { this.renderInputError() }
          <label>
            Monthly payment:
            <input type="number" value={fieldA} onChange={ event => setMonthlyPayment(event.target.value) } />
          </label>
          <label>
            Car cost:
            <input type="number" value={fieldB} onChange={ event => setAmountFinanced(event.target.value) } />
          </label>
          <input type="submit" value="Submit" />
          No of payments: { Number(result).toFixed(2) }
          { this.displayNoOfPaymentsError() }
          { result }
        </form>
        { this.allValuesValid() && this.renderApplicationArea() }
      </div>
    );
  }
}