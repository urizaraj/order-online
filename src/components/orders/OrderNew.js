import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetOrder } from '../../actions/orderNewActions'

import Item from './Item'
import CurrentOrder from './CurrentOrder'
import CheckOutPage from './CheckOutPage'

import { Row, BCol, Btn } from '../elements'

class OrderNew extends Component {
  render() {

    if (this.props.saved) return <OrderSavedPrompt resetOrder={this.resetOrder} />
    if (this.props.checkOut) return <CheckOutPage />

    const items = []
    this.props.categories.forEach(category => {
      category.items.forEach(item => items.push(item))
    })

    return (
      <div>
        <Row>
          <BCol>
            <CategoryList categories={this.props.categories} />
          </BCol>
          <BCol>
            <CurrentOrder {...{ items }} />
          </BCol>
        </Row>
      </div>
    )
  }

  resetOrder = () => this.props.resetOrder()

  componentWillUnmount() {
    this.resetOrder()
  }
}

const OrderSavedPrompt = props => {
  return (
    <div>
      <h1>
        Order Saved!
      </h1>

      <Btn success onClick={props.resetOrder}>
        New Order
      </Btn>
    </div>
  )
}


const CategoryList = ({ categories }) => categories.map(cat => <Category {...cat} key={cat.id} />)

class Category extends Component {
  constructor() {
    super()
    this.state = { active: false }
  }

  render() {
    const props = this.props

    return (
      <div>
        <h2>{props.name}</h2>
        {/* {this.state.active && <ItemList items={props.items} />} */}
        <ItemList items={props.items} />
      </div>
    )
  }

  toggle = () => this.setState({ active: !this.state.active })
}

const ItemList = ({ items }) => {
  return items.map(item => <Item {...item} key={item.id} />)
}

//#region connecting to store

const mapState = state => {
  return {
    categories: state.menu.categories,
    selectedOptions: state.activeItem.options,
    saved: state.order.saved,
    checkOut: state.order.checkOut
  }
}

const mapDispatch = dispatch => {
  const actions = { resetOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(OrderNew)

//#endregion