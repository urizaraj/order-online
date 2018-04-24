import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from '@fortawesome/react-fontawesome'
// import cuid from 'cuid'
// import { addActiveItem, removeActiveItem } from '../actions/activeItemActions'
import Item from './Item'
import { removeOrderItem, saveOrder, resetOrder } from '../actions/orderActions'

// const e = React.createElement

const Row = props => (
  <div className="row">
    {props.children}
  </div>
)

const Col = props => (
  <div className='col' >
    {props.children}
  </div>
)

class OrderForm extends Component {
  constructor() {
    super()

    this.state = {
      currentItems: [],
    }
  }

  render() {
    const items = []
    this.props.categories.forEach(category => {
      category.items.forEach(item => items.push(item))
    })

    return (
      <div>
        <Row>
          <Col>
            <ItemList {...{ items }} />
          </Col>
          <Col>
            <CurrentOrder {...{ items }} />
          </Col>
        </Row>
      </div>
    )
  }

  componentWillUnmount() {
    this.props.resetOrder()
  }
}

let CurrentOrder = props => {
  let total = 0

  props.orderItems.forEach(item => {

  })

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
      <div className='d-flex' >
        <h4 className='align-self-center mb-0' >Total</h4>
        <div className='ml-auto p-2' >
          ${total}
        </div>
      </div>
      <button className='btn btn-success' onClick={() => props.saveOrder()} >
        Save Order
      </button>
    </div>
  )
}

const ItemList = ({ items }) => {
  return items.map(item => <Item {...item} key={item.id} />)
}

// connecting to the store

const mapStateToProps = state => {
  return { selectedOptions: state.activeItem.options }
}

const mapStateToCurrentOrderProps = state => {
  return {
    orderItems: state.order.items
  }
}

const mapDispatchToProps = dispatch => {
  const actions = { removeOrderItem, saveOrder }
  return bindActionCreators(actions, dispatch)
}

const mapDispatchToOrderFormProps = dispatch => {
  const actions = { resetOrder }
  return bindActionCreators(actions, dispatch)
}

CurrentOrder = connect(mapStateToCurrentOrderProps, mapDispatchToProps)(CurrentOrder)

export default OrderForm = connect(mapStateToProps, mapDispatchToOrderFormProps)(OrderForm)