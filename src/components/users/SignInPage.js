import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { userSignIn } from '../../actions/userActions'

class SignInPage extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      password: ''
    }
  }

  render() {
    if (this.props.signedIn) return <Redirect to='/' />

    return (
      <div>
        <h2>Sign In</h2>
        {this.props.invalid && <InvalidMessage />}
        <form onSubmit={this.handleSubmit} >
          <div className='form-group' >
            <input
              type='text'
              name='name'
              placeholder='Username'
              className='form-control'
              value={this.state.name}
              onChange={this.handleChange}
              autoFocus />
          </div>

          <div className='form-group' >
            <input
              type='password'
              name='password'
              placeholder='Password'
              className='form-control'
              value={this.state.password}
              onChange={this.handleChange} />
          </div>

          <button className='btn btn-primary' type='submit' >Sign In</button>
        </form>
      </div>
    )
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.userSignIn(this.state)
  }
}

const InvalidMessage = props => (
  <div className='text-danger mb-3' >
    <strong>Invalid username or password</strong>
  </div>
)

const mapDispatch = dispatch => {
  const actions = { userSignIn }
  return bindActionCreators(actions, dispatch)
}

const mapState = state => {
  return { invalid: state.user.invalid, signedIn: state.user.signedIn }
}

export default connect(mapState, mapDispatch)(SignInPage)