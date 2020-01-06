import React from "react";
import { fetchMonthlyPaymentCalculation, ServiceResponse } from '../services';
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
  applicationSuccessful: boolean
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
      applicationSuccessful: false
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
      noOfPayments,
      amountFinanced,
    } = this.state;
    const setMonthlyPaymentResult = (monthlyPaymentResult: string) =>
      this.setState({ monthlyPaymentResult });
    if(!this.inputFieldsValid()) {
      this.setState({ showErrors: true });
    } else {
      fetchMonthlyPaymentCalculation(Number(noOfPayments), Number(amountFinanced)).then((result: ServiceResponse) => {
        setMonthlyPaymentResult(result.data);
      });
    }
  }

  render = () => {
    const {
      amountFinanced,
      noOfPayments,
      monthlyPaymentResult: result,
      applyForDealMsg,
      modalLoading,
      showApplicationModal,
      showErrors,
      applicationSuccessful
    } = this.state;
    console.log('State:', this.state);
    const setAmountFinanced = (amountFinanced: string) => this.setState({ amountFinanced });
    const setNoOfPayments = (noOfPayments: string) => this.setState({ noOfPayments });

    return (
      <div className="calculator-form-container">
        <form
          onSubmit={ event => this.onSubmit(event) }
        >
          { showErrors && this.renderInputError() }
          <div className="calculator-form-input">
            <label>Amount financed:</label>
            <input disabled={ applicationSuccessful } type="number" value={ amountFinanced } onChange={ event => setAmountFinanced(event.target.value) } />
          </div>
          <div className="calculator-form-input">
            <label>Number of months (6-36):</label>
            <input disabled={ applicationSuccessful } type="number" value={ noOfPayments } onChange={ event => setNoOfPayments(event.target.value) } />
          </div>
          <input disabled={ applicationSuccessful } type="submit" value="Calculate" className="calculator-form-submit" />
          <div className="calculator-form-result">Monthly payment: { result }</div>
          { this.displayNoOfPaymentsError() }
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