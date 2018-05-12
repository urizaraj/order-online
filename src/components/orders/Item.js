import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from '@fortawesome/react-fontawesome'

import { DFlex } from '../elements'

import { toggleActiveItem } from '../../actions/activeItemActions'
import { addOrderItem } from '../../actions/orderNewActions'
import ItemDetails from './ItemDetails'

class Item extends Component {
  render() {
    const { active, ...rest } = this.props
    const { name, price } = rest
    return (
      <div className="mb-3">
        <DFlex opt="item" center onClick={this.toggleActiveItem}>
          <Icon icon="chevron-down" />
          <div className="ml-3">{name}</div>
          <div className="font-weight-light ml-auto">${price}</div>
        </DFlex>

        {active && <ItemDetails {...rest} />}
      </div>
    )
  }

  componentWillUnmount() {
    if (this.props.active) {
      this.toggleActiveItem()
    }
  }

  toggleActiveItem = () =>
    this.props.toggleActiveItem(this.props.active, this.props.id)
}

// connect to store

const mapStateToProps = (state, own) => {
  const active = state.activeItem.item === own.id

  return { active }
}

const mapDispatchToProps = dispatch => {
  const actions = { toggleActiveItem, addOrderItem }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
