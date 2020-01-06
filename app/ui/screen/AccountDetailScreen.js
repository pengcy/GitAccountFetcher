import React, { Component } from 'react'
import { Platform, StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableOpacity, Image } from 'react-native'
import config from '../../config'
import util from 'util'
import { screens } from '../../AppNavigator'
import { ObjectPropertyValueList } from '../view'
import { fetchAccountDetail } from '../../api/GithubApi';

import commonStyles from '../../res/style/common.style.js'
import AppColors from '../../res/color/AppColors'
const githubEndpoint = config.githubEndpoint
const listIconRes = require('../../res/img/ic_list.png')

export default class AccountDetailScreen extends Component {

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate
    this.state = {isLoading: true, error: false}
  }

  onProjectListActionPress() {
    console.log("onProjectListActionPress onProjectListActionPress onProjectListActionPress to ProjectListScreen this.props.navigation.state.params.accountname: " + this.props.navigation.state.params.accountname)
    this.navigate(screens.projectList,  { accountname: this.props.navigation.state.params.accountname } )
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

    // const url = util.format(githubEndpoint.accountDetail, this.props.navigation.state.params.accountname)
    // console.log("AccountDetailScreen componentDidMount componentDidMount componentDidMount, fetching from: " + url)
    // return fetch(url)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log("responseJson: " + JSON.stringify(responseJson))
    //     this.setState({
    //       isLoading: false,
    //       dataSource: responseJson,
    //     }, function(){

    //     });
    //   })
    //   .catch((error) =>{
    //     console.error(error);
    //   });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={commonStyles.container}>
        <Image source={{uri: this.state.dataSource.avatar_url}} style={{width: 40, height: 40}} />
        <ObjectPropertyValueList data={this.state.dataSource} />
        <TouchableOpacity style={styles.fab} onPress={this.onProjectListActionPress.bind(this)}>
          <Image source={listIconRes} />
        </TouchableOpacity>
      </View>
    );
  }
}

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

