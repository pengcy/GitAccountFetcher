import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import AppColors from '../../res/color/AppColors';
import i18n from '../../res/string/i18n';
import Greeting from './Greeting';

interface IProps {
  onFetchPressed: (accountname: string) => void;
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

const AccountNameInput: React.FC<IProps> = (props) => {
  const { onFetchPressed } =  props;

  const [accountname, setAccountName] = useState('');

  const onFetchButtonPress = () => {
    onFetchPressed(accountname);
  }

  return (
      <View style={styles.container}>
        <Greeting name="Stranger"/>
        <TextInput
          style = {styles.inputBox}
          placeholder = {i18n.t('accountNameHint')}
          onChangeText = {(accountname) => setAccountName(accountname)}
          value = {accountname}
        />
        <Button
          color = { AppColors.primary }
          onPress={onFetchButtonPress}
				  title = {i18n.t('fetch')} />
      </View>
  );

};

export default AccountNameInput;
