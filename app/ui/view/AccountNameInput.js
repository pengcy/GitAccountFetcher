import analytics from '@react-native-firebase/analytics';
import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { screens } from '../../AppNavigator';
import AppColors from '../../res/color/AppColors';
import i18n from '../../res/string/i18n';
import Greeting from './Greeting';

export default class AccountNameInput extends Component {
  constructor(props) {
    super(props)
    this.navigate = this.props.navigation.navigate
    this.state = {accountname: ''}
  }

  onFetchButtonPress() {
    analytics().logEvent('search', {
      term: this.state.accountname,
    })
    console.log("onFetchButtonPress onFetchButtonPress onFetchButtonPress to AccountDetailScreen this.state.accountname " + this.state.accountname)
    this.navigate(screens.accountDetail,  { accountname: this.state.accountname } )
  }

  render() {
    return (
      <View style={styles.container}>
        <Greeting name="Stranger"/>
        <TextInput
          style = {styles.inputBox}
          placeholder = {i18n.t('accountNameHint')}
          onChangeText = {(accountname) => this.setState({accountname})}
          value = {this.state.accountname}
        />
        <Button
          color = { AppColors.primary }
          onPress={this.onFetchButtonPress.bind(this)}
				  title = {i18n.t('fetch')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      height: 160,
      width: 260,
      padding: 10,
      backgroundColor: '#eee'
    },
    inputBox: {
        height: 40,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    }
});
