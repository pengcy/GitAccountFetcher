import { Navigation } from 'react-native-navigation';
import HomeScreen from '../screen/HomeScreen';
import ScreenNames from './ScreenNames';

export const registerScreens = () => {
    Navigation.registerComponent(ScreenNames.HOME_SCREEN, () => HomeScreen);
};

export default registerScreens;
