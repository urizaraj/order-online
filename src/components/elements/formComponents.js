import React from 'react'

import { createDiv } from './createDiv'

export const FormRow = createDiv('form-row')
export const FormCheck = createDiv('form-check')
export const FormGroup = createDiv('form-group')
export const FormControl = props => <input {...props} type='text' className='form-control' />

export const FormPrice = props => {
  return (
    <div className='input-group'>
      <div className='input-group-prepend' >
        <span className='input-group-text' >$</span>
      </div>
      <FormControl {...props} />
    </div>
  )
}