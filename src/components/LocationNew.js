import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addCategory, updateCategory, removeCategory, addItem } from '../actions/newLocationActions'

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

        {this.props.items.map(item => <Item key={item} />)}

        <button
          className='btn btn-success ml-3'
          onClick={addItem} > <Icon icon='plus' /> New Item</button>

      </div>
    )
  }

  handleChange = event => {
    const value = event.target.value
    this.props.updateCategory(this.props.cuid, value)
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
    this.handleNewOption = this.handleNewOption.bind(this);
  }

  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormGroup>
          <FormControl placeholder='Item Name' />
        </FormGroup>

        {this.state.options.map(option => <Option key={option} />)}

        <button
          className='btn btn-success ml-3'
          onClick={this.handleNewOption} > <Icon icon='plus' /> New Option</button>

      </div>
    )
  }

  handleNewOption() {
    this.setState({
      options: [...this.state.options, cuid()]
    })
  }
}

class Option extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormGroup>
          <FormControl placeholder='Option Name' />
        </FormGroup>
      </div>
    )
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

Category = connect(mapCatState, mapCatDispatch)(Category)

export default connect(mapState, mapDispatch)(LocationNew)

//#endregion