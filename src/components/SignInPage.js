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
        {this.props.invalid && <InvalidMessage/>}
        <form onSubmit={this.handleSubmit.bind(this)} >
          <div className='form-group' >
            <input type='text' name='name' placeholder='username' className='form-control' value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className='form-group' >
            <input type='password' name='password' placeholder='password' className='form-control' value={this.state.password} onChange={this.handleChange} />
          </div>
          <button className='btn btn-primary' type='submit' >Sign In</button>
        </form>
      </div>
    )
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.userSignIn(this.state)
  }
}

const InvalidMessage = props => (
  <div className='text-secondary mb-3' >
    <strong>Invalid username or password</strong>
  </div>
)

const mapDispatch = dispatch => {
  const actions = { userSignIn }
  return bindActionCreators(actions, dispatch)
}

const mapState = state => {
  return { invalid: state.user.invalid }
}

export default connect(mapState, mapDispatch)(SignInPage)