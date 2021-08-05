import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableHighlight, View } from 'react-native'
import { fetchProjectList } from '../../api/GithubApi'
import config from '../../config'
import commonStyles from '../../res/style/common.style.js'
import CardView from "../view/CardView"

const githubEndpoint = config.githubEndpoint

export default class ProjectListScreen extends Component {

  constructor(props) {
    super(props);
    this.state ={ isLoading: true, error: false }
  }

  componentDidMount() {
    console.log("ProjectListScreen componentDidMount()")
    this.setState({ loading: true }, async () => {
      try {
        const projectList = await fetchProjectList(this.props.navigation.state.params.accountname)
        console.log("ProjectListScreen componentDidMount() projectList: " + JSON.stringify(projectList))
        this.setState({
          isLoading: false,
          dataSource: projectList
        });
      } catch (e) {
        this.setState({
          isLoading: false,
          error: true,
        });
      }
    })

    // const url = util.format(githubEndpoint.accountRepos, this.props.navigation.state.params.accountname)
    // console.log("ProjectListScreen componentDidMount componentDidMount componentDidMount, fetching from " + url)
    // return fetch(url)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //console.log("ProjectListScreen componentDidMount componentDidMount componentDidMount, fetched data " + JSON.stringify(responseJson))
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

   navigateProjectDetail(data) {
      console.log(`ProjectListScreen navigateProjectDetail ${JSON.stringify(data)}`)
      this.props.navigation.navigate(screens.projectDetail, { projectDetail: data })
   }

   renderItem(item) {
       const data = item.item
       return (
           <TouchableHighlight onPress={() => this.navigateProjectDetail(data)}>
               <CardView>
                  <View style={commonStyles.rowItem}>
                    <Text style={[commonStyles.propertyText, commonStyles.rowItemText]}>Full name:</Text><Text style={commonStyles.rowItemText}> {data.name}</Text>
                  </View>
                  <View style={commonStyles.rowItem}>
                    <Text style={[commonStyles.propertyText, commonStyles.rowItemText]}>Url:</Text><Text style={commonStyles.rowItemText}> {data.html_url}</Text>
                  </View>
                  <View style={commonStyles.rowItem}>
                    <Text style={[commonStyles.propertyText, commonStyles.rowItemText]}>Created at:</Text><Text style={commonStyles.rowItemText}> {data.created_at}</Text>
                  </View>
                  <View style={commonStyles.rowItem}>
                    <Text style={[commonStyles.propertyText, commonStyles.rowItemText]}>Updated at:</Text><Text style={commonStyles.rowItemText}> {data.updated_at}</Text>
                  </View>
                  <View style={commonStyles.rowItem}>
                    <Text style={[commonStyles.propertyText, commonStyles.rowItemText]}>Description:</Text><Text style={commonStyles.rowItemText}> {data.description}</Text>
                  </View>
               </CardView>
           </TouchableHighlight>
       )
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
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem.bind(this)}

          keyExtractor={({id}, index) => id.toString()}
        />
      </View>
    );

  }
}

