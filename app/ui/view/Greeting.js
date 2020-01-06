import React, { Component } from 'react'
import { Text } from 'react-native';
import i18n from '../../res/string/i18n';

export default class Greeting extends Component {
  render() {
    return <Text h3 style={{marginVertical: 10}}>{i18n.t('greeting', { name: this.props.name })}</Text>
  }
}
