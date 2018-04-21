import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from '@fortawesome/react-fontawesome'
import cuid from 'cuid'
// import { addActiveItem, removeActiveItem } from '../actions/activeItemActions'
import Item from './Item'
import { removeOrderItem } from '../actions/orderActions'

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
}

let CurrentOrder = props => {
  let total = 0

  props.orderItems.forEach(item => {
    total += item.price
  })

  const itemList = props.orderItems.map(item => {
    return (
      <div key={item.cuid} >
        <button onClick={() => props.removeOrderItem(item.cuid)} className='btn btn-link' ><Icon icon='times' /></button> {item.name}
      </div>
    )
  })

  return (
    <div>
      <h4>Current Order</h4>
      {itemList}
      <h4>Total</h4>
      ${total}
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
  const actions = { removeOrderItem }
  return bindActionCreators(actions, dispatch)
}

CurrentOrder = connect(mapStateToCurrentOrderProps, mapDispatchToProps)(CurrentOrder)

export default OrderForm = connect(mapStateToProps)(OrderForm)