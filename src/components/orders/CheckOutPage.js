import React, { Component } from 'react'

import { FormGroup, FormControl } from '../locations/formComponents/elements'
import { saveOrder, checkOut, updateOrder } from '../../actions/orderActions'

import CurrentOrderDisplay from './CurrentOrderDisplay'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BCol, Row, Radio, FormRow, FormCheck, Btn, DFlex } from '../elements';

import Icon from '@fortawesome/react-fontawesome'

class CheckOutPage extends Component {
  render() {
    const cash = this.props.paymentType === 'cash'
    const card = this.props.paymentType === 'card'
    return (
      <div>
        <Row>
          <BCol>

            <DFlex opt='justify-content-around' >
              <Radio name='paymentType' value='cash' checked={cash} onChange={this.onChange} >
                <span className='font-weight-light h2'><Icon icon={cash ? 'check-square' : 'square'} /> Cash</span>
              </Radio>
              <Radio name='paymentType' value='card' checked={card} onChange={this.onChange} >
                <span className='font-weight-light h2' ><Icon icon={card ? 'check-square' : 'square'} /> Card</span>
              </Radio>
            </DFlex>

            <FormGroup>
              <FormControl
                disabled={cash}
                placeholder='Card Number'
                name='cardNumber'
                value={this.props.cardNumber}
                onChange={this.onChange} />
            </FormGroup>

            <FormGroup>
              <FormControl
                placeholder='Full Name'
                name='fullName'
                value={this.props.fullName}
                onChange={this.onChange} />

            </FormGroup>

            <FormGroup>
              <FormControl
                placeholder='Street'
                name='street'
                value={this.props.street}
                onChange={this.onChange} />

            </FormGroup>
          </BCol>

          <BCol>
            <h4>Current Order</h4>

            <CurrentOrderDisplay orderItems={this.props.orderItems} />

            <FormGroup>
              <div className='input-group'>
                <div className='input-group-prepend' >
                  <span className='input-group-text' >$</span>
                </div>
                <FormControl placeholder='Tip' />
              </div>
            </FormGroup>

          </BCol>
        </Row>

        <div className='text-right'>
          <Btn opt='primary' onClick={this.goBack} > <Icon icon='arrow-left' /> Go Back </Btn>
          <Btn opt='success' onClick={this.saveOrder} ><Icon icon='check' /> Save Order</Btn>
        </div>
      </div>
    )
  }

  saveOrder = () => this.props.saveOrder()
  goBack = () => this.props.checkOut()

  onChange = event => {
    const { name, value } = event.target
    this.props.updateOrder({ [name]: value })
  }
}

const mapState = state => {
  const order = state.order.order
  return {
    orderItems: state.order.items,
    ...order
  }
}

const mapDispatch = dispatch => {
  const actions = { checkOut, saveOrder, updateOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(CheckOutPage)