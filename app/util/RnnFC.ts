import { Options } from 'react-native-navigation/lib/dist/interfaces/Options';

/*
 * For attaching react-native-navigation options to a React.FC component.
 */
export type RnnFC<P = {}> = React.FC<P> & { options: Options };

