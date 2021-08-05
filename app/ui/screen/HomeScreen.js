import React, { Component } from 'react'
import { View } from 'react-native'
import commonStyles from '../../res/style/common.style.js'
import AccountNameInput from '../view/AccountNameInput'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <AccountNameInput />
      </View>
    )
  }
}
