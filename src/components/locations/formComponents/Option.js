import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { FormRow, FormControl, RemoveButton } from './elements'
import { BCol } from '../../elements'

import { updateResource, removeResource } from '../../../actions/newLocationActions'

class Option extends Component {
  render() {
    const disabled = this.props['_destroy']
    return (
      <div className='mb-3 ml-3' >
        <FormRow>
          <BCol >
            <FormControl
              disabled={disabled}
              onChange={this.handleChange}
              value={this.props.name}
              name='name'
              placeholder='Option Name' />
          </BCol>

          <BCol size='md-2 col'>
            <FormControl
              disabled={disabled}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name='price'
              value={this.props.price}
              placeholder='Price' />

          </BCol>

          <BCol size='auto'  >
            <RemoveButton onClick={this.removeExisting} />
          </BCol>
        </FormRow>
      </div>
    )
  }

  handleChange = event => {
    const { name, value } = event.target
    this.updateOption({ [name]: value })
  }

  handleBlur = event => {
    const price = parseFloat(event.target.value)
    this.updateOption({
      price: (price ? price : 0).toFixed(2)
    })
  }

  updateOption = value => this.props.updateResource('options', this.props.cuid, value)

  removeOption = () => this.props.removeResource('options', this.props.cuid)

  removeExisting = () => this.props.updateResource('options', this.props.cuid, { '_destroy': !this.props['_destroy'] })
}

const mapOptionDispatch = dispatch => {
  return bindActionCreators({ updateResource, removeResource }, dispatch)
}

export default connect(null, mapOptionDispatch)(Option)