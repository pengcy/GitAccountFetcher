import React, { Component } from 'react'
import { Text, FlatList, View } from 'react-native';
import commonStyles from '../../res/style/common.style.js'

export default class ObjectPropertyValueList extends Component {
  render() {
  		let items = Object.entries(this.props.data)
  		.map(item => {
  			if (item[1] != null && item[1].constructor.name === "Object") {
  				item[1] = JSON.stringify(item[1])
  			}
  			if (item[1] != null && typeof item[1] === "boolean") {
  				item[1] = item[1].toString()
  			}
  			return item
  		})
  			
  	    return <FlatList
        data={items}
        renderItem={({item}) => <View style={commonStyles.rowItem}><Text style={[commonStyles.propertyText, commonStyles.rowItemText]}>{item[0]}:</Text><Text style={commonStyles.rowItemText}> {item[1]}</Text></View>}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.toString() }
      	/>
  }
}
