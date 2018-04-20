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

class Item extends Component {
  constructor() {
    super()
    this.state = {
      active: false
    }
  }

  render() {
    return (
      <div className='mb-3' >
        <ChevButton onClick={this.toggleActive.bind(this)} /> {this.props.name}
        {this.state.active && <Details handleClick={this.props.handleClick} id={this.props.id} />}
      </div>
    )
  }

  toggleActive() {
    this.setState({
      active: !this.state.active
    })
  }
}

const Details = props => (
  <div>
    <Button handleClick={props.handleClick} id={props.id} />
  </div>
)

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

const ItemList = ({ items, handleClick }) => {
  return items.map(item => {
    const options = { ...item, handleClick }
    return <Item {...options} key={item.id} />
  })
}

class OrderForm extends Component {
  constructor() {
    super()

    this.state = {
      currentItems: []
    }

    this.handleRemove = this.handleRemove.bind(this)
  }

  render() {
    const items = []
    this.props.categories.forEach(category => {
      category.items.forEach(item => items.push(item))
    })

    const itemListProps = {
      items,
      handleClick: this.handleClick.bind(this)
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
}

export default OrderForm