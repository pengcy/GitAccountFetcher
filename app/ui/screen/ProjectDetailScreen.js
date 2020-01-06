import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { ObjectPropertyValueList } from '../view'

import commonStyles from '../../res/style/common.style.js'

export default class ProjectDetailScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const projectDetail = this.props.navigation.state.params.projectDetail
    // console.log(JSON.stringify(projectDetail))
    return(
      <View style={commonStyles.container}>
        <ObjectPropertyValueList data={projectDetail} />
      </View>
    );
  }
}
