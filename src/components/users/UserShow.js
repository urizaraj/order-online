import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class UserShow extends Component {
  render() {
    return (
      <div>
        <h1 className='display-3' >
          {this.props.name}
        </h1>
      </div>
    )
  }
}

const mapState = state => ({
  name: state.user.name
})

export default connect(mapState)(UserShow)