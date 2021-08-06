import React from 'react';
import { FlatList, Text, View } from 'react-native';
import commonStyles from '../../res/style/common.style';

// export default class ObjectPropertyValueList extends Component {
//   render() {
//   		let items = Object.entries(this.props.data)
//   		.map(item => {
//   			if (item[1] != null && item[1].constructor.name === "Object") {
//   				item[1] = JSON.stringify(item[1])
//   			}
//   			if (item[1] != null && typeof item[1] === "boolean") {
//   				item[1] = item[1].toString()
//   			}
//   			return item
//   		})

//   	    return <FlatList
//         data={items}
//         renderItem={({item}) => <View style={commonStyles.rowItem}><Text style={[commonStyles.propertyText, commonStyles.rowItemText]}>{item[0]}:</Text><Text style={commonStyles.rowItemText}> {item[1]}</Text></View>}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(item, index) => item.toString() }
//       	/>
//   }
// }

interface IProps {
	readonly data: any;
}

const ObjectPropertyValueList: React.FC<IProps> = (props) => {
	const { data } = props;

	let items = Object.entries(data)
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
};

export default ObjectPropertyValueList;
