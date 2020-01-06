import React from "react";
import { fetchAmountFinancedCalculation, ServiceResponse } from '../services';
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
  monthlyPayment: string
  noOfPayments: string
  amountFinancedResult: string
  showApplicationModal: boolean,
  showErrors: boolean,
  applyForDealMsg: string,
  modalLoading: boolean,
  applicationSuccessful: boolean
}

export class AmountFinancedForm extends React.Component<{}, CalculationFormState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      monthlyPayment: "",
      noOfPayments: "",
      amountFinancedResult: "",
      showApplicationModal: false,
      showErrors: false,
      applyForDealMsg: "",
      modalLoading: false,
      applicationSuccessful: false
    };
  }

  renderInputError = () => {
    const noOfPaymentsErrorTxt = getNoOfPaymentsStatusText(this.state.noOfPayments);
    const monthlyPaymentErrorTxt = getMonthlyPaymentStatusText(this.state.monthlyPayment);

    if (!noOfPaymentsErrorTxt && !monthlyPaymentErrorTxt) {
      return null
    }
    return (
      <div>
        ERROR:
        {noOfPaymentsErrorTxt && noOfPaymentsErrorTxt}
        {monthlyPaymentErrorTxt && monthlyPaymentErrorTxt}
      </div>
    )
  }

  displayAmountFinancedError = () => {
    const amountFinancedErrorTxt = getAmountFinancedStatusText(this.state.amountFinancedResult);
    if (!amountFinancedErrorTxt) {
      return null
    }
    return (
      <div className="calculator-form-error">
        ERROR: {amountFinancedErrorTxt}
      </div>
    )
  }

  inputFieldsValid = () => {
    const { noOfPayments, monthlyPayment } = this.state;
    const noOfPaymentsState = checkNoOfPayments(noOfPayments);
    const monthlyPaymentState = checkMonthlyPayment(monthlyPayment);
    return noOfPaymentsState   === ValidationResult.OK &&
           monthlyPaymentState === ValidationResult.OK;
  }

  allValuesValid = () => {
    const { noOfPayments, monthlyPayment, amountFinancedResult } = this.state;
    const noOfPaymentsState = checkNoOfPayments(noOfPayments);
    const monthlyPaymentState = checkMonthlyPayment(monthlyPayment);
    const amountFinancedState = checkAmountFinanced(amountFinancedResult);
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
    const { noOfPayments, monthlyPayment, amountFinancedResult } = this.state;
    this.setState({ showApplicationModal: true, modalLoading: true })
    applyForDeal(noOfPayments, amountFinancedResult, monthlyPayment)
    .then((res: ServiceResponse) =>
      this.setState({ applicationSuccessful: res.ok, applyForDealMsg: res.data, modalLoading: false })
    );
  }

  closeModal = () => this.setState({ showApplicationModal: false, applyForDealMsg: "" });

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    const {
      monthlyPayment,
      noOfPayments,
    } = this.state;
    const setAmountFinancedResult = (amountFinancedResult: string) =>
      this.setState({ amountFinancedResult });
    if(!this.inputFieldsValid()) {
      this.setState({ showErrors: true });
    } else {
      fetchAmountFinancedCalculation(Number(noOfPayments), Number(monthlyPayment)).then((result: ServiceResponse) => {
        setAmountFinancedResult(result.data);
      });
    }
  }

  render = () => {
    const {
      monthlyPayment,
      noOfPayments,
      amountFinancedResult: result,
      applyForDealMsg,
      modalLoading,
      showApplicationModal,
      showErrors,
      applicationSuccessful
    } = this.state;
    console.log('State:', this.state);
    const setMonthlyPayment = (monthlyPayment: string) => this.setState({ monthlyPayment });
    const setNoOfPayments = (noOfPayments: string) => this.setState({ noOfPayments });

    return (
      <div className="calculator-form-container">
        <form
          onSubmit={ event => this.onSubmit(event) }
        >
          { showErrors && this.renderInputError() }
          <div className="calculator-form-input">
            <label>Monthly payment:</label>
            <input disabled={ applicationSuccessful } type="number" value={ monthlyPayment } onChange={ event => setMonthlyPayment(event.target.value) } />
          </div>
          <div className="calculator-form-input">
            <label>Number of months (6-36):</label>
            <input disabled={ applicationSuccessful } type="number" value={ noOfPayments } onChange={ event => setNoOfPayments(event.target.value) } />
          </div>
          <input disabled={ applicationSuccessful } type="submit" value="Calculate" className="calculator-form-submit" />
          <div className="calculator-form-result">Amount financed: { result }</div>
          { this.displayAmountFinancedError() }
        </form>
        { (this.allValuesValid() && !applicationSuccessful) && this.renderApplicationArea() }
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