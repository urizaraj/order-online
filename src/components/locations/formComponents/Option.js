import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { FormRow, FormControl, RemoveButton } from './elements'
import { Col as Bcol } from '../../elements'

import { updateOption, removeOption } from '../../../actions/newLocationActions'

class Option extends Component {
  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormRow>
          <Bcol size='auto' opt='mb-3' >
            <RemoveButton onClick={this.removeOption} />
          </Bcol>

          <Bcol>
            <FormControl
              onChange={this.handleName}
              value={this.props.name}
              placeholder='Option Name' />
          </Bcol>

          <Bcol>
            <FormControl
              onChange={this.handlePrice}
              value={this.props.price}
              placeholder='Price' />

          </Bcol>
        </FormRow>
      </div>
    )
  }

  handleName = event => {
    const name = event.target.value
    this.props.updateOption(this.props.cuid, { name })
  }

  handlePrice = event => {
    let price = event.target.value
    if (price !== '') {
      price = parseInt(price, 10)
      if (!price) return
    }
    this.props.updateOption(this.props.cuid, { price })
  }

  removeOption = () => this.props.removeOption(this.props.cuid)
}

const mapOptionDispatch = dispatch => {
  return bindActionCreators({ updateOption, removeOption }, dispatch)
}

export default connect(null, mapOptionDispatch)(Option)