import React, { Component } from 'react'

import { DFlex } from '../elements'

import OrderItem from './OrderItem'

class CurrentOrderDisplay extends Component {
  render() {
    return (
      <div>
        <OrderItemList edit={this.props.edit} orderItems={this.props.orderItems} />

        <DFlex opt='mb-2' >
          <h4 className='align-self-center mb-0' >Total</h4>

          <div className='ml-auto p-2' >
            ${this.total()}
          </div>
        </DFlex>
      </div>
    )
  }

  total = () => {
    const itemReducer = (total, item) => total + item.selectedOptions.reduce(optionReducer, item.price)
    const optionReducer = (total, option) => total + option.price

    return this.props.orderItems.reduce(itemReducer, 0)
  }
}

const OrderItemList = props => {
  return props.orderItems.map(oi => <OrderItem edit={props.edit} {...oi} key={oi.id ? oi.id : oi.cuid} />)
}

export default CurrentOrderDisplay