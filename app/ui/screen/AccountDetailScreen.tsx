import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { fetchAccountDetail } from '../../api/GithubApi'
import config from '../../config'
import AppColors from '../../res/color/AppColors'
import commonStyles from '../../res/style/common.style'
import { RnnFC } from '../../util/RnnFC.js'
import ScreenNames from '../navigation/ScreenNames'
import ObjectPropertyValueList from '../view/ObjectPropertyValueList'

const githubEndpoint = config.githubEndpoint
const listIconRes = require('../../res/img/ic_list.png')

interface IProps {
  readonly componentId: string;
  readonly accountName: string;
}

const showProjectListScreen = (componentId: string, accountName: string) => {
  console.log("showProjectListScreen componentId: ", componentId)
  Navigation.push(componentId, {
    component: {
      name: ScreenNames.PROJECT_LIST_SCREEN,
      passProps: {
        accountName,
      },
    },
  });
};

const AccountDetailScreen: RnnFC<IProps> = (props) => {
  const { componentId, accountName } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState({});

  // useEffect(()=>{
  //   const url = util.format(githubEndpoint.accountDetail, accountName)
  //   console.log("AccountDetailScreen componentDidMount componentDidMount componentDidMount, fetching from: " + url)
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log("responseJson: " + JSON.stringify(responseJson))
  //       setDataSource(responseJson);
  //       setIsLoading(false);
  //     })
  //     .catch((error) =>{
  //       console.error(error);
  //     });
  // },[]);

  useEffect(()=>{
    console.log("AccountDetailScreen useEffect()");
    try {
      async function fetchData() {
        setIsLoading(true);
        const accountDetail = await fetchAccountDetail(accountName);
        setDataSource(accountDetail);
        setIsLoading(false);
      }
      fetchData();
    } catch (e) {
      setIsLoading(false);
    }
  },[accountName]);

  const onProjectListActionPress = () => {
    showProjectListScreen(componentId, accountName);
  }

  if (isLoading) {
    return(
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    );
  }

  return(
    <View style={commonStyles.container}>
      <Image source={{uri: dataSource.avatar_url}} style={{width: 40, height: 40}} />
      <ObjectPropertyValueList data={dataSource} />
      <TouchableOpacity style={styles.fab} onPress={onProjectListActionPress}>
        <Image source={listIconRes} />
      </TouchableOpacity>
    </View>
  );

  return null;

}

AccountDetailScreen.options = {
  topBar: {
    title: {
      text: "Account Detail",
    },
  },
};

export default AccountDetailScreen;

// export default class AccountDetailScreen extends Component {

//   constructor(props) {
//     super(props);
//     this.navigate = this.props.navigation.navigate
//     this.state = {isLoading: true, error: false}
//   }

//   onProjectListActionPress() {
//     console.log("onProjectListActionPress onProjectListActionPress onProjectListActionPress to ProjectListScreen this.props.navigation.state.params.accountname: " + this.props.navigation.state.params.accountname)
//     // this.navigate(screens.projectList,  { accountname: this.props.navigation.state.params.accountname } )
//   }

//   componentDidMount() {

//     console.log("AccountDetailScreen componentDidMount()")
//     this.setState({ loading: true }, async () => {
//       try {
//         const accountDetail = await fetchAccountDetail(this.props.navigation.state.params.accountname)
//         console.log("AccountDetailScreen componentDidMount() accountDetail: " + JSON.stringify(accountDetail))
//         this.setState({
//           isLoading: false,
//           dataSource: accountDetail
//         });
//       } catch (e) {
//         this.setState({
//           isLoading: false,
//           error: true,
//         });
//       }
//     })

//     // const url = util.format(githubEndpoint.accountDetail, this.props.navigation.state.params.accountname)
//     // console.log("AccountDetailScreen componentDidMount componentDidMount componentDidMount, fetching from: " + url)
//     // return fetch(url)
//     //   .then((response) => response.json())
//     //   .then((responseJson) => {
//     //     console.log("responseJson: " + JSON.stringify(responseJson))
//     //     this.setState({
//     //       isLoading: false,
//     //       dataSource: responseJson,
//     //     }, function(){

//     //     });
//     //   })
//     //   .catch((error) =>{
//     //     console.error(error);
//     //   });
//   }

//   render(){

//     if(this.state.isLoading){
//       return(
//         <View style={{flex: 1, padding: 20}}>
//           <ActivityIndicator/>
//         </View>
//       )
//     }

//     return(
//       <View style={commonStyles.container}>
//         <Image source={{uri: this.state.dataSource.avatar_url}} style={{width: 40, height: 40}} />
//         <ObjectPropertyValueList data={this.state.dataSource} />
//         <TouchableOpacity style={styles.fab} onPress={this.onProjectListActionPress.bind(this)}>
//           <Image source={listIconRes} />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({

  fab:{
    height: 50,
    width: 50,
    borderRadius: 200,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
  }

});

