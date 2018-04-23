import React, { Component } from 'react';

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

  handleSubmit(event) {
    const options = {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/users/sign_in', options)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
      })
  }
}

export default SignInPage