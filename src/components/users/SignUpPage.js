import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { userSignUp } from '../../actions/userActions'

class SignUpPage extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      password: '',
      email: ''
    }
  }

  render() {
    if (this.props.signedIn) return <Redirect to='/' />

    return (
      <div>
        <h2>Sign Up</h2>
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
              type='email'
              name='email'
              placeholder='Email'
              className='form-control'
              value={this.state.email}
              onChange={this.handleChange} />
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
    this.props.userSignUp(this.state)
  }
}

const InvalidMessage = props => (
  <div className='text-secondary mb-3' >
    <strong>Invalid username or password</strong>
  </div>
)

const mapDispatch = dispatch => {
  const actions = { userSignUp }
  return bindActionCreators(actions, dispatch)
}

const mapState = state => {
  return { invalid: state.user.invalid, signedIn: state.user.signedIn }
}

export default connect(mapState, mapDispatch)(SignUpPage)