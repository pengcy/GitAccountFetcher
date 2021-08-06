import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableHighlight, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { fetchProjectList } from '../../api/GithubApi'
import config from '../../config'
import commonStyles from '../../res/style/common.style'
import { RnnFC } from '../../util/RnnFC'
import ScreenNames from '../navigation/ScreenNames'
import CardView from "../view/CardView"

const githubEndpoint = config.githubEndpoint

interface IProps {
  readonly componentId: string;
  readonly accountName: string;
}

const showProjectDetailScreen = (componentId: string, projectDetail: any) => {
  console.log("showProjectDetailScreen componentId: ", componentId);
  console.log(`showProjectDetailScreen projectDetail ${JSON.stringify(projectDetail)}`);

  Navigation.push(componentId, {
    component: {
      name: ScreenNames.PROJECT_DETAIL_SCREEN,
      passProps: {
        projectDetail,
      },
    },
  });
};

const ProjectListScreen: RnnFC<IProps> = (props) => {
  const { componentId, accountName } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState({});

  useEffect(()=>{
    try {
      async function fetchData() {
        setIsLoading(true);
        const projectList = await fetchProjectList(accountName);
        setDataSource(projectList);
        setIsLoading(false);
      }
      fetchData();
    } catch (e) {
      setIsLoading(false);
    }
  },[]);

  const renderItem = (item: any) => {
      const data = item.item
      return (
          <TouchableHighlight onPress={() => showProjectDetailScreen(componentId, data)}>
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

  if (isLoading) {
    return(
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    )
  }

  return(
    <View style={{flex: 1, paddingTop:20}}>
      <FlatList
        data={dataSource}
        renderItem={renderItem}

        keyExtractor={({id}, index) => id.toString()}
      />
    </View>
  );

};

ProjectListScreen.options = {
  topBar: {
    title: {
      text: "Project list",
    },
  },
};

export default ProjectListScreen;
