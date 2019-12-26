
import React, { useState } from 'react';
import { Header } from './Header';
import { Tab } from './Tab';
import { CalculationForm } from './CalculationForm';
import * as services from '../services'

export enum CalculationType {
  noOfPayments,
  amountFinanced,
  monthlyPayment
}

export const Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState(CalculationType.noOfPayments);

  const styleFlexCenterHorizontal = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
      { CalculationForm({ type: activeTab, calculation: services.fetchMonthlyPaymentCalculation }) }
    </div>
  );
}
