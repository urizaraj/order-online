import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from '@fortawesome/react-fontawesome'
import cuid from 'cuid'
import { addActiveItem, removeActiveItem } from '../actions/activeItemActions'
import Item from './Item'

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
    this.handleSelect = this.handleSelect.bind(this)
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
      handleSelect: this.handleSelect,
      activeItem: this.props.activeItem,
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

  handleSelect(id) {
    if (this.props.activeItem === id) {
      this.props.removeActiveItem()
    } else {
      this.props.addActiveItem(id)
    }
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

const CurrentOrder = props => {
  let total = 0

  props.currentItems.forEach(item => {
    total += item.price
  })

  const itemList = props.currentItems.map(item => {
    return (
      <div key={item.cuid} >
        {item.name} <button onClick={() => props.handleRemove(item.cuid)} className='btn btn-link' ><Icon icon='times' /></button>
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

const ItemList = ({ items, handleAddItem, handleSelect, activeItem, selectedOptions, handleOptionSelect }) => {
  return items.map(item => {
    const active = activeItem === item.id
    const props = { ...item, handleAddItem, handleSelect, handleOptionSelect, active }
    if (active) {
      props.selectedOptions = selectedOptions
    }
    return <Item {...props} key={item.id} />
  })
}

const mapStateToProps = state => {
  return { activeItem: state.activeItem.item, selectedOptions: state.activeItem.options }
}

const mapDispatchToProps = dispatch => {
  const actions = {
    addActiveItem,
    removeActiveItem
  }

  return bindActionCreators(actions, dispatch)
}

export default OrderForm = connect(mapStateToProps, mapDispatchToProps)(OrderForm)