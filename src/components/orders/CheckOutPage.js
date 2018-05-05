import React, { Component } from 'react'

import { FormGroup, FormControl } from '../locations/formComponents/elements'
import { checkOut, saveOrder } from '../../actions/orderActions'
import { updateOrder } from '../../actions/orderNewActions'

import CurrentOrderDisplay from './CurrentOrderDisplay'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BCol, Row, Radio, FormRow, Btn, DFlex } from '../elements';

import Icon from '@fortawesome/react-fontawesome'

class CheckOutPage extends Component {
  render() {
    const cash = this.props.paymentType === 'cash'
    const card = this.props.paymentType === 'card'
    const pickup = this.props.deliveryType === 'pickup'
    const delivery = this.props.deliveryType === 'delivery'
    return (
      <div>
        <Row>
          <BCol>

            <DFlex opt='justify-content-around text-primary mb-2' >
              <Radio name='deliveryType' value='pickup' checked={pickup} onChange={this.onChange} >
                <span className='font-weight-light h2'><Icon icon={pickup ? 'dot-circle' : 'circle'} /> Pickup</span>
              </Radio>
              <Radio name='deliveryType' value='delivery' checked={delivery} onChange={this.onChange} >
                <span className='font-weight-light h2' ><Icon icon={delivery ? 'dot-circle' : 'circle'} /> Delivery</span>
              </Radio>
            </DFlex>

            <FormGroup>
              <FormControl
                placeholder='Full Name'
                name='fullName'
                value={this.props.fullName}
                onChange={this.onChange} />

            </FormGroup>

            <FormGroup>
              <FormControl
                placeholder='Address'
                name='address'
                value={this.props.address}
                onChange={this.onChange} />

            </FormGroup>

            <FormRow opt='mb-3' >
              <BCol size='md-6' >
                <FormControl
                  placeholder='City'
                  name='city'
                  value={this.props.city}
                  onChange={this.onChange} />

              </BCol>

              <BCol>
                <FormControl
                  placeholder='State'
                  name='state'
                  value={this.props.state}
                  onChange={this.onChange} />

              </BCol>

              <BCol>
                <FormControl
                  placeholder='Zipcode'
                  name='zipcode'
                  value={this.props.zipcode}
                  onChange={this.onZipChange} />
              </BCol>
            </FormRow>

            <DFlex opt='justify-content-around text-primary mb-2' >
              <Radio name='paymentType' value='cash' checked={cash} onChange={this.onChange} >
                <span className='font-weight-light h2'><Icon icon={cash ? 'dot-circle' : 'circle'} /> Cash</span>
              </Radio>
              <Radio name='paymentType' value='card' checked={card} onChange={this.onChange} >
                <span className='font-weight-light h2' ><Icon icon={card ? 'dot-circle' : 'circle'} /> Card</span>
              </Radio>
            </DFlex>

            <FormGroup>
              <FormControl
                disabled={!card}
                placeholder='Card Number'
                name='cardNumber'
                value={this.props.cardNumber}
                onChange={this.onChange} />
            </FormGroup>
          </BCol>

          <BCol>
            <h4>Current Order</h4>

            <CurrentOrderDisplay orderItems={this.props.orderItems} />

            <FormGroup>
              <FormRow>
                <BCol>
                  <h4>Tip</h4>
                </BCol>
                <BCol>
                  <div className='input-group'>
                    <div className='input-group-prepend' >
                      <span className='input-group-text' >$</span>
                    </div>
                    <FormControl
                      placeholder='Tip'
                      name='tip'
                      value={this.props.tip}
                      onChange={this.onChange}
                      onBlur={this.onTipBlur} />

                  </div>
                </BCol>
              </FormRow>
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

  onZipChange = event => {
    const zipcode = event.target.value

    if (zipcode === '' || zipcode === '0') {
      this.props.updateOrder({ zipcode })
    } else if (zipcode.length > 5) {
      return
    } else if (!parseInt(zipcode, 10)) {
      return
    } else {
      this.props.updateOrder({ zipcode })
    }
  }

  onTipBlur = event => {
    const tip = parseFloat(event.target.value)
    this.props.updateOrder({
      tip: (tip ? tip : 0).toFixed(2)
    })
  }
}

const mapState = state => {
  const order = state.orderNew
  return {
    ...order
  }
}

const mapDispatch = dispatch => {
  const actions = { checkOut, saveOrder, updateOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(CheckOutPage)