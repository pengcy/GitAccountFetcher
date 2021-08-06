import React from 'react';
import { Text } from 'react-native';
import i18n from '../../res/string/i18n';

interface IProps {
  readonly name: string;
}

const Greeting: React.FC<IProps> = (props) => {
  const { name } = props;

  return <Text h3 style={{marginVertical: 10}}>{i18n.t('greeting', { name: name })}</Text>
};

export default Greeting;
