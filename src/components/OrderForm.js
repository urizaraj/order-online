import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome'
import cuid from 'cuid'

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

const Button = props => (
  <button className="btn btn-primary" onClick={() => props.handleAddItem(props.id)} >
    <Icon icon='plus' /> Add to Order
  </button>
)

const ChevButton = ({ onClick }) => (
  <button className="btn btn-primary" {...{ onClick }} ><Icon icon='chevron-down' /></button>
)

class OrderForm extends Component {
  constructor() {
    super()

    this.state = {
      currentItems: [],
      activeItem: null,
      selectedOptions: []
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
      activeItem: this.state.activeItem,
      selectedOptions: this.state.selectedOptions
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
    if (this.state.activeItem === id) {
      this.setState({
        activeItem: null,
        selectedOptions: []
      })
    } else {
      this.setState({
        activeItem: id
      })
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

const Item = props => {
  return (
    <div className='mb-3' >
      <ChevButton onClick={() => props.handleSelect(props.id)} /> {props.name}
      {props.active && <Details handleAddItem={props.handleAddItem} id={props.id} options={props.options} selectedOptions={props.selectedOptions} handleOptionSelect={props.handleOptionSelect} />}
    </div>
  )
}

const Details = props => (
  <div>
    <div>
      {props.options.map(option => {
        const newProps = { option, handleOptionSelect: props.handleOptionSelect }
        return props.selectedOptions.includes(option) ? SelectedOption(newProps) : Option(newProps)
      })}
    </div>
    <Button handleAddItem={props.handleAddItem} id={props.id} />
  </div>
)

const Option = props => {
  return (
    <div onClick={() => props.handleOptionSelect(props.option)} className='p-3 d-inline-block' >{props.option.name}</div>
  )
}

const SelectedOption = props => {
  return (
    <div onClick={() => props.handleOptionSelect(props.option)} className='p-3 d-inline-block bg-primary text-light' >{props.option.name}</div>
  )
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

export default OrderForm