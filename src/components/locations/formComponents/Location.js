import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { FormGroup, FormControl, AddButton } from './elements'

import { addCategory, updateLocationName, updateLocationDescription } from '../../../actions/newLocationActions'

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

        <AddButton onClick={this.addCategory} type='Category' />

        {this.props.categories.map(category => <Category {...category} key={category.cuid} />)}
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

  addCategory = event => {
    this.props.addCategory(this.props.menuId)
  }
}

const mapState = state => {
  return {
    categories: state.locationNew.categories,
    name: state.locationNew.name,
    description: state.locationNew.description,
    menuId: state.locationNew.menuId
  }
}

const mapDispatch = dispatch => {
  const actions = { addCategory, updateLocationName, updateLocationDescription }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(Location)