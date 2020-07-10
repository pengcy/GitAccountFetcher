A simple react native app
========================
A react native app for fetching github account data by providing a github account name. It coverts screen navigation, input box, list view, neworking, custom component, image, styling, etc.

![License][license-image]

## Screenshots


## Project directory structure
The **app** directory contains all the code for the app. Within this directory, there are few top level files, and 3 directories. **api** is for code that's making api calls,  **res** is for resource files such as images, strings, styles. **ui** contains most of the javascript files. Within ui, there are 2 directories, one for screen and one for view. **screen** contains component files for each available screen in the app. **view** contains custom view component.


## Prerequsites
- Node environment is needed to run the javascript code.
- Package management tool npm or yarn is needed. yarn is recommended over npm.
- IOS and Android environments are needed, xcode for ios and Android Studio for Android.
- expo-cli is needed for running the react native code
- Before proceed any further, make sure to follow this getting started guide and be able to create and run the starter app. https://facebook.github.io/react-native/docs/getting-started

## To install
```shell
yarn install
cd ios
pod install
cd ..
```

## To install yarn with brew
```shell
brew install yarn
```

## To run it on Android emulator
```shell
yarn run android
```

## To run it on ios emulator
```shell
yarn run ios
```

## Screen navigation
To do screen navigation in react native, the screen component has to be registered with the Navigator. Here is an example of creating an app navigator with all the available screens. In the createStackNavigator, it takes an object with defined screens. AppNavigator.js
```jsx
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
```

Here is how to use the AppNavigator.js, simply return AppContainer, this will render the first screen defined in the AppNavigator, in this case, it is the HomeScreen.
```jsx
import React from 'react';
import {createAppContainer} from 'react-navigation';
import AppNavigator from './AppNavigator';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
```

To navigate from one screen to another screen and passing a parameter. In this example, it navigates to the detail screen and passing an accountname as parameter. navigate takes two parameters, the first is the screen name and the second one is the data to be passed to the new scree. For the screen name has to be registred when creating the app navigator in the App.js, the data can be any object.
```jsx
import { screens } from '../../AppNavigator'

this.props.navigation.navigate(screens.accountDetail,  { accountname: this.state.accountname } )

```

To get the data in the destination screen. componentDidMount is a lifecycle method which will be called after the component is mounted.
```jsx
componentDidMount() {
  const accountname = this.props.navigation.state.params.accountname
}
```

The navigate function is only available in the screen components that were registered with the navigator in the App.js, if calling this navigate function in a child custom view component, the navigation has to be pass to the custom view component. In this example, the child component is AccountNameInput which is not registered with the navigator, hence the navigation has to be passed to this AccountNameInput in order for it to be able to call navigate to navigate to a new screen.
```jsx
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

```


## Using a json file for configuration data
Here is a config.json with api endponts.
```jsx
{
	"githubEndpoint": {
		"accountDetail": "https://api.github.com/users/%s",
		"accountRepos": "https://api.github.com/users/%s/repos"
	}
}
```

It can be imported and used like this.
```jsx
import config from './config'
const githubEndpoint = config.githubEndpoint
const url = util.format(githubEndpoint.accountDetail, "google")
```


## index.js for exporting javascript modules within a folder
index.js in a directory is the file which will be ran when the folder is referenced without specifying a specific file. Here is the index.js in ./app/ui/view, all it does is the import the files in the current directory and export them as a list of available components.
```jsx
import Greeting from './Greeting'
import AccountNameInput from './AccountNameInput'
import CardView from './CardView'
import ObjectPropertyValueList from './ObjectPropertyValueList'

export {
	Greeting,
	AccountNameInput,
	CardView,
	ObjectPropertyValueList
}
```

Here is an example for importing the AccountNameInput from the view directory.
```jsx
import { AccountNameInput } from '../view'
```

Here is an example to import multiple components from the view.
```jsx
import { AccountNameInput, Greeting } from '../view'
```

With above imports, the AccountNameInput can be used like this.
```jsx
export default class HomeScreen extends Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <AccountNameInput navigation={this.props.navigation} />
      </View>
    )
  }
}
```

## Apply style from styles created in a separate file
Here is an example of a javascript file exporting a StyleSheet, style.common.js

