import React from 'react';
import { Button, NativeModules } from 'react-native';
const { CalendarModule } = NativeModules;

const NewModuleButton: React.FC = () => {

  const onPress = () => {
    CalendarModule.createCalendarEvent('testName', 'testLocation');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
