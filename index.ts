import { Navigation } from "react-native-navigation";
import registerScreens from "./app/ui/navigation/RegisterScreens";
import ScreenNames from './app/ui/navigation/ScreenNames';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: ScreenNames.HOME_SCREEN,
              name: ScreenNames.HOME_SCREEN,
            },
          }
        ],
      },
    },
 });

});
