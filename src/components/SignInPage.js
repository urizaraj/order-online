import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userSignIn } from '../actions/userActions'

class SignInPage extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <input type='text' name='name' placeholder='username' className='form-control' value={this.state.name} onChange={this.handleChange} />
        <input type='password' name='password' placeholder='password' className='form-control' value={this.state.password} onChange={this.handleChange} />
        <button className='btn btn-primary' onClick={this.handleSubmit.bind(this)} >Sign In</button>
      </div>
    )
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    this.props.userSignIn(this.state)
  }
}

const mapDispatch = dispatch => {
  const actions = { userSignIn }
  return bindActionCreators(actions, dispatch)
}

export default connect(null, mapDispatch)(SignInPage)