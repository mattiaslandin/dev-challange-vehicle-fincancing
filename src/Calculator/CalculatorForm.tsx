import React from "react";
import { ApplicationModal } from '../ApplicationModal/ApplicationModal';
import { applyForDeal } from '../services/applyForDeal';
import {
  fetchNoOfPaymentsCalculation,
  fetchAmountFinancedCalculation,
  fetchMonthlyPaymentCalculation,
  ServiceResponse
} from '../services';
import {
  getAmountFinancedStatusText,
  getMonthlyPaymentStatusText,
  getNoOfPaymentsStatusText,
  checkAmountFinanced,
  checkMonthlyPayment,
  checkNoOfPayments,
  ValidationResult
} from './validations';
import "./CalculatorForms.css";

const noOfPaymentsFormProps = {
  fieldAText: "Monthly payment €",
  fieldBText: "Amount financed (1000€ - 10000€)",
  resultText: "Number of months",
  checkFieldA: checkMonthlyPayment,
  checkFieldB: checkAmountFinanced,
  checkResult: checkNoOfPayments,
  getFieldAStatusText: getMonthlyPaymentStatusText,
  getFieldBStatusText: getAmountFinancedStatusText,
  getResultStatusText: getNoOfPaymentsStatusText,
  calculation: fetchNoOfPaymentsCalculation,
  applyForDeal: (fieldA: number, fieldB: number, result: number) =>
    applyForDeal(result, fieldB, fieldA),
}

const amountFinancedFormProps = {
  fieldAText: "Monthly payment €",
  fieldBText: "Number of months (6-36)",
  resultText: "Amount financed (€)",
  checkFieldA: checkMonthlyPayment,
  checkFieldB: checkNoOfPayments,
  checkResult: checkAmountFinanced,
  getFieldAStatusText: getMonthlyPaymentStatusText,
  getFieldBStatusText: getNoOfPaymentsStatusText,
  getResultStatusText: getAmountFinancedStatusText,
  calculation: fetchAmountFinancedCalculation,
  applyForDeal: (fieldA: number, fieldB: number, result: number) =>
  applyForDeal(fieldB, result, fieldA),
}

const monthlyPaymentFormProps = {
  fieldAText: "Amount financed (1000€ - 10000€)",
  fieldBText: "Number of months (6-36)",
  resultText: "Monthly payment (€)",
  checkFieldA: checkAmountFinanced,
  checkFieldB: checkNoOfPayments,
  checkResult: checkMonthlyPayment,
  getFieldAStatusText: getAmountFinancedStatusText,
  getFieldBStatusText: getNoOfPaymentsStatusText,
  getResultStatusText: getMonthlyPaymentStatusText,
  calculation: fetchMonthlyPaymentCalculation,
  applyForDeal: (fieldA: number, fieldB: number, result: number) =>
  applyForDeal(fieldB, fieldA, result),
}

export const NoOfPaymentsForm: React.FC = () => <CalculatorForm { ...noOfPaymentsFormProps } />
export const AmountFinancedForm: React.FC = () => <CalculatorForm { ...amountFinancedFormProps } />
export const MonthlyPaymentForm: React.FC = () => <CalculatorForm { ...monthlyPaymentFormProps } />

const MODAL_LOADING_TEXT = "Processing your application";
const MODAL_BUTTON_TEXT = "OK";

export interface CalculationFormProps {
  fieldAText: string,
  fieldBText: string,
  resultText: string,
  checkFieldA: (fieldA: string) => ValidationResult,
  checkFieldB: (fieldB: string) => ValidationResult,
  checkResult: (result: string) => ValidationResult,
  getFieldAStatusText: (fieldA: string) => string,
  getFieldBStatusText: (fieldB: string) => string,
  getResultStatusText: (result: string) => string,
  calculation: (fieldA: number, fieldB: number) => Promise<ServiceResponse>
  applyForDeal: (fieldA: number, fieldB: number, result: number) => Promise<ServiceResponse>
}

