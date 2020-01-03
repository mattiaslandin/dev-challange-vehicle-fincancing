import React from "react";
import { fetchNoOfPaymentsCalculation } from '../services';
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

const MODAL_LOADING_TEXT = "Processing your application";
const MODAL_BUTTON_TEXT = "OK";

export interface CalculationFormState {
  monthlyPayment: string
  amountFinanced: string
  noOfPaymentsResult: string
  showApplicationModal: boolean,
  applyForDealMsg: string,
  modalLoading: boolean,
}

export class NoOfPaymentsForm extends React.Component<{}, CalculationFormState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      monthlyPayment: "",
      amountFinanced: "",
      noOfPaymentsResult: "",
      showApplicationModal: false,
      applyForDealMsg: "",
      modalLoading: false,
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
        <button onClick={() => this.applyForDeal()} >
          Apply for deal
        </button>
      </div>
    )
  }

  applyForDeal = async () => {
    const { amountFinanced, monthlyPayment, noOfPaymentsResult } = this.state;
    this.setState({ showApplicationModal: true, modalLoading: true })
    applyForDeal(noOfPaymentsResult, amountFinanced, monthlyPayment)
    .then(res =>
      this.setState({ applyForDealMsg: res.data.msg, modalLoading: false })
    );
  }

  closeModal = () => this.setState({ showApplicationModal: false, applyForDealMsg: "" });

  render = () => {
    const {
      monthlyPayment: fieldA,
      amountFinanced: fieldB,
      noOfPaymentsResult: result,
      applyForDealMsg,
      modalLoading,
      showApplicationModal
    } = this.state;
    console.log('State:', this.state);
    const setNoOfPaymentsResult = (noOfPaymentsResult: string) => this.setState({ noOfPaymentsResult })
    const setMonthlyPayment = (monthlyPayment: string) => this.setState({ monthlyPayment });
    const setAmountFinanced = (amountFinanced: string) => this.setState({ amountFinanced });

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
        {
          showApplicationModal &&
          ApplicationModal({
            text: applyForDealMsg,
            buttonText: MODAL_BUTTON_TEXT,
            onClick: this.closeModal,
            loadingText: MODAL_LOADING_TEXT,
            isLoading: modalLoading}
          )
        }
      </div>
    );
  }
}