import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { removeOrderItem, saveOrder } from '../../actions/orderActions'

import Icon from '@fortawesome/react-fontawesome'

import { DFlex } from '../elements'

let OldCurrentOrder = props => {
  let total = 0

  const itemList = props.orderItems.map(item => {
    let itemPrice = item.price
    item.selectedOptions.forEach(({ price }) => (itemPrice += price))
    total += itemPrice

    return (
      <div key={item.cuid} className='d-flex'  >
        <div className='p-2' >
          <button onClick={() => props.removeOrderItem(item.cuid)} className='btn btn-link' ><Icon icon='times' /></button> {item.name}
        </div>
        <div className='ml-auto align-self-center p-2' >
          ${itemPrice}
        </div>
      </div>
    )
  })

  return (
    <div>
      <h4>Current Order</h4>
      {itemList}
      <DFlex opt='mb-2' >
        <h4 className='align-self-center mb-0' >Total</h4>
        <div className='ml-auto p-2' >
          ${total}
        </div>
      </DFlex>

      <DFlex>
        <button className='btn btn-success ml-auto' onClick={() => props.saveOrder()} >
          <Icon icon='check' /> Save Order
        </button>
      </DFlex>
    </div>
  )
}






class CurrentOrder extends React.Component {
  render() {
    return (
      <div>
        <h4>Current Order</h4>
        <OrderItemList orderItems={this.props.orderItems} removeOrderItem={this.props.removeOrderItem} />

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

  saveOrder = event => {
    this.props.saveOrder()
  }

  total = () => {
    return this.props.orderItems.reduce((total, item) => total + item.price, 0)
  }
}

const OrderItemList = props => {
  return props.orderItems.map(oi => <OrderItem {...oi} key={oi.cuid} removeOrderItem={props.removeOrderItem} />)
}

const OrderItem = props => {
  const itemPrice = props.selectedOptions.reduce((total, option) => {
    return total + option.price
  }, props.price)

  return (
    <DFlex>
      <div className='p-2' >
        <button onClick={() => props.removeOrderItem(props.cuid)} className='btn btn-link' ><Icon icon='times' /></button> {props.name}
      </div>
      <div className='ml-auto align-self-center p-2' >
        ${itemPrice}
      </div>
    </DFlex>
  )
}

const mapState = state => {
  return {
    orderItems: state.order.items
  }
}

const mapDispatch = dispatch => {
  const actions = { removeOrderItem, saveOrder }
  return bindActionCreators(actions, dispatch)
}

export default CurrentOrder = connect(mapState, mapDispatch)(CurrentOrder)