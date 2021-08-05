import { Navigation } from "react-native-navigation";
import ScreenNames from "./app/ui/navigation/ScreenNames";
import AccountDetailScreen from "./app/ui/screen/AccountDetailScreen";
import HomeScreen from "./app/ui/screen/HomeScreen";
import ProjectDetailScreen from "./app/ui/screen/ProjectDetailScreen";

Navigation.registerComponent(ScreenNames.HOME_SCREEN, () => HomeScreen);
Navigation.registerComponent(ScreenNames.ACCOUNT_DETAIL_SCREEN, () => AccountDetailScreen);
Navigation.registerComponent(ScreenNames.PROJECT_DETAIL_SCREEN, () => ProjectDetailScreen);

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: ScreenNames.HOME_SCREEN,
              options: {
                topBar: {
                  visible: false,
                }
              }
            },
          }
        ],
      },
    },
 });

});
