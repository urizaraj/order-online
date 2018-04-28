import React from 'react'

import Icon from '@fortawesome/react-fontawesome'

export const FormGroup = props => <div className='form-group' >{props.children}</div>

export const FormControl = props => <input {...props} type='text' className='form-control' />

export const FormRow = props => <div className='form-row' >{props.children}</div>

export const RemoveButton = props => <button className='btn btn-secondary' onClick={props.onClick} ><Icon icon='trash' /></button>

export const AddButton = props => <button className='btn btn-success btn-sm mb-3' onClick={props.onClick} > <Icon icon='plus' /> New {props.type}</button>