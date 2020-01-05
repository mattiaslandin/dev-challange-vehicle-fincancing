import React from "react";
import { fetchMonthlyPaymentCalculation } from '../services';
import { applyForDeal } from '../services/applyForDeal';
import {
  getAmountFinancedStatusText,
  getMonthlyPaymentStatusText,
  getNoOfPaymentsStatusText,
  checkAmountFinanced,
  checkMonthlyPayment,
  checkNoOfPayments,
  ValidationResult
} from './validations';
import { ApplicationModal } from '../ApplicationModal/ApplicationModal';
import "./CalculatorForms.css";

const MODAL_LOADING_TEXT = "Processing your application";
const MODAL_BUTTON_TEXT = "OK";

export interface CalculationFormState {
  noOfPayments: string
  amountFinanced: string
  monthlyPaymentResult: string
  showApplicationModal: boolean,
  showErrors: boolean,
  applyForDealMsg: string,
  modalLoading: boolean,
}

export class MonthlyPaymentForm extends React.Component<{}, CalculationFormState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      noOfPayments: "",
      amountFinanced: "",
      monthlyPaymentResult: "",
      showApplicationModal: false,
      showErrors: false,
      applyForDealMsg: "",
      modalLoading: false,
    };
  }

  renderInputError = () => {
    const amountFinancedErrorTxt = getAmountFinancedStatusText(this.state.amountFinanced);
    const noOfPaymentsErrorTxt = getNoOfPaymentsStatusText(this.state.noOfPayments);

    if (!amountFinancedErrorTxt && !noOfPaymentsErrorTxt) {
      return null
    }
    return (
      <div>
        ERROR:
        {amountFinancedErrorTxt && amountFinancedErrorTxt}
        {noOfPaymentsErrorTxt && noOfPaymentsErrorTxt}
      </div>
    )
  }

  displayNoOfPaymentsError = () => {
    const monthlyPaymentErrorTxt = getMonthlyPaymentStatusText(this.state.monthlyPaymentResult);
    if (!monthlyPaymentErrorTxt) {
      return null
    }
    return (
      <div className="calculator-form-error">
        ERROR: {monthlyPaymentErrorTxt}
      </div>
    )
  }

  inputFieldsValid = () => {
    const { amountFinanced, noOfPayments } = this.state;
    const amountFinancedState = checkAmountFinanced(amountFinanced);
    const monthlyPaymentState = checkMonthlyPayment(noOfPayments);
    return amountFinancedState === ValidationResult.OK &&
           monthlyPaymentState === ValidationResult.OK;
  }

  allValuesValid = () => {
    const { amountFinanced, noOfPayments, monthlyPaymentResult } = this.state;
    const amountFinancedState = checkAmountFinanced(amountFinanced);
    const noOfPaymentsState = checkNoOfPayments(noOfPayments);
    const monthlyPaymentState = checkMonthlyPayment(monthlyPaymentResult);
    return amountFinancedState === ValidationResult.OK &&
           monthlyPaymentState === ValidationResult.OK &&
           noOfPaymentsState   === ValidationResult.OK;
  }

  renderApplicationArea = () => {
    return (
      <div>
        <button onClick={() => this.applyForDeal()} >
          Apply for deal
        </button>
      </div>
    )
  }

  applyForDeal = async () => {
    const { amountFinanced, noOfPayments, monthlyPaymentResult } = this.state;
    this.setState({ showApplicationModal: true, modalLoading: true })
    applyForDeal(noOfPayments, amountFinanced, monthlyPaymentResult)
    .then(res =>
      this.setState({ applyForDealMsg: res.data.msg, modalLoading: false })
    );
  }

  closeModal = () => this.setState({ showApplicationModal: false, applyForDealMsg: "" });

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    const {
      noOfPayments,
      amountFinanced,
    } = this.state;
    const setMonthlyPaymentResult = (monthlyPaymentResult: string) => this.setState({ monthlyPaymentResult });
    if(!this.inputFieldsValid()) {
      this.setState({ showErrors: true });
    } else {
      fetchMonthlyPaymentCalculation(Number(noOfPayments), Number(amountFinanced)).then(data => setMonthlyPaymentResult(data.result));
    }
  }

  render = () => {
    const {
      noOfPayments: fieldA,
      amountFinanced: fieldB,
      monthlyPaymentResult: result,
      applyForDealMsg,
      modalLoading,
      showApplicationModal,
      showErrors,
    } = this.state;
    console.log('State:', this.state);
    const setNoOfPayments = (noOfPayments: string) => this.setState({ noOfPayments });
    const setAmountFinanced = (amountFinanced: string) => this.setState({ amountFinanced });

    return (
      <div className="calculator-form-container">
        <form
          onSubmit={ event => this.onSubmit(event) }
        >
          { showErrors && this.renderInputError() }
          <div className="calculator-form-input">
            <label>Car cost:</label>
            <input type="number" value={fieldA} onChange={ event => setAmountFinanced(event.target.value) } />
          </div>
          <div className="calculator-form-input">
            <label>Number of months (6-36):</label>
            <input type="number" value={fieldB} onChange={ event => setNoOfPayments(event.target.value) } />
          </div>
          <div className="calculator-form-result">No of payments: { Number(result).toFixed(2) }</div>
          <input type="submit" value="Submit" />
          { this.displayNoOfPaymentsError() }
          { result }
        </form>
        { this.allValuesValid() && this.renderApplicationArea() }
        {
          showApplicationModal &&
          ApplicationModal({
            text: applyForDealMsg,
            buttonText: MODAL_BUTTON_TEXT,
            onClick: this.closeModal,
            loadingText: MODAL_LOADING_TEXT,
            isLoading: modalLoading
          })
        }
      </div>
    );
  }
}