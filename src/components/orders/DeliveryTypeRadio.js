import React, { Component } from 'react';
import { CheckOutFlex, CheckOutRadio } from './CheckOutRadio';

class DeliveryTypeRadio extends Component {
  render() {
    const { pickup, delivery, onChange } = this.props
    return (
      <CheckOutFlex name='deliveryType' onChange={onChange}>
        <CheckOutRadio value='pickup' checked={pickup} title='Pickup' />

        <CheckOutRadio value='delivery' checked={delivery} title='Delivery' />
      </CheckOutFlex>
    )
  }
}

export default DeliveryTypeRadio