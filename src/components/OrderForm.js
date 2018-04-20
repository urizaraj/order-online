import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome'

const e = React.createElement

const Row = props => (
  <div className="row">
    {props.children}
  </div>
)

const Button = props => (
  <button className="btn btn-primary" onClick={() => props.handleClick(props.id)} >
    <Icon icon='plus' />
  </button>
)

const Item = props => (
  <div>
    {props.name} <Button handleClick={props.handleClick} id={props.id} />
  </div>
)

const Col = props => (
  <div className='col' >
    {props.children}
  </div>
)

const CurrentOrder = props => {
  const entries = Object.entries(props.order)
  let total = 0
  const items = entries.map(entry => {
    const [id, count] = entry

    const item = props.items.find(i => i.id === parseInt(id))

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
      <hr/>
      <h4>Total</h4>
      ${total}
    </div>
  )
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

    return (
      <div>
        <Row>
          <Col>
            {items.map(item => <Item {...item} handleClick={this.handleClick.bind(this)} key={item.id} />)}
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