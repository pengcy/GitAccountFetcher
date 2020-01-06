import React, { Component } from 'react'
import { View } from 'react-native'
import { AccountNameInput } from '../view'
import commonStyles from '../../res/style/common.style.js'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <AccountNameInput navigation={this.props.navigation} />
      </View>
    )
  }
}
