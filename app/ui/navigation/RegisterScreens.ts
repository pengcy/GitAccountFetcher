import { Navigation } from 'react-native-navigation';
import AccountDetailScreen from "../screen/AccountDetailScreen";
import HomeScreen from '../screen/HomeScreen';
import ProjectDetailScreen from "../screen/ProjectDetailScreen";
import ProjectListScreen from '../screen/ProjectListScreen';
import ScreenNames from './ScreenNames';

export const registerScreens = () => {
    Navigation.registerComponent(ScreenNames.HOME_SCREEN, () => HomeScreen);
    Navigation.registerComponent(ScreenNames.ACCOUNT_DETAIL_SCREEN, () => AccountDetailScreen);
    Navigation.registerComponent(ScreenNames.PROJECT_LIST_SCREEN, () => ProjectListScreen);
    Navigation.registerComponent(ScreenNames.PROJECT_DETAIL_SCREEN, () => ProjectDetailScreen);
};

export default registerScreens;