export interface CalculationFormState {
  fieldA: string,
  fieldB: string,
  result: string,
  showApplicationModal: boolean,
  showErrors: boolean,
  applyForDealMsg: string,
  modalLoading: boolean,
  applicationSuccessful: boolean
}

export class CalculatorForm extends React.Component<CalculationFormProps, CalculationFormState> {

  constructor(props: CalculationFormProps) {
    super(props);
    this.state = {
      fieldA: "",
      fieldB: "",
      result: "",
      showApplicationModal: false,
      showErrors: false,
      applyForDealMsg: "",
      modalLoading: false,
      applicationSuccessful: false
    };
  }

  renderInputError = () => {
    const {
      getFieldAStatusText,
      getFieldBStatusText
    } = this.props;
    const fieldAErrorTxt = getFieldAStatusText(this.state.fieldA);
    const fieldBErrorTxt = getFieldBStatusText(this.state.fieldB);

    if (!fieldAErrorTxt && !fieldBErrorTxt) {
      return null
    }

    return (
      <div className="calculator-form-input-error" >
        ERROR:&nbsp;
        {fieldAErrorTxt && fieldAErrorTxt}
        {fieldBErrorTxt && fieldBErrorTxt}
      </div>
    )
  }

  displayResultError = () => {
    const noOfPaymentsErrorTxt = this.props.getResultStatusText(this.state.result);
    if (!noOfPaymentsErrorTxt) {
      return null
    }
    return (
      <div className="calculator-form-error">
        ERROR: {noOfPaymentsErrorTxt}
      </div>
    )
  }

  inputFieldsValid = () => {
    const { fieldA, fieldB } = this.state;
    const { checkFieldA, checkFieldB } = this.props;
    const fieldAState = checkFieldA(fieldA);
    const fieldBState = checkFieldB(fieldB);
    return fieldAState === ValidationResult.OK &&
           fieldBState === ValidationResult.OK;
  }

  allValuesValid = () => {
    const { fieldA, fieldB, result: calculationResult } = this.state;
    const { checkFieldA, checkFieldB, checkResult } = this.props;
    const fieldAState = checkFieldA(fieldA);
    const fieldBState = checkFieldB(fieldB);
    const resultState = checkResult(calculationResult);
    return fieldAState === ValidationResult.OK &&
           fieldBState === ValidationResult.OK &&
           resultState === ValidationResult.OK;
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
    const { fieldA, fieldB, result } = this.state;
    this.setState({ showApplicationModal: true, modalLoading: true })
    this.props.applyForDeal(Number(fieldA), Number(fieldB), Number(result))
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
      fieldB,
      fieldA,
    } = this.state;
    if(!this.inputFieldsValid()) {
      this.setState({ showErrors: true });
    } else {
      this.props.calculation(Number(fieldA), Number(fieldB)).then((result: ServiceResponse) => {
        this.setState({ result: result.data });
      });
    }
  }

  render = () => {
    const {
      fieldAText,
      fieldBText,
      resultText
    } = this.props;
    const {
      fieldB,
      fieldA,
      result,
      applyForDealMsg,
      modalLoading,
      showApplicationModal,
      showErrors,
      applicationSuccessful
    } = this.state;
    const setFieldA = (fieldA: string) => this.setState({ fieldA });
    const setFieldB = (fieldB: string) => this.setState({ fieldB });

    return (
      <div className="calculator-form-container">
        <form
          onSubmit={ event => this.onSubmit(event) }
        >
          { showErrors && this.renderInputError() }
          <div className="calculator-form-input">
            <label>{ fieldAText }:</label>
            <input disabled={ applicationSuccessful } type="number" value={ fieldA } onChange={ event => setFieldA(event.target.value) } />
          </div>
          <div className="calculator-form-input">
            <label>{ fieldBText }:</label>
            <input disabled={ applicationSuccessful } type="number" value={ fieldB } onChange={ event => setFieldB(event.target.value) } />
          </div>
          <input disabled={ applicationSuccessful } type="submit" value="Calculate" className="calculator-form-submit" />
          <div className="calculator-form-result">{ resultText }: { result }</div>
          { this.displayResultError() }
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
