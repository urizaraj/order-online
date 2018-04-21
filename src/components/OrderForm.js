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

    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleOptionSelect = this.handleOptionSelect.bind(this)
  }

  render() {
    const items = []
    this.props.categories.forEach(category => {
      category.items.forEach(item => items.push(item))
    })

    const itemListProps = {
      items,
      handleOptionSelect: this.handleOptionSelect,
      handleAddItem: this.handleAddItem,
      selectedOptions: this.props.selectedOptions
    }

    const currentOrderProps = {
      items,
      handleRemove: this.handleRemove,
      currentItems: this.state.currentItems
    }

    return (
      <div>
        <Row>
          <Col>
            <ItemList {...itemListProps} />
          </Col>
          <Col>
            <CurrentOrder {...currentOrderProps} />
          </Col>
        </Row>
      </div>
    )
  }

  handleAddItem(id) {
    const items = []
    this.props.categories.forEach(category => {
      category.items.forEach(item => items.push(item))
    })

    const item = { ...items.find(i => i.id === id) }
    item.cuid = cuid()

    this.setState({
      currentItems: [...this.state.currentItems, item]
    })
  }

  handleRemove(itemCuid) {
    this.setState({
      currentItems: this.state.currentItems.filter(({ cuid }) => cuid !== itemCuid)
    })
  }

  handleOptionSelect(option) {
    const selectedOptions = [...this.state.selectedOptions]

    if (selectedOptions.includes(option)) {
      this.setState({
        selectedOptions: selectedOptions.filter(o => o !== option)
      })
    } else {
      this.setState({
        selectedOptions: [...this.state.selectedOptions, option]
      })
    }
  }
}

let CurrentOrder = props => {
  let total = 0

  props.orderItems.forEach(item => {
    total += item.price
  })

  const itemList = props.orderItems.map(item => {
    const cid = cuid()
    return (
      <div key={item.cuid} >
        {item.name} <button onClick={() => props.removeOrderItem(item.cuid)} className='btn btn-link' ><Icon icon='times' /></button>
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

const ItemList = ({ items, handleAddItem, selectedOptions, handleOptionSelect }) => {
  return items.map(item => {
    const props = { ...item, handleAddItem, handleOptionSelect }
    return <Item {...props} key={item.id} />
  })
}

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