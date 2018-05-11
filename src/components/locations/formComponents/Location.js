import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormControl, FormGroup } from '../../elements';
import Category from './Category';
import { AddButton } from './elements';
import { addCategory, updateLocation } from '../../../actions/newLocationActions'

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
    const { name, value } = event.target
    this.props.updateLocation({ [name]: value })
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
  const actions = { addCategory, updateLocation }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(Location)