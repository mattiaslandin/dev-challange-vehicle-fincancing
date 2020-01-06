
import React, { useState } from 'react';
import { Header } from '../Misc/Header';
import { Tab } from '../Misc/Tab';
import { NoOfPaymentsForm } from '../Forms/NoOfPaymentsForm';
import { AmountFinancedForm } from '../Forms/AmountFinancedForm';
import { MonthlyPaymentForm } from '../Forms/MonthlyPaymentForm';
import './Calculator.css';

enum CalculationType {
  noOfPayments,
  amountFinanced,
  monthlyPayment
}

export const Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState(CalculationType.noOfPayments);

  return (
    <div className="calculator-container">
      <Header />
      <div className="calculator-content">
        <div className="calculator-tabs" >
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
        <div className="calculator-forms">
          { activeTab === CalculationType.noOfPayments && <NoOfPaymentsForm /> }
          { activeTab === CalculationType.amountFinanced && <AmountFinancedForm /> }
          { activeTab === CalculationType.monthlyPayment && <MonthlyPaymentForm /> }
        </div>
      </div>
    </div>
  );
}
