import React, { Component } from 'react'
import Icon from '@fortawesome/react-fontawesome'

import { Row, BCol, DFlex, Btn, Checkbox } from '../elements'

import xor from 'lodash/xor'

export default class ItemDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOptions: [],
      instructions: ''
    }
  }

  render() {
    return (
      <div className="mt-2">
        <Row>
          <OptionList
            options={this.props.options}
            handleCheck={this.handleCheck}
            selectedOptions={this.state.selectedOptions}
          />
        </Row>

        <div className="mb-3 mt-2">
          <small>Special Instructions: </small>
          <input
            type="text"
            name="instructions"
            value={this.state.instructions}
            onChange={this.handleChange}
            className="form-control form-control-sm"
          />
        </div>

        <div className="text-right">
          <Btn success onClick={this.addOrderItem}>
            <Icon icon="plus" /> Add to Order
          </Btn>
        </div>
      </div>
    )
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  addOrderItem = () => this.props.addOrderItem(this.props.item, this.state)

  handleCheck = event => {
    const value = parseInt(event.target.value, 10)
    const { selectedOptions } = this.state
    this.setState({ selectedOptions: xor(selectedOptions, [value]) })
  }
}

const OptionList = props => {
  return props.options.map(option => {
    const params = {
      option,
      selected: props.selectedOptions.includes(option.id),
      handleCheck: props.handleCheck,
      key: option.id
    }
    return <Option {...params} />
  })
}

const Option = props => {
  const { selected, option, handleCheck } = props

  const opt = ['p-2 option', selected ? 'bg-primary text-white' : ''].join(' ')
  return (
    <BCol size="md-6">
      <Checkbox value={option.id} checked={selected} onChange={handleCheck}>
        <DFlex center opt={opt}>
          <Icon icon={selected ? 'check' : 'plus'} fixedWidth />

          <div className="ml-3 mr-3">{option.name}</div>

          {option.price > 0 && (
            <div className="ml-auto">${option.price.toFixed(2)}</div>
          )}
        </DFlex>
      </Checkbox>
    </BCol>
  )
}