```jsx
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  rowItem: {
      flexWrap: "wrap",
      flexDirection: 'row',
      paddingVertical: 5
  },
  rowItemText: {
    fontSize: 12
  },
  propertyText: {
    fontFamily: 'Cochin',
    fontWeight: 'bold'
  }
})
```

It can then be imported and used like this. By creating a common style in a separate file, common styles can be imported and applied to multiple components.
```jsx
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
```

## Colors
For the app to have a consitency in color, all color can be defined in a AppColors.js and it can be imported and used across the app.
```jsx
const AppColors = {
  primary: '#64a1f4',
  secondary: '#4a91f2',
  accent: '#8dbdff',
  white: '#fff',
  black: '#000'
}

export default AppColors
```

Here is an example to import and use the color from AppColors.js
```jsx
import AppColors from '../../res/color/AppColors'
<Button
  color = { AppColors.primary }
  onPress={this.onFetchButtonPress.bind(this)}
  title = "Fetch" />
```

## Image
To load a local image
```jsx
<Image source={require('./my-icon.png')} />
```

To load a network image.
```jsx
<Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
       style={{width: 400, height: 400}} />
```

If you would like to set such things as the HTTP-Verb, Headers or a Body along with the image request, you may do this by defining these properties on the source object:

```jsx
<Image
  source={{
    uri: 'https://facebook.github.io/react/logo-og.png',
    method: 'POST',
    headers: {
      Pragma: 'no-cache',
    },
    body: 'Your Body goes here',
  }}
  style={{width: 400, height: 400}}
/>
```

## List view
```jsx
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

```

## Networking
GithubApi.js contains the code for fetching github account data using async and await
```jsx
import config from '../config'
import util from 'util'
const githubEndpoint = config.githubEndpoint

export const fetchAccountDetail = async accountname => {
  const url = util.format(githubEndpoint.accountDetail, accountname)
  const response = await fetch(url)
  const responseJson = await response.json()
  return responseJson
}

export const fetchProjectList = async accountname => {
  const url = util.format(githubEndpoint.accountRepos, accountname)
  const response = await fetch(url)
  const projectList = await response.json()
  return projectList
}
```

Here is an example of how it's used for fethcing account detail on the account detail screen.
```jsx
import { fetchAccountDetail } from '../../api/GithubApi';

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate
    this.state = {isLoading: true, error: false}
  }

  componentDidMount() {

    console.log("AccountDetailScreen componentDidMount()")
    this.setState({ loading: true }, async () => {
      try {
        const accountDetail = await fetchAccountDetail(this.props.navigation.state.params.accountname)
        console.log("AccountDetailScreen componentDidMount() accountDetail: " + JSON.stringify(accountDetail))
        this.setState({
          isLoading: false,
          dataSource: accountDetail
        });
      } catch (e) {
        this.setState({
          isLoading: false,
          error: true,
        });
      }
    })
```

## Custom component
Here is a custom component, Greeting.js, it simply displays "Hi Amy" if the provided name props is "Amy". i18n is
```jsx
import React, { Component } from 'react'
import { Text } from 'react-native';

export default class Greeting extends Component {
  render() {
    return <Text h3>Hi {this.props.name }</Text>
  }
}
```
Here is an example of using the custom component Greeting and providing it with a name.
```jsx
import React, { Component } from 'react'
import { View } from 'react-native'
import { Greeting } from '../view'

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
      	<Greeting name="Amy"/>
      </View>
    )
  }
}

```

## String internationalization
https://github.com/AlexanderZaytsev/react-native-i18n


[license]: http://revolunet.mit-license.org
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg



## upload ios dsym file to crashlytics
/Users/peng/dev/github/GitAccountFetcher/ios/Pods/FirebaseCrashlytics/upload-symbols -gsp /Users/peng/dev/github/GitAccountFetcher/ios/GoogleService-Info.plist -p ios /Users/peng/dev/github/GitAccountFetcher/ios/build/GitAccountFetcher/Build/Products/Debug-iphonesimulator/GitAccountFetcher.app.dSYM


## Generate sourcemap
For ios, run the following
```
react-native bundle --platform ios --entry-file index.js --dev false --bundle-output ./ios/main.jsbundle --assets-dest ./ios --sourcemap-output ./sourcemap.ios.js
```

For Android, do a release build
