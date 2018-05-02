import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { saveOrder } from '../../actions/orderActions'

import Icon from '@fortawesome/react-fontawesome'

import { DFlex } from '../elements'

import OrderItem from './OrderItem'

class CurrentOrder extends React.Component {
  render() {
    return (
      <div>
        <h4>Current Order</h4>
        <OrderItemList orderItems={this.props.orderItems} />

        <DFlex opt='mb-2' >
          <h4 className='align-self-center mb-0' >Total</h4>

          <div className='ml-auto p-2' >
            ${this.total()}
          </div>
        </DFlex>

        <DFlex>
          <button className='btn btn-success ml-auto' onClick={this.saveOrder} >
            <Icon icon='check' /> Save Order
          </button>
        </DFlex>
      </div>
    )
  }

  saveOrder = event => this.props.saveOrder()

  total = () => {
    const itemReducer = (total, item) => total + item.selectedOptions.reduce(optionReducer, item.price)
    const optionReducer = (total, option) => total + option.price

    return this.props.orderItems.reduce(itemReducer, 0)
  }
}

const OrderItemList = props => {
  return props.orderItems.map(oi => <OrderItem {...oi} key={oi.cuid} />)
}

const mapState = state => {
  return {
    orderItems: state.order.items
  }
}

const mapDispatch = dispatch => {
  const actions = { saveOrder }
  return bindActionCreators(actions, dispatch)
}

export default CurrentOrder = connect(mapState, mapDispatch)(CurrentOrder)