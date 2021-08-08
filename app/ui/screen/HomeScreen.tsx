import React from 'react'
import { View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import commonStyles from '../../res/style/common.style'
import { RnnFC } from '../../util/RnnFC.js'
import ScreenNames from '../navigation/ScreenNames'
import AccountNameInput from '../view/AccountNameInput'
import NewModuleButton from '../view/NewModuleButton'

interface IProps {
  readonly componentId: string;
}

const showAccountDetailScreen = (componentId: string, accountName: string) => {
  console.log("showAccountDetailScreen componentId: ", componentId)
  Navigation.push(componentId, {
    component: {
      name: ScreenNames.ACCOUNT_DETAIL_SCREEN,
      passProps: {
        accountName,
      },
    },
  });
}

const HomeScreen: RnnFC<IProps> = (props) => {
  const { componentId } = props;

  console.log("HomeScreen componentId: ", componentId);

  const onFetchPressed = (accountName: string) => {
    showAccountDetailScreen(componentId, accountName);
  }

  return (
    <View style={commonStyles.container}>
      <NewModuleButton/>
      <AccountNameInput
        onFetchPressed={onFetchPressed}
      />
    </View>
  );

};

HomeScreen.options = {
  topBar: {
    visible: false,
  },
};

export default HomeScreen;
