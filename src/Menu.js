import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchMenu } from './actions/menuActions'

const e = React.createElement

const Category = props => (
  <div>
    <button
      onClick={() => props.onClick(props.id)}
    >Load</button>
    {props.name}
  </div>
)

const Item = ({ name, description, price }) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <h3>{price}</h3>
    </div>
  )
}

class Menu extends Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div>
        we in the menu right now
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchMenu()
  }
}

const mapStateToProps = state => {
  return { categories: state.menu.categories }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchMenu }, dispatch)
}

export default Menu = connect(mapStateToProps, mapDispatchToProps)(Menu)