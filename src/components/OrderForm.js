import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome'

const e = React.createElement

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

// const Item = props => (
//   <div>
//     {props.name} <Button handleClick={props.handleClick} id={props.id} />
//   </div>
// )

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
  const entries = Object.entries(props.order)
  let total = 0
  const items = entries.map(entry => {
    const id = parseInt(entry[0])
    const count = entry[1]

    const item = props.items.find(i => i.id === id)

    total += item.price * count

    return (
      <div>
        {item.name}: {count}
      </div>
    )
  })

  return (
    <div>
      <h4>Current Order</h4>
      {items}
      <hr />
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
      order: {}
    }
  }

  render() {
    const items = []
    this.props.categories.forEach(category => category.items.forEach(item => items.push(item)))

    const itemListProps = {
      items,
      handleClick: this.handleClick.bind(this)
    }

    return (
      <div>
        <Row>
          <Col>
            <ItemList {...itemListProps} />
          </Col>
          <Col>
            <CurrentOrder items={items} order={this.state.order} />
          </Col>
        </Row>
      </div>
    )
  }

  handleClick(id) {
    let order = { ...this.state.order }
    order[id] ? (order[id] += 1) : (order[id] = 1)

    this.setState({
      order
    })
  }
}

export default OrderForm