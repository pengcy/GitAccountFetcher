import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import i18n from './res/string/i18n'
import {
  HomeScreen,
  AccountDetailScreen,
  ProjectListScreen,
  ProjectDetailScreen
} from './ui/screen'

export default createStackNavigator({
  HomeScreen: {
  	screen: HomeScreen,
  	navigationOptions: {
      title: i18n.t('home'), // the text to be displayed on the header
      header: null 		//this will hide the header
    }
  },
  AccountDetailScreen: {
  	screen: AccountDetailScreen,
  	navigationOptions: {
      title: i18n.t('accountDetail'),
    }
  },
  ProjectListScreen: {
    screen: ProjectListScreen,
    navigationOptions: {
      title: i18n.t('projectList'),
    }
  },
  ProjectDetailScreen: {
    screen: ProjectDetailScreen,
    navigationOptions: {
      title: i18n.t('projectDetail'),
    }
  }
});

// TODO: make sure to add new screen to this list
// The string value in this list for each screen is used for screen navigation, ex: this.navigate(screens.accountDetail,  { accountname: this.state.accountname } )
export const screens = {
    "home": "HomeScreen",
    "accountDetail": "AccountDetailScreen",
    "projectList": "ProjectListScreen",
    "projectDetail": "ProjectDetailScreen"
}