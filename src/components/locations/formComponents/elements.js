import Icon from '@fortawesome/react-fontawesome';
import React from 'react';
import { Btn } from '../../elements';

export const RemoveButton = props => (
  <Btn danger onClick={props.onClick}>
    <Icon icon='trash' />
  </Btn>
)

export const AddButton = props => (
  <Btn opt='mb-3' success sm onClick={props.onClick} disabled={props.disabled}>
    <Icon icon='plus' /> New {props.type}
  </Btn>
)