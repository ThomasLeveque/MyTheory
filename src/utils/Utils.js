import { Alert, Platform } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';

export const getPermAsync = async () => {
  const { Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    Alert.alert(
      'Please allow notifications',
      'This app needs you to authorize notifications in order to work',
      [
        {
          text: 'Go to settings',
          onPress: () =>
            this.checkOS(AndroidOpenSettings.appDetailsSettings(), DeviceSettings.app()),
        },
      ],
      { cancelable: false },
    );
    return false;
  }
  return true;
};

const checkOS = (callbackiOs, callbackAndroid) => {
  Platform.OS === 'ios' ? callbackiOs() : callbackAndroid();
};
