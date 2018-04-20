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
  <button className="btn btn-primary" onClick={() => props.handleClick(props.id)} >
    <Icon icon='plus' /> Add to Order
  </button>
)

const ChevButton = ({onClick}) => (
  <button className="btn btn-primary" {...{onClick}} ><Icon icon='chevron-down' /></button>
)

class OrderForm extends Component {
  constructor() {
    super()

    this.state = {
      currentItems: [],
      activeItem: null
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  render() {
    const items = []
    this.props.categories.forEach(category => {
      category.items.forEach(item => items.push(item))
    })

    const itemListProps = {
      items,
      handleClick: this.handleClick,
      handleSelect: this.handleSelect,
      activeItem: this.state.activeItem
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

  handleClick(id) {
    const items = []
    this.props.categories.forEach(category => {
      category.items.forEach(item => items.push(item))
    })

    const item = {...items.find(i => i.id === id)}
    item.cuid = cuid()

    this.setState({
      currentItems: [...this.state.currentItems, item]
    })
  }

  handleRemove(itemCuid) {
    this.setState({
      currentItems: this.state.currentItems.filter(({cuid}) => cuid !== itemCuid)
    })
  }

  handleSelect(id) {
    if (this.state.activeItem === id) {
      this.setState({
        activeItem: null
      })
    } else {
      this.setState({
        activeItem: id
      })
    }

  }
}

const Item = props => {
  return (
    <div className='mb-3' >
    <ChevButton onClick={() => props.handleSelect(props.id)} /> {props.name}
    {props.active && <Details handleClick={props.handleClick} id={props.id} options={props.options} />}
  </div>
  )
}

const Details = props => (
  <div>
    <div>
      {props.options.map(Option)}
    </div>
    <Button handleClick={props.handleClick} id={props.id} />
  </div>
)

const Option = props => {
  return (
    <div className='p-3 d-inline-block' >{props.name}</div>
  )
}

const SelectedOption = props => {
  return (
    <div className='p-3 d-inline-block bg-primary text-light' >{props.name}</div>
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

const ItemList = ({ items, handleClick, handleSelect, activeItem }) => {
  return items.map(item => {
    const options = { ...item, handleClick, handleSelect, active: (activeItem === item.id) }
    return <Item {...options} key={item.id} />
  })
}

export default OrderForm