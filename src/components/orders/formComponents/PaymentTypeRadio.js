import React, { Component } from 'react';
import { CheckOutFlex, CheckOutRadio } from './CheckOutRadio';

class PaymentTypeRadio extends Component {
  render() {
    const { cash, card, onChange } = this.props
    return (
      <CheckOutFlex name='paymentType' onChange={onChange}>
        <CheckOutRadio value='cash' checked={cash} title='Cash' />

        <CheckOutRadio value='card' checked={card} title='Card' />
      </CheckOutFlex>
    )
  }
}

export default PaymentTypeRadio