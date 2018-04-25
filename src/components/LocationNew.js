import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addCategory, updateCategory, removeCategory } from '../actions/newLocationActions'

import cuid from 'cuid'

import Icon from '@fortawesome/react-fontawesome'

const FormGroup = props => <div className='form-group' >{props.children}</div>

const FormControl = props => <input {...props} type='text' className='form-control' />

class LocationNew extends Component {
  constructor() {
    super()
  }

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

          {this.props.categories.map(category => <Category key={category[0]} cuid={category[0]} {...category[1]} />)}

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
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.handleNewItem = this.handleNewItem.bind(this);
  }

  render() {
    return (
      <div className='mb-3' >
        <FormGroup>
          <FormControl
            placeholder='Category Name'
            value={this.props.name}
            onChange={this.handleChange} />
        </FormGroup>

        {this.state.items.map(item => <Item key={item} />)}

        <button
          className='btn btn-success ml-3'
          onClick={this.handleNewItem} > <Icon icon='plus' /> New Item</button>

      </div>
    )
  }

  handleChange = event => {
    const value = event.target.value
    this.props.updateCategory(this.props.cuid, value)
  }

  handleNewItem() {
    this.setState({
      items: [...this.state.items, cuid()]
    })
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
    categories: Object.entries(state.newLocation.categories)
  }
}

const mapDispatch = dispatch => {
  const actions = { addCategory, updateCategory, removeCategory }
  return bindActionCreators(actions, dispatch)
}

const mapCatState = (state, ownProps) => {
  return { ...state.newLocation.categories[ownProps.cuid] }
}

const mapCatDispatch = dispatch => {
  const actions = { updateCategory, removeCategory }
  return bindActionCreators(actions, dispatch)
}

Category = connect(mapCatState, mapCatDispatch)(Category)

export default connect(mapState, mapDispatch)(LocationNew)

//#endregion