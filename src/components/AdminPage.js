import React, { Component } from 'react'

class AdminPage extends Component {
  constructor() {
    super()

    this.state = {
      orders: []
    }
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return (
            <div className='mb-3' >
              {order.id} <strong>{order.user && order.user.name}</strong>
              {order.order_items.map(oi => {
                return (
                  <div>
                    {oi.name}
                    <div>
                      <small>{oi.instructions}</small>
                    </div>
                    {oi.selected_options.map(so => {
                      return (
                        <div>
                          <small>
                            {so.name}
                          </small>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  fetchOrders() {
    fetch('/orders')
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          orders: resp
        })
      })
  }

  componentDidMount() {
    this.fetchOrders()
  }
}

export default AdminPage