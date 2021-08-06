import React from 'react';
import { View } from 'react-native';
import commonStyles from '../../res/style/common.style';
import { RnnFC } from '../../util/RnnFC.js';
import ObjectPropertyValueList from '../view/ObjectPropertyValueList';

interface IProps {
  readonly componentId: String;
  readonly projectDetail: any;
}

const ProjectDetailScreen: RnnFC<IProps> = (props) => {
  const { componentId, projectDetail } = props;
  console.log(JSON.stringify(projectDetail));

  return(
    <View style={commonStyles.container}>
      <ObjectPropertyValueList data={projectDetail} />
    </View>
  );
};

ProjectDetailScreen.options = {
  topBar: {
    title: {
      text: "Project detail",
    },
  },
};

export default ProjectDetailScreen;
