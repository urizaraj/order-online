import Icon from '@fortawesome/react-fontawesome';
import pick from 'lodash/pick';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BCol, Btn, FormRow, Row, FormControl, FormGroup, FormPrice } from '../elements';
import AddressFields from './AddressFields';
import CurrentOrderDisplay from './CurrentOrderDisplay';
import DeliveryTypeRadio from './DeliveryTypeRadio';
import PaymentTypeRadio from './PaymentTypeRadio';
import { checkOut, saveOrder } from '../../actions/orderActions'
import { updateOrder } from '../../actions/orderNewActions'

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
            <DeliveryTypeRadio onChange={this.onChange} delivery={delivery} pickup={pickup} />

            <FormGroup>
              <FormControl
                placeholder='Full Name'
                name='fullName'
                value={this.props.fullName}
                onChange={this.onChange} />

            </FormGroup>

            <AddressFields
              onChange={this.onChange}
              onZipChange={this.onZipChange}
              onStateChange={this.onStateChange}
              {...pick(this.props, ['address', 'city', 'state', 'zipcode'])} />

            <PaymentTypeRadio onChange={this.onChange} cash={cash} card={card} />

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
                  <FormPrice
                    placeholder='Tip'
                    name='tip'
                    value={this.props.tip}
                    onChange={this.onChange}
                    onBlur={this.onTipBlur} />
                </BCol>
              </FormRow>
            </FormGroup>

          </BCol>
        </Row>

        <div className='text-right'>
          <Btn primary onClick={this.goBack} > <Icon icon='arrow-left' /> Go Back </Btn>
          <Btn success onClick={this.saveOrder} ><Icon icon='check' /> Save Order</Btn>
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

  onStateChange = event => {
    const state = event.target.value
    if (state.length > 2) return
    this.props.updateOrder({ state: state.toUpperCase() })
  }
}

const mapState = state => {
  const order = state.orderNew
  return { ...order }
}

const mapDispatch = dispatch => {
  const actions = { checkOut, saveOrder, updateOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(CheckOutPage)