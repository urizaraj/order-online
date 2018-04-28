import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { FormGroup, FormControl, AddButton } from './elements'

import { addCategory, saveLocation, updateLocationName, updateLocationDescription } from '../../../actions/newLocationActions'

import Category from './Category'

class Location extends Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <FormGroup>
        <FormControl
          placeholder='Location Name'
          name='name'
          onChange={this.handleChange}
          value={this.props.name} />
      </FormGroup>

      <FormGroup>
        <FormControl
          placeholder='Location Description'
          name='description'
          onChange={this.handleChange}
          value={this.props.description} />
      </FormGroup>

      <h2>Menu</h2>

      <AddButton onClick={this.props.addCategory} type='Category' />

      {this.props.categories.map(category => <Category {...category} key={category.cuid} />)}

      <div></div>
      <button
        onClick={this.props.saveLocation}
        className='btn btn-primary'
      >Save Location</button>
      </form>
    )
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name

    const func = (name === 'name' ? this.props.updateLocationName : this.props.updateLocationDescription)

    func(value)
  }

  handleSubmit = event => {
    event.preventDefault()
  }
}

const mapState = state => {
  return {
    categories: state.newLocation.categories,
    name: state.newLocation.name,
    description: state.newLocation.description
  }
}

const mapDispatch = dispatch => {
  const actions = { addCategory, saveLocation, updateLocationName, updateLocationDescription }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(Location)