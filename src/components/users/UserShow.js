import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class UserShow extends Component {
  render() {
    if (!this.props.signedIn) return <Redirect to='/' />
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
  name: state.user.name,
  signedIn: state.user.signedIn
})

export default connect(mapState)(UserShow)