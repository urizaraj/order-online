import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addCategory, updateCategory, removeCategory, addItem, updateItem, addOption, updateOption } from '../actions/newLocationActions'

import cuid from 'cuid'

import Icon from '@fortawesome/react-fontawesome'

const FormGroup = props => <div className='form-group' >{props.children}</div>

const FormControl = props => <input {...props} type='text' className='form-control' />

class LocationNew extends Component {
  render() {
    return (
      <div>
        {/* <h1 className='text-primary bg-light display-4 p-3 d-inline-block' >New Location</h1> */}
        <h1>New Location</h1>

        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl placeholder='Location Name' />
          </FormGroup>

          <FormGroup>
            <FormControl placeholder='Location Description' />
          </FormGroup>

          <h2>Menu</h2>

          {this.props.categories.map(category => <Category {...category} />)}

          <button
            className='btn btn-success'
            onClick={this.props.addCategory} > <Icon icon='plus' /> New Category</button>

        </form>
      </div>
    )
  }

  handleSubmit = event => {
    event.preventDefault()
  }
}

class Category extends Component {
  render() {
    const addItem = () => this.props.addItem(this.props.cuid)
    return (
      <div className='mb-3' >
        <FormGroup>
          <FormControl
            placeholder='Category Name'
            value={this.props.name}
            onChange={this.handleChange} />
        </FormGroup>

        {this.props.items.map(item => <Item {...item} />)}

        <button
          className='btn btn-success ml-3'
          onClick={addItem} > <Icon icon='plus' /> New Item</button>

      </div>
    )
  }

  handleChange = event => {
    const name = event.target.value
    this.props.updateCategory(this.props.cuid, { name })
  }
}

class Item extends Component {
  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormGroup>
          <FormControl
            placeholder='Item Name'
            onChange={this.handleName}
            value={this.props.name} />
        </FormGroup>

        {this.props.options.map(option => <Option {...option} />)}

        <button
          className='btn btn-success ml-3'
          onClick={this.handleNewOption} > <Icon icon='plus' /> New Option</button>

      </div>
    )
  }

  handleName = event => {
    const name = event.target.value
    this.props.updateItem(this.props.cuid, { name })
  }

  handleNewOption = () => {
    this.props.addOption(this.props.cuid)
  }
}

class Option extends Component {
  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormGroup>
          <FormControl
            onChange={this.handleName}
            value={this.props.name}
            placeholder='Option Name' />
        </FormGroup>
      </div>
    )
  }

  handleName = event => {
    const name = event.target.value
    this.props.updateOption(this.props.cuid, { name })
  }

}

//#region store

const mapState = state => {
  return {
    categories: state.newLocation.categories
  }
}

const mapDispatch = dispatch => {
  const actions = { addCategory, updateCategory, removeCategory }
  return bindActionCreators(actions, dispatch)
}

const mapCatState = (state, ownProps) => {
  // const category = state.newLocation.categories[ownProps.cuid]
  return {
    items: state.newLocation.items.filter(item => {
      return item.categoryCuid === ownProps.cuid
    })
  }
}

const mapCatDispatch = dispatch => {
  const actions = { updateCategory, removeCategory, addItem }
  return bindActionCreators(actions, dispatch)
}

const mapItemState = (state, ownProps) => {
  return { options: state.newLocation.options.filter(option => option.itemCuid === ownProps.cuid) }
}

const mapItemDispatch = dispatch => {
  const actions = { updateItem, addOption }
  return bindActionCreators(actions, dispatch)
}

const mapOptionDispatch = dispatch => {
  const actions = { updateOption }
  return bindActionCreators(actions, dispatch)
}

Category = connect(mapCatState, mapCatDispatch)(Category)

Item = connect(mapItemState, mapItemDispatch)(Item)

Option = connect(null, mapOptionDispatch)(Option)

export default connect(mapState, mapDispatch)(LocationNew)

//#endregion